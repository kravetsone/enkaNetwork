import { NoDataAssetsFound, NoLocalizationAssetsFound } from "../../errors";
import type {
	IProfilePictureData,
	TLanguage,
	TLocalizationData,
} from "../../types";
import { pickName } from "./pickName";

export class ProfilePictureFinder {
	private readonly data: IProfilePictureData[];
	private readonly localization: TLocalizationData;

	constructor(data: IProfilePictureData[], localization: TLocalizationData) {
		this.data = data;
		this.localization = localization;
	}

	// Searching for a **profile picture** by its id (ProfilePictureExcelConfigData id)
	getById(id: number) {
		const profilePicture = this.data.find(
			(profilePicture) => profilePicture.id === id,
		);
		if (!profilePicture)
			throw new NoDataAssetsFound(
				`There is no profile picture with id = ${id}! (check the actuality of assets)`,
			);

		return profilePicture;
	}

	getName(profilePicture: IProfilePictureData, language: TLanguage) {
		const nameLocalization = this.localization[profilePicture.nameTextMapHash];
		if (!nameLocalization)
			throw new NoLocalizationAssetsFound(
				`There is no localization for profile picture with id = ${profilePicture.id}! (check the actuality of assets)`,
			);

		return pickName(
			nameLocalization,
			language,
			`profile picture with id = ${profilePicture.id}`,
		);
	}
}
