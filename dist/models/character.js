"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.characterConstellation = exports.character = void 0;
const getAssetUrl_1 = require("../helpers/getAssetUrl");
const getNormalElement_1 = require("../helpers/getNormalElement");
// @ts-ignore: Json Import
const characters_json_1 = __importDefault(require("../../assets/data/characters.json"));
// @ts-ignore: Json Import
const conselations_json_1 = __importDefault(require("../../assets/data/conselations.json"));
// @ts-ignore: Json Import
const characters_json_2 = __importDefault(require("../../assets/localizations/characters.json"));
// @ts-ignore: Json Import
const conselations_json_2 = __importDefault(require("../../assets/localizations/conselations.json"));
const charactersAssets = characters_json_1.default;
const charactersLocalizations = characters_json_2.default;
const charactersConstellationAssets = conselations_json_1.default;
const charactersConstellationLocalizations = conselations_json_2.default;
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
        this.constellation = characterAsset.talents.map((talent) => { return new characterConstellation(lang, talent, (character === null || character === void 0 ? void 0 : character.talentIdList) || []); });
        this.level = Number(((_a = character.propMap["4001"]) === null || _a === void 0 ? void 0 : _a.ival) || 0);
        this.elevations = Number(((_b = character.propMap["1002"]) === null || _b === void 0 ? void 0 : _b.ival) || 0);
        this.xp = Number(((_c = character.propMap["1001"]) === null || _c === void 0 ? void 0 : _c.ival) || 0);
        this.friendshipLevel = character.fetterInfo.expLevel;
    }
}
exports.character = character;
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
