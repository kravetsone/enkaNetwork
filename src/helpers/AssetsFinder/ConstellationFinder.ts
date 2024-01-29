import {
	NoDataAssetsFound,
	NoLanguageFound,
	NoLocalizationAssetsFound,
} from "../../errors";
import { IConstellationData, TLanguage, TLocalizationData } from "../../types";

export class ConstellationFinder {
	private readonly data: IConstellationData[];
	private readonly localization: TLocalizationData;

	constructor(data: IConstellationData[], localization: TLocalizationData) {
		this.data = data;
		this.localization = localization;
	}

	// Searching for a **constellation** by his ID
	getById(id: number) {
		const constellation = this.data.find(
			(constellation) => constellation.id === id,
		);
		if (!constellation)
			throw new NoDataAssetsFound(
				`There is no constellation with id = ${id}! (check the actuality of assets)`,
			);

		return constellation;
	}

	getName(constellation: IConstellationData, language: TLanguage) {
		const nameLocalizations = this.localization[constellation.nameTextMapHash];
		if (!nameLocalizations)
			throw new NoLocalizationAssetsFound(
				`There is no localization for constellation with id = ${constellation.id}! (check the actuality of assets)`,
			);

		const name = nameLocalizations[language];

		if (!name)
			throw new NoLanguageFound(
				"This language is not downloaded! Check the AssetsUpdater settings",
			);

		return name;
	}
}
