import { getAssetUrl } from "../../helpers/getAssetUrl";
import {
    charactersSkillsAssets,
    charactersSkillsLocalizations,
} from "../../helpers/getJsonAssets";

export class CharacterSkill {
    id: number;
    icon?: string;
    name: string;
    level: number;
    constructor(lang: string, skill: number, level: number) {
        const charactersSkillsAsset = charactersSkillsAssets[skill];
        const charactersSkillsLocalization =
            charactersSkillsLocalizations[
                charactersSkillsAsset.nameTextMapHash
            ];
        this.id = skill;
        this.icon = getAssetUrl(charactersSkillsAsset.skillIcon);
        this.name = charactersSkillsLocalization[lang];
        this.level = level;
    }
}
