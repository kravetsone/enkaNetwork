import fs from "node:fs/promises";
import path from "node:path";
// @ts-ignore: JSON IMPORT OUT OF BASE-DIR
import config from "../../../assets/config.json";
import { AssetsUpdateError, AssetsValidationError } from "../../errors";
import type {
	IAssetsUpdaterParams,
	ICharacterData,
	ICharacterExcelData,
	IConstellationData,
	IConstellationExcelData,
	ICostumeData,
	ICostumeExcelData,
	INameTextMapHash,
	INamecardData,
	INamecardExcelData,
	IProfilePictureData,
	IProfilePictureExcelData,
	IReliquaryAffixExcelData,
	IReliquarySetExcelData,
	ISkillData,
	ISkillExcelData,
	ISkillsetExcelData,
	TAssetsList,
	TLanguage,
} from "../../types";
import type { DataManager } from "./DataManager";
import type { LocalizationManager } from "./LocalizationManager";
import {
	ASSETS_PATH,
	BASE_URL,
	BASE_URL_FALLBACK,
	CHARACTER_DATA_URL,
	CONSTELLATION_DATA_URL,
	COSTUME_DATA_URL,
	LOCALIZATION_BASE_URL,
	NAMECARD_DATA_URL,
	PROFILE_PICTURE_DATA_URL,
	PROJECT_GITLAB_URL,
	RELIQUARY_AFFIX_DATA_URL,
	RELIQUARY_DATA_URL,
	RELIQUARY_SET_DATA_URL,
	SKILLSET_DATA_URL,
	SKILL_DATA_URL,
	WEAPON_DATA_URL,
	elements,
	excludeCharacters,
	localizationLanguages,
	qualityTypesStars,
} from "./constants";
import { validateAssets } from "./validate";

// Tries the primary host first, then the mirror, so a single host outage doesn't
// break updates.
async function request<T>(url: string) {
	let lastError: unknown;

	for (const base of [BASE_URL, BASE_URL_FALLBACK]) {
		try {
			const res = await fetch(base + url);
			if (!res.ok) throw new AssetsUpdateError(url, res);

			return (await res.json()) as T;
		} catch (error) {
			lastError = error;
		}
	}

	throw lastError;
}

// Upstream splits oversized TextMaps (e.g. RU, TH) into `TextMap{LANG}_0.json`,
// `_1.json`, … Fetch the single file when it exists, otherwise merge all parts.
async function fetchTextMap(lang: TLanguage) {
	try {
		return await request<Record<string, string>>(
			`${LOCALIZATION_BASE_URL + lang}.json`,
		);
	} catch {
		const merged: Record<string, string> = {};

		for (let part = 0; ; part++) {
			try {
				Object.assign(
					merged,
					await request<Record<string, string>>(
						`${LOCALIZATION_BASE_URL + lang}_${part}.json`,
					),
				);
			} catch {
				break;
			}
		}

		if (!Object.keys(merged).length)
			throw new AssetsUpdateError(`${LOCALIZATION_BASE_URL + lang}.json`, {
				status: 404,
				message: `No TextMap found for language "${lang}"`,
			});

		return merged;
	}
}

export class AssetsUpdater {
	languages: TLanguage[];
	private isFetching: boolean;
	private dataManager: DataManager;
	private localizationManager: LocalizationManager;

	constructor(
		{
			languages = ["EN"],
			checkInterval = 30 * 60 * 1000, // 0.5 hour
			instant = false,
		}: IAssetsUpdaterParams,
		dataManager: DataManager,
		localizationManager: LocalizationManager,
	) {
		if (!languages.length)
			throw new Error("The languages value must contain at least 1 language");

		if (
			languages.filter((language) => !localizationLanguages.includes(language))
				.length
		)
			throw new Error(
				`Use only supported languages! (${localizationLanguages.join(", ")})`,
			);
		this.dataManager = dataManager;
		this.localizationManager = localizationManager;

		// This is done so that the languages are not repeated and are not requested again
		this.languages = [...new Set(languages)];
		this.isFetching = false;

		if (instant) this.fetchAssets();

		if (checkInterval)
			setInterval(
				() =>
					this.fetchAssets().catch((error) =>
						console.error("[enkanetwork] assets update failed:", error),
					),
				checkInterval,
			);
	}

