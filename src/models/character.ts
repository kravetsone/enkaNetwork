import { ICharacterAssets, ICharacterConstellationAssets, ILocalizations } from "../types/index";
import { getAssetUrl } from "../helpers/getAssetUrl";
import { getNormalElement } from "../helpers/getNormalElement";
// @ts-ignore: Json Import
import CharactersAssets from "../../assets/data/characters.json";
// @ts-ignore: Json Import
import CharactersConstellationAssets from "../../assets/data/conselations.json";
// @ts-ignore: Json Import
import CharactersLocalizations from "../../assets/localizations/characters.json";
// @ts-ignore: Json Import
import CharactersConstellationLocalizations from "../../assets/localizations/conselations.json";
const charactersAssets: ICharacterAssets = CharactersAssets;
const charactersLocalizations: ILocalizations = CharactersLocalizations;
const charactersConstellationAssets: ICharacterConstellationAssets = CharactersConstellationAssets;
const charactersConstellationLocalizations: ILocalizations = CharactersConstellationLocalizations;
export class character {
    id: number;
    name: string;
    icons: { avatar: string; side: string };
    level: number;
    friendshipLevel: number;
    rarity: number;
    element: string;
    elevations: number;
    xp: number;
    constellation: any[];
    constructor(lang: string, character: any) {
        const characterAsset = charactersAssets[character.avatarId];
        const characterLocalization = charactersLocalizations[characterAsset.nameTextMapHash];
        this.id = character.avatarId;
        this.name = characterLocalization[lang];
        this.rarity = characterAsset.qualityType == "QUALITY_ORANGE" ? 5 : 4;
        this.element = getNormalElement(characterAsset.costElemType);
        this.icons = { avatar: getAssetUrl(characterAsset.iconName), side: getAssetUrl(characterAsset.sideIconName) };
        this.constellation = characterAsset.talents.map((talent) => { return new characterConstellation(lang, talent, character?.talentIdList || []); });
        this.level = Number(character.propMap["4001"]?.ival || 0);
        this.elevations = Number(character.propMap["1002"]?.ival || 0);
        this.xp = Number(character.propMap["1001"]?.ival || 0);
        this.friendshipLevel = character.fetterInfo.expLevel;
    }
}
export class characterConstellation {
    id: number;
    icon: string;
    name: string;
    unlocked: boolean;
    constructor(lang: string, talent: number, talents: number[]) {
        const characteConstellationAsset = charactersConstellationAssets[talent];
        const characterConstellationLocalization = charactersConstellationLocalizations[characteConstellationAsset.nameTextMapHash];
        this.id = talent;
        this.icon = getAssetUrl(characteConstellationAsset.icon);
        this.name = characterConstellationLocalization[lang];
        this.unlocked = talents.includes(talent)
    }
}