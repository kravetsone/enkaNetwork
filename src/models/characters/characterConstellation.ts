import { getAssetUrl } from "../../helpers/getAssetUrl";
import {
    charactersConstellationAssets,
    charactersConstellationLocalizations,
} from "../../helpers/getJsonAssets";

export class CharacterConstellation {
    id: number;
    icon?: string;
    name: string;
    unlocked: boolean;
    constructor(lang: string, talent: number, talents: number[]) {
        const characterConstellationAsset =
            charactersConstellationAssets[talent];
        const characterConstellationLocalization =
            charactersConstellationLocalizations[
                characterConstellationAsset.nameTextMapHash
            ];
        this.id = talent;
        this.icon = getAssetUrl(characterConstellationAsset.icon);
        this.name = characterConstellationLocalization[lang];
        this.unlocked = talents.includes(talent);
    }
}
