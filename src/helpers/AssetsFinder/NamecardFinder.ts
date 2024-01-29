import {
	NoDataAssetsFound,
	NoLanguageFound,
	NoLocalizationAssetsFound,
} from "../../errors";
import { INamecardData, TLanguage, TLocalizationData } from "../../types";

export class NamecardFinder {
	private readonly data: INamecardData[];
	private readonly localization: TLocalizationData;

	constructor(data: INamecardData[], localization: TLocalizationData) {
		this.data = data;
		this.localization = localization;
	}

	// Searching for a **namecard** by his ID
	getById(id: number) {
		const namecard = this.data.find((namecard) => namecard.id === id);
		if (!namecard)
			throw new NoDataAssetsFound(
				`There is no namecard with id = ${id}! (check the actuality of assets)`,
			);

		return namecard;
	}

	getName(namecard: INamecardData, language: TLanguage) {
		const nameLocalizations = this.localization[namecard.nameTextMapHash];
		if (!nameLocalizations)
			throw new NoLocalizationAssetsFound(
				`There is no localization for namecard with id = ${namecard.id}! (check the actuality of assets)`,
			);

		const name = nameLocalizations[language];

		if (!name)
			throw new NoLanguageFound(
				"This language is not downloaded! Check the AssetsUpdater settings",
			);

		return name;
	}
}
