import axios from "axios";
import fs from "fs/promises";
// @ts-ignore: JSON IMPORT OUT OF BASE-DIR
import config from "../../../assets/config.json";
import {
    ICharacterExcelData,
    IConstellationExcelData,
    ICostumeExcelData,
    INamecardExcelData,
    INameTextMapHash,
    IReliquaryAffixExcelData,
    IReliquarySetExcelData,
    ISkillExcelData,
    ISkillsetExcelData,
} from "../../types/parseDataTypes";
import {
    CONSTELLATION_DATA_URL,
    COSTUME_DATA_URL,
    CHARACTER_DATA_URL,
    SKILL_DATA_URL,
    SKILLSET_DATA_URL,
    RELIQUARY_AFFIX_DATA_URL,
    RELIQUARY_DATA_URL,
    RELIQUARY_SET_DATA_URL,
    WEAPON_DATA_URL,
    NAMECARD_DATA_URL,
    PROJECT_GITLAB_URL,
    LOCALIZATION_BASE_URL,
    elements,
    excludeCharacters,
    localizationLanguages,
    qualityTypesStars,
} from "./constants";
import { TLanguage } from "../../types";

export class AssetsUpdater {
    languages: TLanguage[];
    private isFetching: boolean;
    constructor(
        {
            languages = ["EN"],
            checkInterval = 30 * 60 * 1000, // 0.5 hour
            instant = true,
        }: {
            languages?: TLanguage[];
            checkInterval?: number;
            instant?: boolean;
        } = {
            languages: ["EN"],
            checkInterval: 30 * 60 * 1000,
            instant: true,
        },
    ) {
        if (!languages?.length)
            throw new Error(
                "The languages value must contain at least 1 language",
            );

        if (
            languages.filter(
                (language) => !localizationLanguages.includes(language),
            ).length
        )
            throw new Error(
                `Use only supported languages! (${localizationLanguages.join(
                    ", ",
                )})`,
            );

        this.languages = languages;
        this.isFetching = false;
        if (instant) this.fetch();

        setInterval(() => this.fetch().catch(() => 1), checkInterval);
    }
    async fetch() {
        if (this.isFetching) throw new Error("Content is already fetching!");
        this.isFetching = true;

        const { data } = await axios.get(PROJECT_GITLAB_URL, {
            params: {
                since: config.lastUpdate,
            },
        });

        if (!data.length) {
            this.isFetching = false;
            return;
        }
        console.log(1232, !data.length);
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
        ] = await Promise.all([
            axios.get<ICharacterExcelData[]>(CHARACTER_DATA_URL),
            axios.get<ICostumeExcelData[]>(COSTUME_DATA_URL),
            axios.get<IConstellationExcelData[]>(CONSTELLATION_DATA_URL),
            axios.get<ISkillsetExcelData[]>(SKILLSET_DATA_URL),
            axios.get<ISkillExcelData[]>(SKILL_DATA_URL),
            axios.get<INameTextMapHash[]>(WEAPON_DATA_URL),
            axios.get<INamecardExcelData[]>(NAMECARD_DATA_URL),
            axios.get<INameTextMapHash[]>(RELIQUARY_DATA_URL),
            axios.get<IReliquarySetExcelData[]>(RELIQUARY_SET_DATA_URL),
            axios.get<IReliquaryAffixExcelData[]>(RELIQUARY_AFFIX_DATA_URL),
        ]);

        const characters = charactersData.data
            .filter((character) => !excludeCharacters.includes(character.id))
            .map((character) => {
                const skillset = skillsetsData.data.find(
                    (x) => x.id === character.skillDepotId,
                );

                if (!skillset) return;

                const energyBurst = skillsData.data.find(
                    (x) => x.id === skillset!.energySkill,
                );
                if (!energyBurst) return;

                skillIds.push(...skillset.skills.filter(Boolean));

                return {
                    id: character.id,
                    skillDepotId: character.skillDepotId,
                    nameTextMapHash: character.nameTextMapHash,
                    iconName: character.iconName,
                    sideIconName: character.sideIconName,
                    qualityStars: qualityTypesStars[character.qualityType],
                    element: elements[energyBurst.costElemType],
                    skills: skillset.skills.filter(Boolean),
                    talents: skillset.talents.filter(Boolean),
                };
            })
            .filter(Boolean);

