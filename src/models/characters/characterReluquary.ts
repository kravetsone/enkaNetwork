import { getAssetUrl } from "../../helpers/getAssetUrl";
import {
    charactersReluquaryLocalizations,
    charactersReluquarySetsLocalizations,
} from "../../helpers/getJsonAssets";

const reluquaryTypes: { [key: string]: string } = {
    EQUIP_BRACER: "Flower",
    EQUIP_NECKLACE: "Feather",
    EQUIP_SHOES: "Sands",
    EQUIP_RING: "Goblet",
    EQUIP_DRESS: "Circlet",
};

export class CharacterReluquary {
    id: number;
    level: number;
    rarity: number;
    mainStats: { appendPropId: string; statValue: number };
    subStats: { appendPropId: string; statValue: number }[];
    icon?: string;
    name: string;
    type: string;
    setName: string;
    constructor(lang: string, equipment: any) {
        this.id = equipment.itemId;
        this.name =
            charactersReluquaryLocalizations[equipment.flat.nameTextMapHash][
                lang
            ];
        this.setName =
            charactersReluquarySetsLocalizations[
                equipment.flat.setNameTextMapHash
            ][lang];
        this.icon = getAssetUrl(equipment.flat.icon);
        this.type = reluquaryTypes[equipment.flat.equipType];
        this.level = --equipment.reliquary.level;
        this.rarity = equipment.flat.rankLevel;
        this.mainStats = equipment.flat.reliquaryMainstat;
        this.subStats = equipment.flat.reliquarySubstats;
    }
}
