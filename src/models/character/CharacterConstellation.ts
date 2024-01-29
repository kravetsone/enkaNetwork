import { AssetsFinder } from "../../helpers";
import { TLanguage } from "../../types";

export class CharacterConstellation {
	id: number;
	icon: string;
	name: string;
	unlocked: boolean;

	constructor(
		assets: AssetsFinder,
		language: TLanguage,
		talent: number,
		talents: number[],
	) {
		const constellation = assets.constellations.getById(talent);

		this.id = talent;
		this.icon = assets.getAssetPath(constellation.icon);
		this.name = assets.constellations.getName(constellation, language);
		this.unlocked = talents.includes(talent);
	}
}
