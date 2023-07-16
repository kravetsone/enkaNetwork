import { getAssetUrl } from "../../helpers/getAssetUrl";
import {
    charactersReliquaryLocalizations,
    charactersReliquarySetsLocalizations,
} from "../../helpers/getJsonAssets";

const reliquaryTypes: { [key: string]: string } = {
    EQUIP_BRACER: "Flower",
    EQUIP_NECKLACE: "Feather",
    EQUIP_SHOES: "Sands",
    EQUIP_RING: "Goblet",
    EQUIP_DRESS: "Circlet",
};

export class CharacterReliquary {
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
            charactersReliquaryLocalizations[equipment.flat.nameTextMapHash][
                lang
            ];
        this.setName =
            charactersReliquarySetsLocalizations[
                equipment.flat.setNameTextMapHash
            ][lang];
        this.icon = getAssetUrl(equipment.flat.icon);
        this.type = reliquaryTypes[equipment.flat.equipType];
        this.level = --equipment.reliquary.level;
        this.rarity = equipment.flat.rankLevel;
        this.mainStats = equipment.flat.reliquaryMainstat;
        this.subStats = equipment.flat.reliquarySubstats;
    }
}
