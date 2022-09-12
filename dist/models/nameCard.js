"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nameCard = void 0;
const getAssetUrl_1 = require("../helpers/getAssetUrl");
// @ts-ignore: Json Import
const namecards_json_1 = __importDefault(require("../../assets/data/namecards.json"));
// @ts-ignore: Json Import
const namecards_json_2 = __importDefault(require("../../assets/localizations/namecards.json"));
const namecardsAssets = namecards_json_1.default;
const namecardsLocalizations = namecards_json_2.default;
class nameCard {
    constructor(lang, nameCardId) {
        const nameCardAsset = namecardsAssets[nameCardId];
        const nameCardLocalization = namecardsLocalizations[nameCardAsset.nameTextMapHash];
        this.id = nameCardId;
        this.name = nameCardLocalization[lang];
        this.icon = (0, getAssetUrl_1.getAssetUrl)(nameCardAsset.icon);
        this.banner = (0, getAssetUrl_1.getAssetUrl)(nameCardAsset.picPath[0]);
        this.navbar = (0, getAssetUrl_1.getAssetUrl)(nameCardAsset.picPath[0]);
    }
}
exports.nameCard = nameCard;
