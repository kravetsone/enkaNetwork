import path from "path";
import fs from "fs/promises";
// @ts-ignore: Json Import
import characters from "../../../assets/localization/characters.json";
// @ts-ignore: Json Import
import constellations from "../../../assets/localization/constellations.json";
// @ts-ignore: Json Import
import costumes from "../../../assets/localization/costumes.json";
// @ts-ignore: Json Import
import namecards from "../../../assets/localization/namecards.json";
// @ts-ignore: Json Import
import reliquary from "../../../assets/localization/reliquary.json";
// @ts-ignore: Json Import
import reliquarySets from "../../../assets/localization/reliquarySets.json";
// @ts-ignore: Json Import
import skills from "../../../assets/localization/skills.json";
// @ts-ignore: Json Import
import weapons from "../../../assets/localization/weapons.json";
import { TAssetsList, TLocalizationData } from "../../types";
import { ASSETS_PATH } from "./constants";

export class LocalizationManager {
	characters: TLocalizationData;
	costumes: TLocalizationData;
	constellations: TLocalizationData;
	namecards: TLocalizationData;
	reliquary: TLocalizationData;
	reliquarySets: TLocalizationData;
	skills: TLocalizationData;
	weapons: TLocalizationData;

	constructor() {
		this.characters = characters as TLocalizationData;
		this.costumes = costumes as TLocalizationData;
		this.constellations = constellations as TLocalizationData;
		this.namecards = namecards as TLocalizationData;
		this.reliquary = reliquary as TLocalizationData;
		this.reliquarySets = reliquarySets as TLocalizationData;
		this.skills = skills as TLocalizationData;
		this.weapons = weapons as TLocalizationData;
	}

	async write(assetType: TAssetsList, localization: TLocalizationData) {
		this[assetType] = Object.assign(this[assetType], localization);

		await fs.writeFile(
			path.resolve(ASSETS_PATH, "localization", `${assetType}.json`),
			JSON.stringify(localization, null, 4),
		);
	}
}
