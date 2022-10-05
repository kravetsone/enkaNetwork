export declare class Character {
    id: number;
    name: string;
    icons: {
        avatar: string;
        side: string;
    };
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
    constructor(lang: string, character: any);
}
export declare class CharacterReluquary {
    id: number;
    level: number;
    rarity: number;
    mainStats: {
        appendPropId: string;
        statValue: number;
    };
    subStats: {
        appendPropId: string;
        statValue: number;
    }[];
    icon: string;
    name: string;
    type: string;
    setName: string;
    constructor(lang: string, equipment: any);
}
export declare class CharacterWeapon {
    id: number;
    level: number;
    elevations: number;
    improvement: number;
    rarity: number;
    mainStat: {
        appendPropId: string;
        statValue: number;
    };
    subStat?: {
        appendPropId: string;
        statValue: number;
    };
    icon: string;
    name: string;
    constructor(lang: string, equipment: any);
}
export declare class CharacterConstellation {
    id: number;
    icon: string;
    name: string;
    unlocked: boolean;
    constructor(lang: string, talent: number, talents: number[]);
}
export declare class CharacterSkill {
    id: number;
    icon: string;
    name: string;
    level: number;
    constructor(lang: string, skill: number, level: number);
}
export declare class CharacterStats {
    BASE_HP: number;
    FIGHT_PROP_HP: number;
    FIGHT_PROP_HP_PERCENT: number;
    FIGHT_PROP_BASE_ATTACK: number;
    FIGHT_PROP_ATTACK: number;
    FIGHT_PROP_ATTACK_PERCENT: number;
    FIGHT_PROP_BASE_DEFENSE: number;
    FIGHT_PROP_DEFENSE: number;
    FIGHT_PROP_DEFENSE_PERCENT: number;
    FIGHT_PROP_BASE_SPEED: number;
    FIGHT_PROP_SPEED_PERCENT: number;
    FIGHT_PROP_HP_MP_PERCENT: number;
    FIGHT_PROP_ATTACK_MP_PERCENT: number;
    FIGHT_PROP_CRITICAL: number;
    FIGHT_PROP_ANTI_CRITICAL: number;
    FIGHT_PROP_CRITICAL_HURT: number;
    FIGHT_PROP_CHARGE_EFFICIENCY: number;
    FIGHT_PROP_ADD_HURT: number;
    FIGHT_PROP_SUB_HURT: number;
    FIGHT_PROP_HEAL_ADD: number;
    FIGHT_PROP_HEALED_ADD: number;
    FIGHT_PROP_ELEMENT_MASTERY: number;
    FIGHT_PROP_PHYSICAL_SUB_HURT: number;
    FIGHT_PROP_PHYSICAL_ADD_HURT: number;
    FIGHT_PROP_DEFENCE_IGNORE_RATIO: number;
    FIGHT_PROP_DEFENCE_IGNORE_DELTA: number;
    FIGHT_PROP_FIRE_ADD_HURT: number;
    FIGHT_PROP_ELEC_ADD_HURT: number;
    FIGHT_PROP_WATER_ADD_HURT: number;
    FIGHT_PROP_GRASS_ADD_HURT: number;
    FIGHT_PROP_WIND_ADD_HURT: number;
    FIGHT_PROP_ROCK_ADD_HURT: number;
    FIGHT_PROP_ICE_ADD_HURT: number;
    FIGHT_PROP_HIT_HEAD_ADD_HURT: number;
    FIGHT_PROP_FIRE_SUB_HURT: number;
    FIGHT_PROP_ELEC_SUB_HURT: number;
    FIGHT_PROP_WATER_SUB_HURT: number;
    FIGHT_PROP_GRASS_SUB_HURT: number;
    FIGHT_PROP_WIND_SUB_HURT: number;
    FIGHT_PROP_ROCK_SUB_HURT: number;
    FIGHT_PROP_ICE_SUB_HURT: number;
    FIGHT_PROP_EFFECT_HIT: number;
    FIGHT_PROP_EFFECT_RESIST: number;
    FIGHT_PROP_FREEZE_RESIST: number;
    FIGHT_PROP_TORPOR_RESIST: number;
    FIGHT_PROP_DIZZY_RESIST: number;
    FIGHT_PROP_FREEZE_SHORTEN: number;
    FIGHT_PROP_TORPOR_SHORTEN: number;
    FIGHT_PROP_DIZZY_SHORTEN: number;
    FIGHT_PROP_MAX_FIRE_ENERGY: number;
    FIGHT_PROP_MAX_ELEC_ENERGY: number;
    FIGHT_PROP_MAX_WATER_ENERGY: number;
    FIGHT_PROP_MAX_GRASS_ENERGY: number;
    FIGHT_PROP_MAX_WIND_ENERGY: number;
    FIGHT_PROP_MAX_ICE_ENERGY: number;
    FIGHT_PROP_MAX_ROCK_ENERGY: number;
    FIGHT_PROP_SKILL_CD_MINUS_RATIO: number;
    FIGHT_PROP_SHIELD_COST_MINUS_RATIO: number;
    FIGHT_PROP_CUR_FIRE_ENERGY: number;
    FIGHT_PROP_CUR_ELEC_ENERGY: number;
    FIGHT_PROP_CUR_WATER_ENERGY: number;
    FIGHT_PROP_CUR_GRASS_ENERGY: number;
    FIGHT_PROP_CUR_WIND_ENERGY: number;
    FIGHT_PROP_CUR_ICE_ENERGY: number;
    FIGHT_PROP_CUR_ROCK_ENERGY: number;
    FIGHT_PROP_CUR_HP: number;
    FIGHT_PROP_MAX_HP: number;
    FIGHT_PROP_CUR_ATTACK: number;
    FIGHT_PROP_CUR_DEFENSE: number;
    FIGHT_PROP_CUR_SPEED: number;
    FIGHT_PROP_NONEXTRA_ATTACK: number;
    FIGHT_PROP_NONEXTRA_DEFENSE: number;
    FIGHT_PROP_NONEXTRA_CRITICAL: number;
    FIGHT_PROP_NONEXTRA_CRITICAL_HURT: number;
    FIGHT_PROP_NONEXTRA_CHARGE_EFFICIENCY: number;
    FIGHT_PROP_NONEXTRA_ELEMENT_MASTERY: number;
    FIGHT_PROP_NONEXTRA_PHYSICAL_SUB_HURT: number;
    FIGHT_PROP_NONEXTRA_FIRE_ADD_HURT: number;
    FIGHT_PROP_NONEXTRA_ELEC_ADD_HURT: number;
    FIGHT_PROP_NONEXTRA_WATER_ADD_HURT: number;
    FIGHT_PROP_NONEXTRA_GRASS_ADD_HURT: number;
    FIGHT_PROP_NONEXTRA_WIND_ADD_HURT: number;
    FIGHT_PROP_NONEXTRA_ROCK_ADD_HURT: number;
    FIGHT_PROP_NONEXTRA_ICE_ADD_HURT: number;
    FIGHT_PROP_NONEXTRA_FIRE_SUB_HURT: number;
    FIGHT_PROP_NONEXTRA_ELEC_SUB_HURT: number;
    FIGHT_PROP_NONEXTRA_WATER_SUB_HURT: number;
    FIGHT_PROP_NONEXTRA_GRASS_SUB_HURT: number;
    FIGHT_PROP_NONEXTRA_WIND_SUB_HURT: number;
    FIGHT_PROP_NONEXTRA_ROCK_SUB_HURT: number;
    FIGHT_PROP_NONEXTRA_ICE_SUB_HURT: number;
    FIGHT_PROP_NONEXTRA_SKILL_CD_MINUS_RATIO: number;
    FIGHT_PROP_NONEXTRA_SHIELD_COST_MINUS_RATIO: number;
    FIGHT_PROP_NONEXTRA_PHYSICAL_ADD_HURT: number;
    constructor(stats: Record<string, number>);
}
