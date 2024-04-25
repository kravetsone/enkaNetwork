import {
	NoDataAssetsFound,
	NoLanguageFound,
	NoLocalizationAssetsFound,
} from "../../errors";
import type { ICostumeData, TLanguage, TLocalizationData } from "../../types";

export class CostumeFinder {
	private readonly data: ICostumeData[];
	private readonly localization: TLocalizationData;

	constructor(data: ICostumeData[], localization: TLocalizationData) {
		this.data = data;
		this.localization = localization;
	}

	// Searching for a **costume** by his ID
	getById(id: number) {
		const costume = this.data.find((costume) => costume.id === id);
		if (!costume)
			throw new NoDataAssetsFound(
				`There is no costume with id = ${id}! (check the actuality of assets)`,
			);

		return costume;
	}

	getName(costume: ICostumeData, language: TLanguage) {
		const nameLocalizations = this.localization[costume.nameTextMapHash];
		if (!nameLocalizations)
			throw new NoLocalizationAssetsFound(
				`There is no localization for costume with id = ${costume.id}! (check the actuality of assets)`,
			);

		const name = nameLocalizations[language];

		if (!name)
			throw new NoLanguageFound(
				"This language is not downloaded! Check the AssetsUpdater settings",
			);

		return name;
	}
}
