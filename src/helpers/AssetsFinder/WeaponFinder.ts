import { NoLocalizationAssetsFound } from "../../errors";
import type { TLanguage, TLocalizationData } from "../../types";
import { pickName } from "./pickName";

export class WeaponFinder {
	private readonly localization: TLocalizationData;

	constructor(localization: TLocalizationData) {
		this.localization = localization;
	}

	getName(nameTextMapHash: number, language: TLanguage) {
		const nameLocalizations = this.localization[nameTextMapHash];
		if (!nameLocalizations)
			throw new NoLocalizationAssetsFound(
				`There is no localization for weapon with nameTextMapHash = ${nameTextMapHash}! (check the actuality of assets)`,
			);

		return pickName(
			nameLocalizations,
			language,
			`weapon with nameTextMapHash = ${nameTextMapHash}`,
		);
	}
}
