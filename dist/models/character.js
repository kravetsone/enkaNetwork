"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.characterStats = exports.characterSkill = exports.characterConstellation = exports.characterWeapon = exports.characterReluquary = exports.character = void 0;
const getAssetUrl_1 = require("../helpers/getAssetUrl");
const getNormalElement_1 = require("../helpers/getNormalElement");
// @ts-ignore: Json Import
const characters_json_1 = __importDefault(require("../../assets/data/characters.json"));
// @ts-ignore: Json Import
const conselations_json_1 = __importDefault(require("../../assets/data/conselations.json"));
// @ts-ignore: Json Import
const skills_json_1 = __importDefault(require("../../assets/data/skills.json"));
// @ts-ignore: Json Import
const characters_json_2 = __importDefault(require("../../assets/localizations/characters.json"));
// @ts-ignore: Json Import
const conselations_json_2 = __importDefault(require("../../assets/localizations/conselations.json"));
// @ts-ignore: Json Import
const skills_json_2 = __importDefault(require("../../assets/localizations/skills.json"));
// @ts-ignore: Json Import
const weapons_json_1 = __importDefault(require("../../assets/localizations/weapons.json"));
// @ts-ignore: Json Import
const artifacts_json_1 = __importDefault(require("../../assets/localizations/artifacts.json"));
// @ts-ignore: Json Import
const artifactSets_json_1 = __importDefault(require("../../assets/localizations/artifactSets.json"));
const charactersAssets = characters_json_1.default;
const charactersLocalizations = characters_json_2.default;
const charactersConstellationAssets = conselations_json_1.default;
const charactersConstellationLocalizations = conselations_json_2.default;
const charactersSkillsAssets = skills_json_1.default;
const charactersSkillsLocalizations = skills_json_2.default;
const charactersWeaponLocalizations = weapons_json_1.default;
const charactersReluquaryLocalizations = artifacts_json_1.default;
const charactersReluquarySetsLocalizations = artifactSets_json_1.default;
class character {
    constructor(lang, character) {
        var _a, _b, _c;
        const characterAsset = charactersAssets[character.avatarId];
        const characterLocalization = charactersLocalizations[characterAsset.nameTextMapHash];
        this.id = character.avatarId;
        this.name = characterLocalization[lang];
        this.rarity = characterAsset.qualityType == "QUALITY_ORANGE" ? 5 : 4;
        this.element = (0, getNormalElement_1.getNormalElement)(characterAsset.costElemType);
        this.icons = { avatar: (0, getAssetUrl_1.getAssetUrl)(characterAsset.iconName), side: (0, getAssetUrl_1.getAssetUrl)(characterAsset.sideIconName) };
        this.weapon = new characterWeapon(lang, character.equipList.filter((x) => x.weapon)[0]);
        this.reluquary = character.equipList.filter((x) => x.reliquary).map((reliquary) => new characterReluquary(lang, reliquary));
        this.stats = new characterStats(character.fightPropMap);
        this.constellation = characterAsset.talents.map((talent) => { return new characterConstellation(lang, talent, (character === null || character === void 0 ? void 0 : character.talentIdList) || []); });
        this.skills = characterAsset.skills.map((skill) => { return new characterSkill(lang, skill, (character === null || character === void 0 ? void 0 : character.skillLevelMap[skill]) || 0); });
        this.skillSetId = character.skillDepotId;
        this.skillData = character.inherentProudSkillList;
        this.level = Number(((_a = character.propMap["4001"]) === null || _a === void 0 ? void 0 : _a.ival) || 0);
        this.elevations = Number(((_b = character.propMap["1002"]) === null || _b === void 0 ? void 0 : _b.ival) || 0);
        this.xp = Number(((_c = character.propMap["1001"]) === null || _c === void 0 ? void 0 : _c.ival) || 0);
        this.friendshipLevel = character.fetterInfo.expLevel;
    }
}
exports.character = character;
const reluquaryTypes = {
    "EQUIP_BRACER": "Flower",
    "EQUIP_NECKLACE": "Feather",
    "EQUIP_SHOES": "Sands",
    "EQUIP_RING": "Goblet",
    "EQUIP_DRESS": "Circlet"
};
class characterReluquary {
    constructor(lang, equipment) {
        this.id = equipment.itemId;
        this.name = charactersReluquaryLocalizations[equipment.flat.nameTextMapHash][lang];
        this.setName = charactersReluquarySetsLocalizations[equipment.flat.setNameTextMapHash][lang];
        this.icon = (0, getAssetUrl_1.getAssetUrl)(equipment.flat.icon);
        this.type = reluquaryTypes[equipment.flat.equipType];
        this.level = --equipment.reliquary.level;
        this.rarity = equipment.flat.rankLevel;
        this.mainStats = equipment.flat.reliquaryMainstat;
        this.subStats = equipment.flat.reliquarySubstats;
    }
}
exports.characterReluquary = characterReluquary;
class characterWeapon {
    constructor(lang, equipment) {
        this.id = equipment.itemId;
        this.name = charactersWeaponLocalizations[equipment.flat.nameTextMapHash][lang];
        this.icon = (0, getAssetUrl_1.getAssetUrl)(equipment.flat.icon);
        this.level = equipment.weapon.level;
        this.elevations = equipment.weapon.promoteLevel || 0;
        this.improvement = equipment.weapon.affixMap ? equipment.weapon.affixMap[Object.keys(equipment.weapon.affixMap)[0]] + 1 : 1;
        this.rarity = equipment.flat.rankLevel;
        this.mainStat = equipment.flat.weaponStats[0];
        this.subStat = equipment.flat.weaponStats[1] || false;
    }
}
exports.characterWeapon = characterWeapon;
class characterConstellation {
    constructor(lang, talent, talents) {
        const characteConstellationAsset = charactersConstellationAssets[talent];
        const characterConstellationLocalization = charactersConstellationLocalizations[characteConstellationAsset.nameTextMapHash];
        this.id = talent;
        this.icon = (0, getAssetUrl_1.getAssetUrl)(characteConstellationAsset.icon);
        this.name = characterConstellationLocalization[lang];
        this.unlocked = talents.includes(talent);
    }
}
exports.characterConstellation = characterConstellation;
class characterSkill {
    constructor(lang, skill, level) {
        const charactersSkillsAsset = charactersSkillsAssets[skill];
        const charactersSkillsLocalization = charactersSkillsLocalizations[charactersSkillsAsset.nameTextMapHash];
        this.id = skill;
        this.icon = (0, getAssetUrl_1.getAssetUrl)(charactersSkillsAsset.skillIcon);
        this.name = charactersSkillsLocalization[lang];
        this.level = level;
    }
}
exports.characterSkill = characterSkill;
class characterStats {
    constructor(stats) {
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
exports.characterStats = characterStats;
