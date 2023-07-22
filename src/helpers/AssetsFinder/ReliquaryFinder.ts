import { NoLanguageFound, NoLocalizationAssetsFound } from "../../errors";
import { TLanguage, TLocalizationData } from "../../types";

export class ReliquaryFinder {
    private readonly localization: TLocalizationData;

    constructor(localization: TLocalizationData) {
        this.localization = localization;
    }

    getName(nameTextMapHash: number, language: TLanguage) {
        const nameLocalizations = this.localization[nameTextMapHash];
        if (!nameLocalizations)
            throw new NoLocalizationAssetsFound(
                `There is no localization for reliquary with nameTextMapHash = ${nameTextMapHash}! ` +
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
