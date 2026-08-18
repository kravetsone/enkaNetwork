import { NoLocalizationAssetsFound } from "../../errors";
import type { ICostumeData, TLanguage, TLocalizationData } from "../../types";
import { pickName } from "./pickName";

export class CostumeFinder {
	private readonly data: ICostumeData[];
	private readonly localization: TLocalizationData;

	constructor(data: ICostumeData[], localization: TLocalizationData) {
		this.data = data;
		this.localization = localization;
	}

	/**
	 * Searching for a **costume** by his ID. Returns `undefined` when it isn't known.
	 *
	 * A miss is not fatal: the generated data holds only real (icon-bearing) costumes,
	 * so an unknown skinId means "this character wears their default outfit" — exactly
	 * the `costume ? costume.iconName : character.iconName` fallback every caller
	 * already has. Throwing here took the whole `fetchUser` down with it.
	 */
	getById(id: number) {
		return this.data.find((costume) => costume.id === id);
	}

	getName(costume: ICostumeData, language: TLanguage) {
		const nameLocalizations = this.localization[costume.nameTextMapHash];
		if (!nameLocalizations)
			throw new NoLocalizationAssetsFound(
				`There is no localization for costume with id = ${costume.id}! (check the actuality of assets)`,
			);

		return pickName(
			nameLocalizations,
			language,
			`costume with id = ${costume.id}`,
		);
	}
}
