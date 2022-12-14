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
    isBoosted: boolean;
    constructor(
        lang: string,
        skill: number,
        level: number,
        proudSkillExtraLevelMap: string[]
    ) {
        const charactersSkillsAsset = charactersSkillsAssets[skill];
        const charactersSkillsLocalization =
            charactersSkillsLocalizations[
                charactersSkillsAsset.nameTextMapHash
            ];
        this.id = skill;
        this.icon = getAssetUrl(charactersSkillsAsset.skillIcon);
        this.name = charactersSkillsLocalization[lang];
        this.isBoosted =
            typeof charactersSkillsAsset.proudSkillGroupId == "number"
                ? !!proudSkillExtraLevelMap.includes(
                      String(charactersSkillsAsset.proudSkillGroupId)
                  )
                : false;
        this.level = this.isBoosted ? level + 3 : level;
    }
}
