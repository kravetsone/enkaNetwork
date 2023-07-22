import {
    NoDataAssetsFound,
    NoLanguageFound,
    NoLocalizationAssetsFound,
} from "../../errors";
import { ISkillData, TLanguage, TLocalizationData } from "../../types";

export class SkillFinder {
    private readonly data: ISkillData[];
    private readonly localization: TLocalizationData;

    constructor(data: ISkillData[], localization: TLocalizationData) {
        this.data = data;
        this.localization = localization;
    }

    // Searching for a **skill** by his ID
    getById(id: number) {
        const skill = this.data.find((skill) => skill.id === id);
        if (!skill)
            throw new NoDataAssetsFound(
                `There is no skill with id = ${id}! ` +
                    `(check the actuality of assets)`,
            );

        return skill;
    }

    getName(skill: ISkillData, language: TLanguage) {
        const nameLocalizations = this.localization[skill.nameTextMapHash];
        if (!nameLocalizations)
            throw new NoLocalizationAssetsFound(
                `There is no localization for skill with id = ${skill.id}! ` +
                    `(check the actuality of assets)`,
            );

        const name = nameLocalizations[language];

        if (!name)
            throw new NoLanguageFound(
                "This language is not downloaded! Check the AssetsUpdater settings",
            );

        return name;
    }
}
