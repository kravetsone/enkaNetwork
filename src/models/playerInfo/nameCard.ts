import { getAssetUrl } from "../../helpers/getAssetUrl";
import {
    namecardsAssets,
    namecardsLocalizations,
} from "../../helpers/getJsonAssets";

export class NameCard {
    id: number;
    name: string;
    icon: string;
    banner: string;
    navbar: string;
    constructor(lang: string, nameCardId: number) {
        const nameCardAsset = namecardsAssets[nameCardId];
        const nameCardLocalization =
            namecardsLocalizations[nameCardAsset.nameTextMapHash];
        this.id = nameCardId;
        this.name = nameCardLocalization[lang];
        this.icon = getAssetUrl(nameCardAsset.icon);
        this.banner = getAssetUrl(nameCardAsset.picPath[1]);
        this.navbar = getAssetUrl(nameCardAsset.picPath[0]);
    }
}
