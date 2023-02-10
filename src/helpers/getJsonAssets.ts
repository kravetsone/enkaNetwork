import {
    ICharacterAssets,
    ICharacterConstellationAssets,
    ICharacterSkillAssets,
    ILocalizations,
    INameCardAssets,
} from "../types/index";

// @ts-ignore: Json Import
import CharactersAssets from "../../assets/data/characters.json";
export const charactersAssets: ICharacterAssets = CharactersAssets;
// @ts-ignore: Json Import
import CharactersLocalizations from "../../assets/localizations/characters.json";
export const charactersLocalizations: ILocalizations = CharactersLocalizations;

// @ts-ignore: Json Import
import CharactersConstellationAssets from "../../assets/data/constellations.json";
export const charactersConstellationAssets: ICharacterConstellationAssets =
    CharactersConstellationAssets;
// @ts-ignore: Json Import
import CharactersConstellationLocalizations from "../../assets/localizations/constellations.json";
export const charactersConstellationLocalizations: ILocalizations =
    CharactersConstellationLocalizations;

// @ts-ignore: Json Import
import CharactersSkillsAssets from "../../assets/data/skills.json";
export const charactersSkillsAssets: ICharacterSkillAssets =
    CharactersSkillsAssets;
// @ts-ignore: Json Import
import CharactersSkillsLocalizations from "../../assets/localizations/skills.json";
export const charactersSkillsLocalizations: ILocalizations =
    CharactersSkillsLocalizations;

// @ts-ignore: Json Import
import CharactersWeaponLocalizations from "../../assets/localizations/weapons.json";
export const charactersWeaponLocalizations: ILocalizations =
    CharactersWeaponLocalizations;

// @ts-ignore: Json Import
import CharactersReluquaryLocalizations from "../../assets/localizations/artifacts.json";
export const charactersReluquaryLocalizations: ILocalizations =
    CharactersReluquaryLocalizations;
// @ts-ignore: Json Import
import CharactersReluquarySetsLocalizations from "../../assets/localizations/artifactSets.json";
export const charactersReluquarySetsLocalizations: ILocalizations =
    CharactersReluquarySetsLocalizations;

// @ts-ignore: Json Import
import NameCardsAssets from "../../assets/data/namecards.json";
export const namecardsAssets: INameCardAssets = NameCardsAssets;
// @ts-ignore: Json Import
import NameCardsLocalizations from "../../assets/localizations/namecards.json";
export const namecardsLocalizations: ILocalizations = NameCardsLocalizations;
