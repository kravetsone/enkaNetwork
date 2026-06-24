import type { AssetsFinder } from "../../helpers";
import type { IProfilePicture, TLanguage } from "../../types";

export class ProfilePicture {
	// The id sent by the game: a ProfilePictureExcelConfigData id (modern) or a character id (legacy).
	id: number;
	// Name in the selected language
	name: string;
	// Icon
	icon?: string;

	constructor(
		assets: AssetsFinder,
		language: TLanguage,
		profilePicture: IProfilePicture,
	) {
		// Modern accounts send `{ id }` (a ProfilePictureExcelConfigData id);
		// legacy accounts send `{ avatarId }` (a character id).
		if (profilePicture.id !== undefined) {
			const asset = assets.profilePictures.getById(profilePicture.id);

			this.id = profilePicture.id;
			this.name = assets.profilePictures.getName(asset, language);
			this.icon = assets.getAssetPath(asset.iconName);
		} else {
			const character = assets.characters.getById(
				profilePicture.avatarId as number,
			);

			this.id = profilePicture.avatarId as number;
			this.name = assets.characters.getName(character, language);
			this.icon = assets.getAssetPath(character.iconName);
		}
	}
}
