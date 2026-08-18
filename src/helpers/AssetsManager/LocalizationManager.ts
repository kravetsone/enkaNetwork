import fs from "node:fs/promises";
import path from "node:path";
// @ts-ignore: Json Import
import characters from "../../../assets/localization/characters.json";
// @ts-ignore: Json Import
import constellations from "../../../assets/localization/constellations.json";
// @ts-ignore: Json Import
import costumes from "../../../assets/localization/costumes.json";
// @ts-ignore: Json Import
import namecards from "../../../assets/localization/namecards.json";
// @ts-ignore: Json Import
import profilePictures from "../../../assets/localization/profilePictures.json";
// @ts-ignore: Json Import
import reliquary from "../../../assets/localization/reliquary.json";
// @ts-ignore: Json Import
import reliquarySets from "../../../assets/localization/reliquarySets.json";
// @ts-ignore: Json Import
import skills from "../../../assets/localization/skills.json";
// @ts-ignore: Json Import
import weapons from "../../../assets/localization/weapons.json";
import type { TAssetsList, TLocalizationData } from "../../types";
import { ASSETS_PATH } from "./constants";

export class LocalizationManager {
	characters: TLocalizationData;
	costumes: TLocalizationData;
	constellations: TLocalizationData;
	namecards: TLocalizationData;
	reliquary: TLocalizationData;
	reliquarySets: TLocalizationData;
	skills: TLocalizationData;
	weapons: TLocalizationData;
	profilePictures: TLocalizationData;

	constructor() {
		this.characters = characters as TLocalizationData;
		this.costumes = costumes as TLocalizationData;
		this.constellations = constellations as TLocalizationData;
		this.namecards = namecards as TLocalizationData;
		this.reliquary = reliquary as TLocalizationData;
		this.reliquarySets = reliquarySets as TLocalizationData;
		this.skills = skills as TLocalizationData;
		this.weapons = weapons as TLocalizationData;
		this.profilePictures = profilePictures as TLocalizationData;
	}

	/**
	 * Merges a freshly fetched localization into the store — per hash, per language —
	 * and persists the merged result.
	 *
	 * A run only fetches the languages its updater was configured with, so writing
	 * `localization` verbatim used to drop every other language already on disk (the
	 * postinstall defaults to EN, which silently wiped an app's RU store and left every
	 * RU lookup throwing `NoLanguageFound`). Memory and file now stay in sync too — the
	 * old code merged in memory but wrote the unmerged object.
	 */
	async write(assetType: TAssetsList, localization: TLocalizationData) {
		const store = this[assetType];

		for (const hash in localization)
			store[hash] = { ...store[hash], ...localization[hash] };

		await fs.writeFile(
			path.resolve(ASSETS_PATH, "localization", `${assetType}.json`),
			JSON.stringify(store, null, 4),
		);
	}
}
