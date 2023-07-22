import fs from "fs/promises";
// @ts-ignore: Json Import
import characters from "../../../assets/data/characters.json";
// @ts-ignore: Json Import
import constellations from "../../../assets/data/constellations.json";
// @ts-ignore: Json Import
import costumes from "../../../assets/data/costumes.json";
// @ts-ignore: Json Import
import namecards from "../../../assets/data/namecards.json";
// @ts-ignore: Json Import
import skills from "../../../assets/data/skills.json";
import {
    ICharacterData,
    IConstellationData,
    ICostumeData,
    INamecardData,
    ISkillData,
} from "../../types";

export class DataManager {
    characters: ICharacterData[];
    constellations: IConstellationData[];
    costumes: ICostumeData[];
    namecards: INamecardData[];
    skills: ISkillData[];

    constructor() {
        this.characters = characters as ICharacterData[];
        this.constellations = constellations as IConstellationData[];
        this.costumes = costumes as ICostumeData[];
        this.namecards = namecards as INamecardData[];
        this.skills = skills as ISkillData[];
    }

    async writeCharacters(data: ICharacterData[]) {
        this.characters = Object.assign(this.characters, data);

        await fs.writeFile(
            "assets/data/characters.json",
            JSON.stringify(data, null, 4),
        );
    }

    async writeConstellations(data: IConstellationData[]) {
        this.constellations = Object.assign(this.constellations, data);

        await fs.writeFile(
            "assets/data/constellations.json",
            JSON.stringify(data, null, 4),
        );
    }

    async writeCostumes(data: ICostumeData[]) {
        this.costumes = Object.assign(this.costumes, data);

        await fs.writeFile(
            "assets/data/costumes.json",
            JSON.stringify(data, null, 4),
        );
    }

    async writeNamecards(data: INamecardData[]) {
        this.namecards = Object.assign(this.namecards, data);

        await fs.writeFile(
            "assets/data/namecards.json",
            JSON.stringify(data, null, 4),
        );
    }

    async writeSkills(data: ISkillData[]) {
        this.skills = Object.assign(this.skills, data);

        await fs.writeFile(
            "assets/data/skills.json",
            JSON.stringify(data, null, 4),
        );
    }
}
