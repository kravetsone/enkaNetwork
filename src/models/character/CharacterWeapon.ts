import type { AssetsFinder } from "../../helpers";
import type { IEquipListWeapon, TLanguage } from "../../types";

export class CharacterWeapon {
	id: number;
	level: number;
	elevations: number;
	improvement: number;
	rarity: number;
	mainStat: { appendPropId: string; statValue: number };
	subStat?: { appendPropId: string; statValue: number };
	icon: string;
	// The "awakened"/ascended art (`{icon}_Awaken`). Exposed so renderers don't have
	// to string-derive it — and so it is cacheable by the FileSystemAdapter.
	awakenIcon: string;
	name: string;

	constructor(
		assets: AssetsFinder,
		language: TLanguage,
		equipment: IEquipListWeapon,
	) {
		this.id = equipment.itemId;
		this.name = assets.weapons.getName(
			+equipment.flat.nameTextMapHash,
			language,
		);
		this.icon = assets.getAssetPath(equipment.flat.icon);
		this.awakenIcon = assets.getAssetPath(`${equipment.flat.icon}_Awaken`);
		this.level = equipment.weapon.level;
		this.elevations = equipment.weapon.promoteLevel || 0;
		this.improvement = equipment.weapon.affixMap
			? equipment.weapon.affixMap[Object.keys(equipment.weapon.affixMap)[0]] + 1
			: 1;
		this.rarity = equipment.flat.rankLevel;
		this.mainStat = equipment.flat.weaponStats[0];
		this.subStat = equipment.flat.weaponStats[1] || null;
	}
}