        // Aether and Lumine
        charactersData.data
            .filter((x) => x.id === 10000005 || x.id === 10000007)
            .forEach((character) => {
                character.candSkillDepotIds.forEach((skillDepotId) => {
                    const skillset = skillsetsData.data.find(
                        (x) => x.id === skillDepotId,
                    );

                    if (!skillset) return;

                    const energyBurst = skillsData.data.find(
                        (x) => x.id === skillset!.energySkill,
                    );
                    if (!energyBurst) return;

                    skillIds.push(...skillset.skills.filter(Boolean));

                    characters.push({
                        id: character.id,
                        skillDepotId: skillDepotId,
                        nameTextMapHash: character.nameTextMapHash,
                        iconName: character.iconName,
                        sideIconName: character.sideIconName,
                        qualityStars: qualityTypesStars[character.qualityType],
                        element: elements[energyBurst.costElemType],
                        skills: skillset.skills.filter(Boolean),
                        talents: skillset.talents.filter(Boolean),
                    });
                });
            });

        const skills = skillsData.data
            .filter((skill) => skillIds.includes(skill.id))
            .map((skill) => ({
                id: skill.id,
                nameTextMapHash: skill.nameTextMapHash,
                skillIcon: skill.skillIcon,
                proudSkillGroupId: skill.proudSkillGroupId,
            }));

        const constellations = constellationsData.data.map((constellation) => ({
            id: constellation.talentId,
            nameTextMapHash: constellation.nameTextMapHash,
            icon: constellation.icon,
        }));

        const costumes = costumesData.data.map((costume) => ({
            id: costume.KKGNHHIFAMD,
            iconName: costume.NGEMPNOFHLJ,
            sideIconName: costume.sideIconName,
            nameTextMapHash: costume.nameTextMapHash,
        }));

        const namecards = namecardsData.data
            .filter((namecard) => namecard.materialType === "MATERIAL_NAMECARD")
            .map((namecard) => ({
                id: namecard.id,
                nameTextMapHash: namecard.nameTextMapHash,
                icon: namecard.icon,
                picPath: namecard.picPath,
            }));

        await Promise.all([
            fs.writeFile(
                "assets/data/characters.json",
                JSON.stringify(characters, null, 4),
            ),
            fs.writeFile(
                "assets/data/skills.json",
                JSON.stringify(skills, null, 4),
            ),
            fs.writeFile(
                "assets/data/constellations.json",
                JSON.stringify(constellations, null, 4),
            ),
            fs.writeFile(
                "assets/data/costumes.json",
                JSON.stringify(costumes, null, 4),
            ),
            fs.writeFile(
                "assets/data/namecards.json",
                JSON.stringify(namecards, null, 4),
            ),
        ]);

        const reliquarySets = reliquarySetData.data
            .map((reliquarySet) => {
                const reliquaryAffix = reliquaryAffixData.data.find(
                    (x) => x.id === reliquarySet.EquipAffixId && x.level === 1,
                );

                return reliquaryAffix?.nameTextMapHash;
            })
            // Why doesn't the typescript compiler understand that it won't be undefined anymore ???
            // Issue - https://github.com/microsoft/TypeScript/issues/45097
            .filter(Boolean) as number[];

        //lang imports
        const nameTextHashMaps: Record<string, number[]> = {
            characters: characters.map(
                (character) => character!.nameTextMapHash,
            ),
            constellations: constellations.map(
                (constellation) => constellation.nameTextMapHash,
            ),
            namecards: namecards.map((namecard) => namecard.nameTextMapHash),
            skills: skills.map((skill) => skill.nameTextMapHash),
            weapons: weaponsData.data.map((weapon) => weapon.nameTextMapHash),
            reliquary: reliquaryData.data.map(
                (reliquary) => reliquary.nameTextMapHash,
            ),
            reliquarySets,
        };

        const languagesData = await Promise.all(
            this.languages.map(async (lang) => {
                const languageData = await axios.get<Record<string, string>>(
                    LOCALIZATION_BASE_URL + lang + ".json",
                );

                return languageData.data;
            }),
        );

        for (const dataType in nameTextHashMaps) {
            const nameTextHashes = nameTextHashMaps[dataType];

            const localization = nameTextHashes.reduce(
                (acc, nameTextHash) => {
                    acc[String(nameTextHash)] = {};
                    this.languages.forEach((lang, index) => {
                        // I refer to the languagesData by index since Promise.all guarantees the preservation of order
                        acc[String(nameTextHash)][lang] =
                            languagesData[index][nameTextHash];
                    });
                    return acc;
                },
                {} as Record<string, Record<string, string>>,
            );

            await fs.writeFile(
                `assets/localizations/${dataType}.json`,
                JSON.stringify(localization, null, 4),
            );
        }

        this.isFetching = false;
        config.lastUpdate = new Date().toISOString();
        await fs.writeFile(
            `assets/config.json`,
            JSON.stringify(config, null, 4),
        );
    }
}
