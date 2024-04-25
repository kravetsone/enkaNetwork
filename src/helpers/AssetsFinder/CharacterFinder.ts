import {
	NoDataAssetsFound,
	NoLanguageFound,
	NoLocalizationAssetsFound,
} from "../../errors";
import type { ICharacterData, TLanguage, TLocalizationData } from "../../types";

export class CharacterFinder {
	private readonly data: ICharacterData[];
	private readonly localization: TLocalizationData;

	constructor(data: ICharacterData[], localization: TLocalizationData) {
		this.data = data;
		this.localization = localization;
	}

	// Searching for a **character** by his ID (and by his skillDepotId)
	getById(id: number, skillDepotId?: number) {
		if (skillDepotId) {
			const character = this.data.find(
				(character) =>
					character.id === id && character.skillDepotId === skillDepotId,
			);
			if (!character)
				throw new NoDataAssetsFound(
					`There is no character with id = ${id} and skillDepotId = ${skillDepotId}! (check the actuality of assets)`,
				);

			return character;
		}

		const character = this.data.find((character) => character.id === id);
		if (!character)
			throw new NoDataAssetsFound(
				`There is no character with id = ${id}! (check the actuality of assets)`,
			);

		return character;
	}

	getName(character: ICharacterData, language: TLanguage) {
		const nameLocalization = this.localization[character.nameTextMapHash];
		if (!nameLocalization)
			throw new NoLocalizationAssetsFound(
				`There is no localization for character with id = ${character.id}! (check the actuality of assets)`,
			);

		const name = nameLocalization[language];
		if (!name)
			throw new NoLanguageFound(
				"This language is not downloaded! Check the AssetsUpdater settings",
			);

		return name;
	}
}
