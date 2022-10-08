import { ICharacterAssets, ILocalizations } from "../../types/index";
import { getAssetUrl } from "../../helpers/getAssetUrl";
import {
    charactersAssets,
    charactersLocalizations,
} from "../../helpers/getJsonAssets";

export class CharacterPreview {
    id: number;
    name: string;
    icon: string;
    level: number;
    constructor(
        lang: string,
        CharacterPreview: { avatarId: number; level: number }
    ) {
        const characterAsset = charactersAssets[CharacterPreview.avatarId];
        const characterLocalization =
            charactersLocalizations[characterAsset.nameTextMapHash];
        this.id = CharacterPreview.avatarId;
        this.name = characterLocalization[lang];
        this.icon = getAssetUrl(characterAsset.iconName);
        this.level = CharacterPreview.level;
    }
}
