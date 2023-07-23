import { AssetsFinder } from "../../helpers";
import {
    IAvatarInfoList,
    IEquipListWeapon,
    IEquipReliquary,
    TElement,
    TLanguage,
} from "../../types";
import {
    CharacterConstellation,
    CharacterReliquary,
    CharacterSkill,
    CharacterStats,
    CharacterWeapon,
} from "../index";

export class Character {
    id: number;
    name: string;
    icons: { avatar: string; side: string; gacha: string };
    level: number;
    friendshipLevel: number;
    rarity: 5 | 4;
    element: TElement;
    elevations: number;
    xp: number;
    stats: CharacterStats;
    constellations: CharacterConstellation[];
    skills: CharacterSkill[];
    skillSetId: number;
    skillData: number[];
    weapon: CharacterWeapon;
    reliquaries: CharacterReliquary[];
    costumeId: number | null;
    costumeName: string | null;

    constructor(
        assets: AssetsFinder,
        language: TLanguage,
        characterInfo: IAvatarInfoList,
    ) {
        const character = assets.characters.getById(
            characterInfo.avatarId,
            characterInfo.skillDepotId,
        );
        const costume = characterInfo.costumeId
            ? assets.costumes.getById(characterInfo.costumeId)
            : undefined;

        this.id = character.id;
        this.name = assets.characters.getName(character, language);
        this.rarity = character.qualityStars;
        this.element = character.element;
        this.icons = {
            avatar: assets.getAssetPath(
                costume ? costume.iconName : character.iconName,
            ),
            side: assets.getAssetPath(
                costume ? costume.sideIconName : character.sideIconName,
            ),
            gacha: assets.getAssetPath(
                costume ? costume.gachaIcon : character.gachaIcon,
            ),
        };

        this.weapon = new CharacterWeapon(
            assets,
            language,
            characterInfo.equipList.filter(
                (x) => x.weapon,
            )[0] as IEquipListWeapon,
        );
        this.reliquaries = characterInfo.equipList
            .filter((x) => x.reliquary)
            .map(
                (reliquary) =>
                    new CharacterReliquary(
                        assets,
                        language,
                        reliquary as IEquipReliquary,
                    ),
            );

        this.stats = new CharacterStats(characterInfo.fightPropMap);
        this.constellations = character.talents.map(
            (talent) =>
                new CharacterConstellation(
                    assets,
                    language,
                    talent,
                    characterInfo.talentIdList || [],
                ),
        );
        console.log(character.skills);
        this.skills = character.skills.map(
            (skill) =>
                new CharacterSkill(
                    assets,
                    language,
                    skill,
                    characterInfo.skillLevelMap[skill] || 0,
                    characterInfo.proudSkillExtraLevelMap ?? {},
                ),
        );

        this.skillSetId = character.skillDepotId;
        this.skillData = characterInfo.inherentProudSkillList;
        this.level = Number(characterInfo.propMap["4001"].ival || 0);
        this.elevations = Number(characterInfo.propMap["1002"].ival || 0);
        this.xp = Number(characterInfo.propMap["1001"].ival || 0);
        this.friendshipLevel = characterInfo.fetterInfo.expLevel;
        this.costumeId = costume ? costume.id : null;
        this.costumeName = costume
            ? assets.costumes.getName(costume, language)
            : null;
    }
}
