import { ICharacterAssets, ILocalizations } from "../../types/index";
import { getAssetUrl } from "../../helpers/getAssetUrl";
// @ts-ignore: Json Import
import CharactersAssets from "../../../assets/data/characters.json";
// @ts-ignore: Json Import
import CharactersLocalizations from "../../../assets/localizations/characters.json";
const charactersAssets: ICharacterAssets = CharactersAssets;
const charactersLocalizations: ILocalizations = CharactersLocalizations;

export class CharacterPreview {
    id: number;
    name: string;
    icon: string;
    level: number;
    constructor(lang: string, CharacterPreview: { avatarId: number, level: number }) {
        const characterAsset = charactersAssets[CharacterPreview.avatarId];
        const characterLocalization = charactersLocalizations[characterAsset.nameTextMapHash];
        this.id = CharacterPreview.avatarId;
        this.name = characterLocalization[lang];
        this.icon = getAssetUrl(characterAsset.iconName);
        this.level = CharacterPreview.level;
    }
}