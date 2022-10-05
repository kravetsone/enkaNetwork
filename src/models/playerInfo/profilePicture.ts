import { ICharacterAssets, ILocalizations } from "../../types/index";
import { getAssetUrl } from "../../helpers/getAssetUrl";
// @ts-ignore: Json Import
import CharactersAssets from "../../../assets/data/characters.json";
// @ts-ignore: Json Import
import CharactersLocalizations from "../../../assets/localizations/characters.json";
const charactersAssets: ICharacterAssets = CharactersAssets;
const charactersLocalizations: ILocalizations = CharactersLocalizations;

export class ProfilePicture {
    id: number;
    name: string;
    icon: string;
    constructor(lang: string, profilePicture: { avatarId: number }) {
        const characterAsset = charactersAssets[profilePicture.avatarId];
        const characterLocalization = charactersLocalizations[characterAsset.nameTextMapHash];
        this.id = profilePicture.avatarId;
        this.name = characterLocalization[lang];
        this.icon = getAssetUrl(characterAsset.iconName)
    }
}