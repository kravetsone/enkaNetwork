import { AssetsFinder } from "../../helpers";
import { IEquipReliquary, TLanguage } from "../../types";

const reliquaryTypes: Record<
	string,
	"Flower" | "Feather" | "Sands" | "Goblet" | "Circlet"
> = {
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
	mainStats: { mainPropId: string; statValue: number };
	subStats: { appendPropId: string; statValue: number }[];
	icon?: string;
	name: string;
	type: "Flower" | "Feather" | "Sands" | "Goblet" | "Circlet";
	setName: string;

	constructor(
		assets: AssetsFinder,
		language: TLanguage,
		equipment: IEquipReliquary,
	) {
		this.id = equipment.itemId;
		this.name = assets.reliquaries.getName(
			+equipment.flat.nameTextMapHash,
			language,
		);
		this.setName = assets.reliquarySets.getName(
			+equipment.flat.setNameTextMapHash,
			language,
		);
		this.icon = assets.getAssetPath(equipment.flat.icon);
		this.type = reliquaryTypes[equipment.flat.equipType];
		this.level = --equipment.reliquary.level;
		this.rarity = equipment.flat.rankLevel;
		this.mainStats = equipment.flat.reliquaryMainstat;
		this.subStats = equipment.flat.reliquarySubstats;
	}
}
