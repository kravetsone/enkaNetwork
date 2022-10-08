import { ICharacterAssets, ILocalizations } from "../../types/index";
import { getAssetUrl } from "../../helpers/getAssetUrl";
import {
    charactersAssets,
    charactersLocalizations,
} from "../../helpers/getJsonAssets";

export class ProfilePicture {
    id: number;
    name: string;
    icon: string;
    constructor(lang: string, profilePicture: { avatarId: number }) {
        const characterAsset = charactersAssets[profilePicture.avatarId];
        const characterLocalization =
            charactersLocalizations[characterAsset.nameTextMapHash];
        this.id = profilePicture.avatarId;
        this.name = characterLocalization[lang];
        this.icon = getAssetUrl(characterAsset.iconName);
    }
}
