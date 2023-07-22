import { AssetsFinder } from "../../helpers";
import { IProfilePicture, TLanguage } from "../../types";

export class ProfilePicture {
    // Character id
    id: number;
    // Character name in the selected language
    name: string;
    // Character icon
    icon?: string;

    constructor(
        assets: AssetsFinder,
        language: TLanguage,
        profilePicture: IProfilePicture,
    ) {
        const character = assets.characters.getById(profilePicture.avatarId);

        this.id = profilePicture.avatarId;
        this.name = assets.characters.getName(character, language);
        this.icon = assets.getAssetPath(character.iconName);
    }
}
