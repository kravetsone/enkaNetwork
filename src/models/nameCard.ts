import { ILocalizations, INameCardAssets } from "../types/index";
import { getAssetUrl } from "../helpers/getAssetUrl";
// @ts-ignore: Json Import
import NameCardsAssets from "../../assets/data/namecards.json";
// @ts-ignore: Json Import
import NameCardsLocalizations from "../../assets/localizations/namecards.json";
const namecardsAssets: INameCardAssets = NameCardsAssets;
const namecardsLocalizations: ILocalizations = NameCardsLocalizations;
export class nameCard {
    id: number;
    name: string;
    icon: string;
    banner: string;
    navbar: string;
    constructor(lang: string, nameCardId: number) {
        const nameCardAsset = namecardsAssets[nameCardId];
        const nameCardLocalization = namecardsLocalizations[nameCardAsset.nameTextMapHash];
        this.id = nameCardId;
        this.name = nameCardLocalization[lang];
        this.icon = getAssetUrl(nameCardAsset.icon);
        this.banner = getAssetUrl(nameCardAsset.picPath[0]);
        this.navbar = getAssetUrl(nameCardAsset.picPath[0]);
    }

}