"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.characterPreview = void 0;
const getAssetUrl_1 = require("../helpers/getAssetUrl");
// @ts-ignore: Json Import
const characters_json_1 = __importDefault(require("../../assets/data/characters.json"));
// @ts-ignore: Json Import
const characters_json_2 = __importDefault(require("../../assets/localizations/characters.json"));
const charactersAssets = characters_json_1.default;
const charactersLocalizations = characters_json_2.default;
class characterPreview {
    constructor(lang, characterPreview) {
        const characterAsset = charactersAssets[characterPreview.avatarId];
        const characterLocalization = charactersLocalizations[characterAsset.nameTextMapHash];
        this.id = characterPreview.avatarId;
        this.name = characterLocalization[lang];
        this.icon = (0, getAssetUrl_1.getAssetUrl)(characterAsset.iconName);
        this.level = characterPreview.level;
    }
}
exports.characterPreview = characterPreview;
