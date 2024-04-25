import type { AssetsFinder } from "../../helpers";
import type { TLanguage } from "../../types";

export class Namecard {
	// Namecard id
	id: number;
	// Namecard name in the selected language
	name: string;
	// Namecard icon
	icon?: string;
	// Namecard banner
	banner?: string;
	// Namecard navbar
	navbar?: string | null;

	constructor(assets: AssetsFinder, language: TLanguage, namecardId: number) {
		const nameCardAsset = assets.namecards.getById(namecardId);

		this.id = namecardId;
		this.name = assets.namecards.getName(nameCardAsset, language);
		this.icon = assets.getAssetPath(nameCardAsset.icon);
		this.banner = assets.getAssetPath(nameCardAsset.banner);
		this.navbar = nameCardAsset.navbar
			? assets.getAssetPath(nameCardAsset.navbar)
			: null;
	}
}