	// function that checks the relevance of assets data and localization
	async fetchAssets() {
		if (this.isFetching) throw new Error("Content is already fetching!");
		this.isFetching = true;

		// Best-effort update check: if the commits API is unreachable, treat it as
		// "no new commits" and fall back to the language diff below.
		let data: unknown[] = [];
		try {
			const res = await fetch(
				`${PROJECT_GITLAB_URL}?since=${config.lastUpdate}`,
			);
			data = await res.json();
		} catch {}

		if (
			!data.length &&
			!this.languages.filter(
				(language) => !(config.languages as TLanguage[]).includes(language),
			).length &&
			config.languages.length
		) {
			this.isFetching = false;
			return;
		}

		const skillIds: number[] = [];
		const [
			charactersData,
			costumesData,
			constellationsData,
			skillsetsData,
			skillsData,
			weaponsData,
			namecardsData,
			reliquaryData,
			reliquarySetData,
			reliquaryAffixData,
			profilePicturesData,
		] = await Promise.all([
			request<ICharacterExcelData[]>(CHARACTER_DATA_URL),
			request<ICostumeExcelData[]>(COSTUME_DATA_URL),
			request<IConstellationExcelData[]>(CONSTELLATION_DATA_URL),
			request<ISkillsetExcelData[]>(SKILLSET_DATA_URL),
			request<ISkillExcelData[]>(SKILL_DATA_URL),
			request<INameTextMapHash[]>(WEAPON_DATA_URL),
			request<INamecardExcelData[]>(NAMECARD_DATA_URL),
			request<INameTextMapHash[]>(RELIQUARY_DATA_URL),
			request<IReliquarySetExcelData[]>(RELIQUARY_SET_DATA_URL),
			request<IReliquaryAffixExcelData[]>(RELIQUARY_AFFIX_DATA_URL),
			request<IProfilePictureExcelData[]>(PROFILE_PICTURE_DATA_URL),
		]);

		const characters = charactersData
			.filter((character) => !excludeCharacters.includes(character.id))
			.map((character) => {
				const skillset = skillsetsData.find(
					(x) => x.id === character.skillDepotId,
				);

				if (!skillset) return null;

				const energyBurst = skillsData.find(
					(x) => x.id === skillset?.energySkill,
				);
				if (!energyBurst) return null;

				skillIds.push(
					...skillset.skills.concat(skillset?.energySkill).filter(Boolean),
				);

				return {
					id: character.id,
					skillDepotId: character.skillDepotId,
					nameTextMapHash: character.nameTextMapHash,
					iconName: character.iconName,
					sideIconName: character.sideIconName,
					gachaIcon: `UI_Gacha_AvatarImg_${character.iconName
						.split("_")
						.at(-1)}`,
					qualityStars: qualityTypesStars[character.qualityType],
					element: elements[energyBurst.costElemType],
					skills: skillset.skills.concat(skillset?.energySkill).filter(Boolean),
					talents: skillset.talents.filter(Boolean),
				};
			})
			.filter(Boolean) as ICharacterData[];

		// Aether and Lumine problem
		for (const character of charactersData) {
			if (character.id !== 10000005 && character.id !== 10000007) continue;

			for (const skillDepotId of character.candSkillDepotIds) {
				const skillset = skillsetsData.find((x) => x.id === skillDepotId);

				if (!skillset) continue;

				const energyBurst = skillsData.find(
					(x) => x.id === skillset?.energySkill,
				);
				if (!energyBurst) continue;

				skillIds.push(...skillset.skills.filter(Boolean));

				characters.push({
					id: character.id,
					skillDepotId,
					nameTextMapHash: character.nameTextMapHash,
					iconName: character.iconName,
					sideIconName: character.sideIconName,
					gachaIcon: `UI_Gacha_AvatarImg_${character.iconName
						.split("_")
						.at(-1)}`,
					qualityStars: qualityTypesStars[character.qualityType],
					element: elements[energyBurst.costElemType],
					skills: skillset.skills.filter(Boolean),
					talents: skillset.talents.filter(Boolean),
				});
			}
		}

		const skills = skillsData
			.filter((skill) => skillIds.includes(skill.id))
			.map((skill) => ({
				id: skill.id,
				nameTextMapHash: skill.nameTextMapHash,
				skillIcon: skill.skillIcon,
				proudSkillGroupId: skill.proudSkillGroupId,
			})) as ISkillData[];

		const constellations = constellationsData.map((constellation) => ({
			id: constellation.talentId,
			nameTextMapHash: constellation.nameTextMapHash,
			icon: constellation.icon,
		})) as IConstellationData[];

		const costumes = costumesData.map((costume) => ({
			// id: Object.values(costume).at(0),
			id: costume.skinId,
			iconName: costume.sideIconName.replace("_Side", ""),
			sideIconName: costume.sideIconName,
			gachaIcon: `UI_Costume_${costume.sideIconName.split("_").at(-1)}`,
			nameTextMapHash: costume.nameTextMapHash,
		})) as ICostumeData[];

		const namecards = namecardsData
			.filter((namecard) => namecard.materialType === "MATERIAL_NAMECARD")
			.map((namecard) => ({
				id: namecard.id,
				nameTextMapHash: namecard.nameTextMapHash,
				icon: namecard.icon,
				navbar: namecard.picPath.at(0) || null,
				banner: namecard.picPath.at(1),
			})) as INamecardData[];

		const profilePictures = profilePicturesData
			.filter((profilePicture) => profilePicture.iconPath)
			.map((profilePicture) => ({
				id: profilePicture.id,
				iconName: profilePicture.iconPath,
				nameTextMapHash: profilePicture.nameTextMapHash,
			})) as IProfilePictureData[];

		// Validate the transformed records before persisting so upstream schema drift
		// fails loudly instead of writing broken JSON over the good data.
		const problems = [
			...validateAssets("characters", characters),
			...validateAssets("skills", skills),
			...validateAssets("constellations", constellations),
			...validateAssets("costumes", costumes),
			...validateAssets("namecards", namecards),
			...validateAssets("profilePictures", profilePictures),
		];
		if (problems.length) {
			this.isFetching = false;
			throw new AssetsValidationError(problems);
		}

		await Promise.all([
			this.dataManager.writeCharacters(characters),
			this.dataManager.writeSkills(skills),
			this.dataManager.writeConstellations(constellations),
			this.dataManager.writeCostumes(costumes),
			this.dataManager.writeNamecards(namecards),
			this.dataManager.writeProfilePictures(profilePictures),
		]);

		const reliquarySets = reliquarySetData
			.map((reliquarySet) => {
				const reliquaryAffix = reliquaryAffixData.find(
					(x) => x.id === reliquarySet.equipAffixId && x.level === 1,
				);

				return reliquaryAffix?.nameTextMapHash;
			})
			// Why doesn't the typescript compiler understand that it won't be undefined anymore ???
			// Issue - https://github.com/microsoft/TypeScript/issues/45097
			.filter(Boolean) as number[];

		//lang imports
		const nameTextHashMaps: Record<TAssetsList, number[]> = {
			characters: characters.map((character) => character?.nameTextMapHash),
			costumes: costumes.map((costume) => costume.nameTextMapHash),
			constellations: constellations.map(
				(constellation) => constellation.nameTextMapHash,
			),
			namecards: namecards.map((namecard) => namecard.nameTextMapHash),
			skills: skills.map((skill) => skill.nameTextMapHash),
			weapons: weaponsData.map((weapon) => weapon.nameTextMapHash),
			reliquary: reliquaryData.map((reliquary) => reliquary.nameTextMapHash),
			reliquarySets,
			profilePictures: profilePictures.map(
				(profilePicture) => profilePicture.nameTextMapHash,
			),
		};

		const languagesData = await Promise.all(
			this.languages.map((lang) => fetchTextMap(lang)),
		);

		for (const dataType in nameTextHashMaps) {
			const assetType = dataType as TAssetsList;
			const nameTextHashes = nameTextHashMaps[assetType];

			const localization = nameTextHashes.reduce(
				(acc, nameTextHash) => {
					acc[String(nameTextHash)] = {};
					this.languages.forEach((lang, index) => {
						// I refer to the languagesData by index since Promise.all guarantees the preservation of order
						acc[String(nameTextHash)][lang] =
							languagesData[index][nameTextHash] ?? "UNKNOWN";
					});
					return acc;
				},
				{} as Record<string, Record<string, string>>,
			);

			await this.localizationManager.write(assetType, localization);
		}

		this.isFetching = false;
		config.lastUpdate = new Date().toISOString();
		config.languages = this.languages as never[];
		await fs.writeFile(
			path.resolve(ASSETS_PATH, "config.json"),
			JSON.stringify(config, null, 4),
		);
	}
}
