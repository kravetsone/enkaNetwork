import { getAssetUrl } from "../../helpers/getAssetUrl";
import {
    charactersAssets,
    charactersCostumes,
    charactersLocalizations,
} from "../../helpers/getJsonAssets";

export class CharacterPreview {
    id: number;
    name: string;
    icon?: string;
    level: number;
    constructor(
        lang: string,
        characterPreview: {
            avatarId: number;
            level: number;
            costumeId?: number;
        }
    ) {
        const characterAsset = charactersAssets[characterPreview.avatarId];
        const characterLocalization =
            charactersLocalizations[characterAsset.nameTextMapHash];
        this.id = characterPreview.avatarId;
        this.name = characterLocalization[lang];
        this.icon = getAssetUrl(
            characterPreview.costumeId
                ? charactersCostumes[characterPreview.costumeId].iconName
                : characterAsset.iconName
        );
        this.level = characterPreview.level;
    }
}
