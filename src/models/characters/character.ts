import { getAssetUrl } from "../../helpers/getAssetUrl";
import { getNormalElement } from "../../helpers/getNormalElement";
import {
    charactersAssets,
    charactersLocalizations,
} from "../../helpers/getJsonAssets";
import {
    CharacterConstellation,
    CharacterReluquary,
    CharacterWeapon,
} from "../index";
import { CharacterSkill } from "./characterSkill";
import { CharacterStats } from "./characterStats";

export class Character {
    id: number;
    name: string;
    icons: { avatar?: string; side?: string };
    level: number;
    friendshipLevel: number;
    rarity: number;
    element: string;
    elevations: number;
    xp: number;
    stats: CharacterStats;
    constellation: CharacterConstellation[];
    skills: CharacterSkill[];
    skillSetId: number;
    skillData: number[];
    weapon: CharacterWeapon;
    reluquary: CharacterReluquary[];
    constructor(lang: string, character: any) {
        const characterAsset: any =
            character.avatarId !== 10000007 && character.avatarId !== 10000005
                ? charactersAssets[character.avatarId]
                : Object.keys(charactersAssets)
                      .map((x) => {
                          if (
                              charactersAssets[x].skills.includes(
                                  +Object.keys(character.skillLevelMap)[0]
                              )
                          )
                              return charactersAssets[x];
                      })
                      .find(
                          (x) =>
                              x?.iconName ==
                              (character.avatarId == 10000007
                                  ? "UI_AvatarIcon_PlayerGirl"
                                  : "UI_AvatarIcon_PlayerBoy")
                      ); //This is a temporary solution that first came to mind please don't hit.
        const characterLocalization =
            charactersLocalizations[characterAsset.nameTextMapHash];
        this.id = character.avatarId;
        this.name = characterLocalization[lang];
        this.rarity = characterAsset.qualityType == "QUALITY_ORANGE" ? 5 : 4;
        this.element = getNormalElement(characterAsset.costElemType);
        this.icons = {
            avatar: getAssetUrl(characterAsset.iconName),
            side: getAssetUrl(characterAsset.sideIconName),
        };
        this.weapon = new CharacterWeapon(
            lang,
            character.equipList.filter((x: { weapon: any }) => x.weapon)[0]
        );
        this.reluquary = character.equipList
            .filter((x: { reliquary: any }) => x.reliquary)
            .map((reliquary: any) => new CharacterReluquary(lang, reliquary));
        this.stats = new CharacterStats(character.fightPropMap);
        this.constellation = (characterAsset?.talents || []).map(
            (talent: any) =>
                new CharacterConstellation(
                    lang,
                    talent,
                    character?.talentIdList || []
                )
        );
        this.skills = (characterAsset?.skills || []).map(
            (skill: any) =>
                new CharacterSkill(
                    lang,
                    skill,
                    character?.skillLevelMap[skill] || 0
                )
        );
        this.skillSetId = character.skillDepotId;
        this.skillData = character.inherentProudSkillList;
        this.level = Number(character.propMap["4001"]?.ival || 0);
        this.elevations = Number(character.propMap["1002"]?.ival || 0);
        this.xp = Number(character.propMap["1001"]?.ival || 0);
        this.friendshipLevel = character.fetterInfo.expLevel;
    }
}
