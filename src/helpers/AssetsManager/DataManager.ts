import fs from "node:fs/promises";
import path from "node:path";
// @ts-ignore: Json Import
import characters from "../../../assets/data/characters.json";
// @ts-ignore: Json Import
import constellations from "../../../assets/data/constellations.json";
// @ts-ignore: Json Import
import costumes from "../../../assets/data/costumes.json";
// @ts-ignore: Json Import
import namecards from "../../../assets/data/namecards.json";
// @ts-ignore: Json Import
import profilePictures from "../../../assets/data/profilePictures.json";
// @ts-ignore: Json Import
import skills from "../../../assets/data/skills.json";
import type {
	ICharacterData,
	IConstellationData,
	ICostumeData,
	INamecardData,
	IProfilePictureData,
	ISkillData,
} from "../../types";
import { ASSETS_PATH } from "./constants";

export class DataManager {
	characters: ICharacterData[];
	constellations: IConstellationData[];
	costumes: ICostumeData[];
	namecards: INamecardData[];
	skills: ISkillData[];
	profilePictures: IProfilePictureData[];

	constructor() {
		this.characters = characters as ICharacterData[];
		this.constellations = constellations as IConstellationData[];
		this.costumes = costumes as ICostumeData[];
		this.namecards = namecards as INamecardData[];
		this.skills = skills as ISkillData[];
		this.profilePictures = profilePictures as IProfilePictureData[];
	}

	async writeCharacters(data: ICharacterData[]) {
		// Replace contents in place (keeps the array reference the finders hold) and
		// fully mirrors what is written to disk, even if the upstream list shrinks.
		this.characters.splice(0, this.characters.length, ...data);

		await fs.writeFile(
			path.resolve(ASSETS_PATH, "data", "characters.json"),
			JSON.stringify(data, null, 4),
		);
	}

	async writeConstellations(data: IConstellationData[]) {
		this.constellations.splice(0, this.constellations.length, ...data);

		await fs.writeFile(
			path.resolve(ASSETS_PATH, "data", "constellations.json"),
			JSON.stringify(data, null, 4),
		);
	}

	async writeCostumes(data: ICostumeData[]) {
		this.costumes.splice(0, this.costumes.length, ...data);

		await fs.writeFile(
			path.resolve(ASSETS_PATH, "data", "costumes.json"),
			JSON.stringify(data, null, 4),
		);
	}

	async writeNamecards(data: INamecardData[]) {
		this.namecards.splice(0, this.namecards.length, ...data);

		await fs.writeFile(
			path.resolve(ASSETS_PATH, "data", "namecards.json"),
			JSON.stringify(data, null, 4),
		);
	}

	async writeSkills(data: ISkillData[]) {
		this.skills.splice(0, this.skills.length, ...data);

		await fs.writeFile(
			path.resolve(ASSETS_PATH, "data", "skills.json"),
			JSON.stringify(data, null, 4),
		);
	}

	async writeProfilePictures(data: IProfilePictureData[]) {
		this.profilePictures.splice(0, this.profilePictures.length, ...data);

		await fs.writeFile(
			path.resolve(ASSETS_PATH, "data", "profilePictures.json"),
			JSON.stringify(data, null, 4),
		);
	}
}
