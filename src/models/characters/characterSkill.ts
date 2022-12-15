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
        proudSkillExtraLevelMap: Record<string, number>
    ) {
        const charactersSkillsAsset = charactersSkillsAssets[skill];
        const charactersSkillsLocalization =
            charactersSkillsLocalizations[
                charactersSkillsAsset.nameTextMapHash
            ];
        const boost =
            typeof charactersSkillsAsset.proudSkillGroupId == "number"
                ? Object.keys(proudSkillExtraLevelMap).find(
                      (x) =>
                          x == String(charactersSkillsAsset.proudSkillGroupId)
                  )
                : false;
        this.id = skill;
        this.icon = getAssetUrl(charactersSkillsAsset.skillIcon);
        this.name = charactersSkillsLocalization[lang];
        this.isBoosted = !!boost;
        this.level = level + (boost ? +proudSkillExtraLevelMap[boost] : 0); //my code has gotten worse lately...
    }
}
