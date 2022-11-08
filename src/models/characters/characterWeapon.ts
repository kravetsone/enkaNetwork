import { getAssetUrl } from "../../helpers/getAssetUrl";
import { charactersWeaponLocalizations } from "../../helpers/getJsonAssets";

export class CharacterWeapon {
    id: number;
    level: number;
    elevations: number;
    improvement: number;
    rarity: number;
    mainStat: { appendPropId: string; statValue: number };
    subStat?: { appendPropId: string; statValue: number };
    icon?: string;
    name: string;
    constructor(lang: string, equipment: any) {
        this.id = equipment.itemId;
        this.name =
            charactersWeaponLocalizations[equipment.flat.nameTextMapHash][lang];
        this.icon = getAssetUrl(equipment.flat.icon);
        this.level = equipment.weapon.level;
        this.elevations = equipment.weapon.promoteLevel || 0;
        this.improvement = equipment.weapon.affixMap
            ? equipment.weapon.affixMap[
                  Object.keys(equipment.weapon.affixMap)[0]
              ] + 1
            : 1;
        this.rarity = equipment.flat.rankLevel;
        this.mainStat = equipment.flat.weaponStats[0];
        this.subStat = equipment.flat.weaponStats[1] || false;
    }
}
