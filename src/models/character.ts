import { ICharacterAssets, ICharacterConstellationAssets, ICharacterSkillsAssets, ILocalizations } from "../types/index";
import { getAssetUrl } from "../helpers/getAssetUrl";
import { getNormalElement } from "../helpers/getNormalElement";
// @ts-ignore: Json Import
import CharactersAssets from "../../assets/data/characters.json";
// @ts-ignore: Json Import
import CharactersConstellationAssets from "../../assets/data/conselations.json";
// @ts-ignore: Json Import
import CharactersSkillsAssets from "../../assets/data/skills.json";
// @ts-ignore: Json Import
import CharactersLocalizations from "../../assets/localizations/characters.json";
// @ts-ignore: Json Import
import CharactersConstellationLocalizations from "../../assets/localizations/conselations.json";
// @ts-ignore: Json Import
import CharactersSkillsLocalizations from "../../assets/localizations/skills.json";
// @ts-ignore: Json Import
import CharactersWeaponLocalizations from "../../assets/localizations/weapons.json";
// @ts-ignore: Json Import
import CharactersReluquaryLocalizations from "../../assets/localizations/artifacts.json";
// @ts-ignore: Json Import
import CharactersReluquarySetsLocalizations from "../../assets/localizations/artifactSets.json";

const charactersAssets: ICharacterAssets = CharactersAssets;
const charactersLocalizations: ILocalizations = CharactersLocalizations;
const charactersConstellationAssets: ICharacterConstellationAssets = CharactersConstellationAssets;
const charactersConstellationLocalizations: ILocalizations = CharactersConstellationLocalizations;
const charactersSkillsAssets: ICharacterSkillsAssets = CharactersSkillsAssets;
const charactersSkillsLocalizations: ILocalizations = CharactersSkillsLocalizations;
const charactersWeaponLocalizations: ILocalizations = CharactersWeaponLocalizations;
const charactersReluquaryLocalizations: ILocalizations = CharactersReluquaryLocalizations;
const charactersReluquarySetsLocalizations: ILocalizations = CharactersReluquarySetsLocalizations;

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
    constellation: characterConstellation[];
    stats: characterStats;
    skills: characterSkills[];
    skillSetId: number;
    skillData: number[];
    weapon: any;
    reluquary: characterReluquary;
    constructor(lang: string, character: any) {
        const characterAsset = charactersAssets[character.avatarId];
        const characterLocalization = charactersLocalizations[characterAsset.nameTextMapHash];
        this.id = character.avatarId;
        this.name = characterLocalization[lang];
        this.rarity = characterAsset.qualityType == "QUALITY_ORANGE" ? 5 : 4;
        this.element = getNormalElement(characterAsset.costElemType);
        this.icons = { avatar: getAssetUrl(characterAsset.iconName), side: getAssetUrl(characterAsset.sideIconName) };
        this.weapon = new characterWeapon(lang, character.equipList.filter((x: { weapon: any; }) => x.weapon)[0]);
        this.reluquary = character.equipList.filter((x: { reliquary: any; }) => x.reliquary).map((reliquary: any) => new characterReluquary(lang, reliquary));
        this.stats = new characterStats(character.fightPropMap);
        this.constellation = characterAsset.talents.map((talent) => { return new characterConstellation(lang, talent, character?.talentIdList || []); });
        this.skills = characterAsset.skills.map((skill) => { return new characterSkills(lang, skill, character?.skillLevelMap[skill] || 0); });
        this.skillSetId = character.skillDepotId;
        this.skillData = character.inherentProudSkillList;
        this.level = Number(character.propMap["4001"]?.ival || 0);
        this.elevations = Number(character.propMap["1002"]?.ival || 0);
        this.xp = Number(character.propMap["1001"]?.ival || 0);
        this.friendshipLevel = character.fetterInfo.expLevel;
    }
}
const reluquaryTypes: { [key: string]: string } = {
    "EQUIP_BRACER": "Flower",
    "EQUIP_NECKLACE": "Feather",
    "EQUIP_SHOES": "Sands",
    "EQUIP_RING": "Goblet",
    "EQUIP_DRESS": "Circlet"
}
export class characterReluquary {
    id: number;
    level: number;
    raity: number;
    mainStats: { appendPropId: string, statValue: number };
    subStats: { appendPropId: string, statValue: number }[];
    icon: string;
    name: string;
    type: string;
    setName: string;
    constructor(lang: string, equipment: any) {
        this.id = equipment.itemId;
        this.name = charactersReluquaryLocalizations[equipment.flat.nameTextMapHash][lang];
        this.setName = charactersReluquarySetsLocalizations[equipment.flat.setNameTextMapHash][lang];
        this.icon = getAssetUrl(equipment.flat.icon);
        this.type = reluquaryTypes[equipment.flat.equipType]
        this.level = --equipment.reliquary.level;
        this.raity = equipment.flat.rankLevel;
        this.mainStats = equipment.flat.reliquaryMainstat;
        this.subStats = equipment.flat.reliquarySubstats;
    }
}
export class characterWeapon {
    id: number;
    level: number;
    elevations: number;
    improvement: number;
    raity: number;
    mainStat: { appendPropId: string, statValue: number };
    subStat: { appendPropId: string, statValue: number };
    icon: string;
    name: string;
    constructor(lang: string, equipment: any) {
        this.id = equipment.itemId;
        this.name = charactersWeaponLocalizations[equipment.flat.nameTextMapHash][lang];
        this.icon = getAssetUrl(equipment.flat.icon);
        this.level = equipment.weapon.level;
        this.elevations = equipment.weapon.promoteLevel;
        this.improvement = equipment.weapon.affixMap[Object.keys(equipment.weapon.affixMap)[0]] + 1;
        this.raity = equipment.flat.rankLevel;
        this.mainStat = equipment.flat.weaponStats[0];
        this.subStat = equipment.flat.weaponStats[1];
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
export class characterSkills {
    id: number;
    icon: string;
    name: string;
    level: number;
    constructor(lang: string, skill: number, level: number) {
        const charactersSkillsAsset = charactersSkillsAssets[skill];
        const charactersSkillsLocalization = charactersSkillsLocalizations[charactersSkillsAsset.nameTextMapHash];
        this.id = skill;
        this.icon = getAssetUrl(charactersSkillsAsset.skillIcon);
        this.name = charactersSkillsLocalization[lang];
        this.level = level;
    }
}
export class characterStats {
    BASE_HP: number;
    FIGHT_PROP_HP: number;
    FIGHT_PROP_HP_PERCENT: number;
    FIGHT_PROP_BASE_ATTACK: number;
    FIGHT_PROP_ATTACK: number;
    FIGHT_PROP_ATTACK_PERCENT: number;
    FIGHT_PROP_BASE_DEFENSE: number;
    FIGHT_PROP_DEFENSE: number;
    FIGHT_PROP_DEFENSE_PERCENT: number;
    FIGHT_PROP_BASE_SPEED: number;
    FIGHT_PROP_SPEED_PERCENT: number;
    FIGHT_PROP_HP_MP_PERCENT: number;
    FIGHT_PROP_ATTACK_MP_PERCENT: number;
    FIGHT_PROP_CRITICAL: number;
    FIGHT_PROP_ANTI_CRITICAL: number;
    FIGHT_PROP_CRITICAL_HURT: number;
    FIGHT_PROP_CHARGE_EFFICIENCY: number;
    FIGHT_PROP_ADD_HURT: number;
    FIGHT_PROP_SUB_HURT: number;
    FIGHT_PROP_HEAL_ADD: number;
    FIGHT_PROP_HEALED_ADD: number;
    FIGHT_PROP_ELEMENT_MASTERY: number;
    FIGHT_PROP_PHYSICAL_SUB_HURT: number;
    FIGHT_PROP_PHYSICAL_ADD_HURT: number;
    FIGHT_PROP_DEFENCE_IGNORE_RATIO: number;
    FIGHT_PROP_DEFENCE_IGNORE_DELTA: number;
    FIGHT_PROP_FIRE_ADD_HURT: number;
    FIGHT_PROP_ELEC_ADD_HURT: number;
    FIGHT_PROP_WATER_ADD_HURT: number;
    FIGHT_PROP_GRASS_ADD_HURT: number;
    FIGHT_PROP_WIND_ADD_HURT: number;
    FIGHT_PROP_ROCK_ADD_HURT: number;
    FIGHT_PROP_ICE_ADD_HURT: number;
    FIGHT_PROP_HIT_HEAD_ADD_HURT: number;
    FIGHT_PROP_FIRE_SUB_HURT: number;
    FIGHT_PROP_ELEC_SUB_HURT: number;
    FIGHT_PROP_WATER_SUB_HURT: number;
    FIGHT_PROP_GRASS_SUB_HURT: number;
    FIGHT_PROP_WIND_SUB_HURT: number;
    FIGHT_PROP_ROCK_SUB_HURT: number;
    FIGHT_PROP_ICE_SUB_HURT: number;
    FIGHT_PROP_EFFECT_HIT: number;
    FIGHT_PROP_EFFECT_RESIST: number;
    FIGHT_PROP_FREEZE_RESIST: number;
    FIGHT_PROP_TORPOR_RESIST: number;
    FIGHT_PROP_DIZZY_RESIST: number;
    FIGHT_PROP_FREEZE_SHORTEN: number;
    FIGHT_PROP_TORPOR_SHORTEN: number;
    FIGHT_PROP_DIZZY_SHORTEN: number;
    FIGHT_PROP_MAX_FIRE_ENERGY: number;
    FIGHT_PROP_MAX_ELEC_ENERGY: number;
    FIGHT_PROP_MAX_WATER_ENERGY: number;
    FIGHT_PROP_MAX_GRASS_ENERGY: number;
    FIGHT_PROP_MAX_WIND_ENERGY: number;
    FIGHT_PROP_MAX_ICE_ENERGY: number;
    FIGHT_PROP_MAX_ROCK_ENERGY: number;
    FIGHT_PROP_SKILL_CD_MINUS_RATIO: number;
    FIGHT_PROP_SHIELD_COST_MINUS_RATIO: number;
    FIGHT_PROP_CUR_FIRE_ENERGY: number;
    FIGHT_PROP_CUR_ELEC_ENERGY: number;
    FIGHT_PROP_CUR_WATER_ENERGY: number;
    FIGHT_PROP_CUR_GRASS_ENERGY: number;
    FIGHT_PROP_CUR_WIND_ENERGY: number;
    FIGHT_PROP_CUR_ICE_ENERGY: number;
    FIGHT_PROP_CUR_ROCK_ENERGY: number;
    FIGHT_PROP_CUR_HP: number;
    FIGHT_PROP_MAX_HP: number;
    FIGHT_PROP_CUR_ATTACK: number;
    FIGHT_PROP_CUR_DEFENSE: number;
    FIGHT_PROP_CUR_SPEED: number;
    FIGHT_PROP_NONEXTRA_ATTACK: number;
    FIGHT_PROP_NONEXTRA_DEFENSE: number;
    FIGHT_PROP_NONEXTRA_CRITICAL: number;
    FIGHT_PROP_NONEXTRA_CRITICAL_HURT: number;
    FIGHT_PROP_NONEXTRA_CHARGE_EFFICIENCY: number;
    FIGHT_PROP_NONEXTRA_ELEMENT_MASTERY: number;
    FIGHT_PROP_NONEXTRA_PHYSICAL_SUB_HURT: number;
    FIGHT_PROP_NONEXTRA_FIRE_ADD_HURT: number;
    FIGHT_PROP_NONEXTRA_ELEC_ADD_HURT: number;
    FIGHT_PROP_NONEXTRA_WATER_ADD_HURT: number;
    FIGHT_PROP_NONEXTRA_GRASS_ADD_HURT: number;
    FIGHT_PROP_NONEXTRA_WIND_ADD_HURT: number;
    FIGHT_PROP_NONEXTRA_ROCK_ADD_HURT: number;
    FIGHT_PROP_NONEXTRA_ICE_ADD_HURT: number;
    FIGHT_PROP_NONEXTRA_FIRE_SUB_HURT: number;
    FIGHT_PROP_NONEXTRA_ELEC_SUB_HURT: number;
    FIGHT_PROP_NONEXTRA_WATER_SUB_HURT: number;
    FIGHT_PROP_NONEXTRA_GRASS_SUB_HURT: number;
    FIGHT_PROP_NONEXTRA_WIND_SUB_HURT: number;
    FIGHT_PROP_NONEXTRA_ROCK_SUB_HURT: number;
    FIGHT_PROP_NONEXTRA_ICE_SUB_HURT: number;
    FIGHT_PROP_NONEXTRA_SKILL_CD_MINUS_RATIO: number;
    FIGHT_PROP_NONEXTRA_SHIELD_COST_MINUS_RATIO: number;
    FIGHT_PROP_NONEXTRA_PHYSICAL_ADD_HURT: number;
    constructor(stats: Record<string, number>) {
        this.BASE_HP = stats["1"] || 0;
        this.FIGHT_PROP_HP = stats["2"] || 0;
        this.FIGHT_PROP_HP_PERCENT = stats["3"] || 0;
        this.FIGHT_PROP_BASE_ATTACK = stats["4"] || 0;
        this.FIGHT_PROP_ATTACK = stats["5"] || 0;
        this.FIGHT_PROP_ATTACK_PERCENT = stats["6"] || 0;
        this.FIGHT_PROP_BASE_DEFENSE = stats["7"] || 0;
        this.FIGHT_PROP_DEFENSE = stats["8"] || 0;
        this.FIGHT_PROP_DEFENSE_PERCENT = stats["9"] || 0;
        this.FIGHT_PROP_BASE_SPEED = stats["10"] || 0;
        this.FIGHT_PROP_SPEED_PERCENT = stats["11"] || 0;
        this.FIGHT_PROP_HP_MP_PERCENT = stats["12"] || 0;
        this.FIGHT_PROP_ATTACK_MP_PERCENT = stats["13"] || 0;
        this.FIGHT_PROP_CRITICAL = stats["20"] || 0;
        this.FIGHT_PROP_ANTI_CRITICAL = stats["21"] || 0;
        this.FIGHT_PROP_CRITICAL_HURT = stats["22"] || 0;
        this.FIGHT_PROP_CHARGE_EFFICIENCY = stats["23"] || 0;
        this.FIGHT_PROP_ADD_HURT = stats["24"] || 0;
        this.FIGHT_PROP_SUB_HURT = stats["25"] || 0;
        this.FIGHT_PROP_HEAL_ADD = stats["26"] || 0;
        this.FIGHT_PROP_HEALED_ADD = stats["27"] || 0;
        this.FIGHT_PROP_ELEMENT_MASTERY = stats["28"] || 0;
        this.FIGHT_PROP_PHYSICAL_SUB_HURT = stats["29"] || 0;
        this.FIGHT_PROP_PHYSICAL_ADD_HURT = stats["30"] || 0;
        this.FIGHT_PROP_DEFENCE_IGNORE_RATIO = stats["31"] || 0;
        this.FIGHT_PROP_DEFENCE_IGNORE_DELTA = stats["32"] || 0;
        this.FIGHT_PROP_FIRE_ADD_HURT = stats["40"] || 0;
        this.FIGHT_PROP_ELEC_ADD_HURT = stats["41"] || 0;
        this.FIGHT_PROP_WATER_ADD_HURT = stats["42"] || 0;
        this.FIGHT_PROP_GRASS_ADD_HURT = stats["43"] || 0;
        this.FIGHT_PROP_WIND_ADD_HURT = stats["44"] || 0;
        this.FIGHT_PROP_ROCK_ADD_HURT = stats["45"] || 0;
        this.FIGHT_PROP_ICE_ADD_HURT = stats["46"] || 0;
        this.FIGHT_PROP_HIT_HEAD_ADD_HURT = stats["47"] || 0;
        this.FIGHT_PROP_FIRE_SUB_HURT = stats["50"] || 0;
        this.FIGHT_PROP_ELEC_SUB_HURT = stats["51"] || 0;
        this.FIGHT_PROP_WATER_SUB_HURT = stats["52"] || 0;
        this.FIGHT_PROP_GRASS_SUB_HURT = stats["53"] || 0;
        this.FIGHT_PROP_WIND_SUB_HURT = stats["54"] || 0;
        this.FIGHT_PROP_ROCK_SUB_HURT = stats["55"] || 0;
        this.FIGHT_PROP_ICE_SUB_HURT = stats["56"] || 0;
        this.FIGHT_PROP_EFFECT_HIT = stats["60"] || 0;
        this.FIGHT_PROP_EFFECT_RESIST = stats["61"] || 0;
        this.FIGHT_PROP_FREEZE_RESIST = stats["32"] || 0;
        this.FIGHT_PROP_TORPOR_RESIST = stats["63"] || 0;
        this.FIGHT_PROP_DIZZY_RESIST = stats["64"] || 0;
        this.FIGHT_PROP_FREEZE_SHORTEN = stats["65"] || 0;
        this.FIGHT_PROP_TORPOR_SHORTEN = stats["66"] || 0;
        this.FIGHT_PROP_DIZZY_SHORTEN = stats["67"] || 0;
        this.FIGHT_PROP_MAX_FIRE_ENERGY = stats["70"] || 0;
        this.FIGHT_PROP_MAX_ELEC_ENERGY = stats["71"] || 0;
        this.FIGHT_PROP_MAX_WATER_ENERGY = stats["72"] || 0;
        this.FIGHT_PROP_MAX_GRASS_ENERGY = stats["73"] || 0;
        this.FIGHT_PROP_MAX_WIND_ENERGY = stats["74"] || 0;
        this.FIGHT_PROP_MAX_ICE_ENERGY = stats["75"] || 0;
        this.FIGHT_PROP_MAX_ROCK_ENERGY = stats["76"] || 0;
        this.FIGHT_PROP_SKILL_CD_MINUS_RATIO = stats["80"] || 0;
        this.FIGHT_PROP_SHIELD_COST_MINUS_RATIO = stats["81"] || 0;

        this.FIGHT_PROP_CUR_FIRE_ENERGY = stats["1000"] || 0;
        this.FIGHT_PROP_CUR_ELEC_ENERGY = stats["1001"] || 0;
        this.FIGHT_PROP_CUR_WATER_ENERGY = stats["1002"] || 0;
        this.FIGHT_PROP_CUR_GRASS_ENERGY = stats["1003"] || 0;
        this.FIGHT_PROP_CUR_WIND_ENERGY = stats["1004"] || 0;
        this.FIGHT_PROP_CUR_ICE_ENERGY = stats["1005"] || 0;
        this.FIGHT_PROP_CUR_ROCK_ENERGY = stats["1006"] || 0;
        this.FIGHT_PROP_CUR_HP = stats["1010"] || 0;

        this.FIGHT_PROP_MAX_HP = stats["2000"] || 0;
        this.FIGHT_PROP_CUR_ATTACK = stats["2001"] || 0;
        this.FIGHT_PROP_CUR_DEFENSE = stats["2002"] || 0;
        this.FIGHT_PROP_CUR_SPEED = stats["2003"] || 0;

        this.FIGHT_PROP_NONEXTRA_ATTACK = stats["3000"] || 0;
        this.FIGHT_PROP_NONEXTRA_DEFENSE = stats["3001"] || 0;
        this.FIGHT_PROP_NONEXTRA_CRITICAL = stats["3002"] || 0;
        this.FIGHT_PROP_CUR_SPEED = stats["3003"] || 0;
        this.FIGHT_PROP_NONEXTRA_CRITICAL_HURT = stats["3004"] || 0;
        this.FIGHT_PROP_NONEXTRA_CHARGE_EFFICIENCY = stats["3005"] || 0;
        this.FIGHT_PROP_NONEXTRA_ELEMENT_MASTERY = stats["3006"] || 0;
        this.FIGHT_PROP_NONEXTRA_PHYSICAL_SUB_HURT = stats["3007"] || 0;
        this.FIGHT_PROP_NONEXTRA_FIRE_ADD_HURT = stats["3008"] || 0;
        this.FIGHT_PROP_NONEXTRA_ELEC_ADD_HURT = stats["3009"] || 0;
        this.FIGHT_PROP_NONEXTRA_WATER_ADD_HURT = stats["3010"] || 0;
        this.FIGHT_PROP_NONEXTRA_GRASS_ADD_HURT = stats["3011"] || 0;
        this.FIGHT_PROP_NONEXTRA_WIND_ADD_HURT = stats["3012"] || 0;
        this.FIGHT_PROP_NONEXTRA_ROCK_ADD_HURT = stats["3013"] || 0;
        this.FIGHT_PROP_NONEXTRA_ICE_ADD_HURT = stats["3014"] || 0;
        this.FIGHT_PROP_NONEXTRA_FIRE_SUB_HURT = stats["3015"] || 0;
        this.FIGHT_PROP_NONEXTRA_ELEC_SUB_HURT = stats["3016"] || 0;
        this.FIGHT_PROP_NONEXTRA_WATER_SUB_HURT = stats["3017"] || 0;
        this.FIGHT_PROP_NONEXTRA_GRASS_SUB_HURT = stats["3018"] || 0;
        this.FIGHT_PROP_NONEXTRA_WIND_SUB_HURT = stats["3019"] || 0;
        this.FIGHT_PROP_NONEXTRA_ROCK_SUB_HURT = stats["3020"] || 0;
        this.FIGHT_PROP_NONEXTRA_ICE_SUB_HURT = stats["3021"] || 0;
        this.FIGHT_PROP_NONEXTRA_SKILL_CD_MINUS_RATIO = stats["3022"] || 0;
        this.FIGHT_PROP_NONEXTRA_SHIELD_COST_MINUS_RATIO = stats["3023"] || 0;
        this.FIGHT_PROP_NONEXTRA_PHYSICAL_ADD_HURT = stats["3024"] || 0;
    }
}