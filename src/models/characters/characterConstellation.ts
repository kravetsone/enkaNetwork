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
        const characteConstellationAsset =
            charactersConstellationAssets[talent];
        const characterConstellationLocalization =
            charactersConstellationLocalizations[
                characteConstellationAsset.nameTextMapHash
            ];
        this.id = talent;
        this.icon = getAssetUrl(characteConstellationAsset.icon);
        this.name = characterConstellationLocalization[lang];
        this.unlocked = talents.includes(talent);
    }
}
