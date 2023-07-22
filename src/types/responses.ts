export interface IProfileInfo {
    playerInfo: IPlayerInfo;
    ttl: number;
    uid: string;
}

export interface IProfileAvatarsInfo {
    playerInfo: IPlayerInfo;
    avatarInfoList?: IAvatarInfoList[];
    ttl: number;
    uid: string;
}

export interface IPlayerInfo {
    nickname: string;
    level: number;
    signature?: string;
    worldLevel?: number;
    nameCardId: number;
    finishAchievementNum?: number;
    towerFloorIndex?: number;
    towerLevelIndex?: number;
    showAvatarInfoList?: IShowAvatarInfoList[];
    showNameCardIdList?: number[];
    profilePicture: IProfilePicture;
}

export interface IProfilePicture {
    avatarId: number;
}

export interface IShowAvatarInfoList {
    avatarId: number;
    level: number;
    costumeId?: number;
}

export interface IAvatarInfoList {
    avatarId: number;
    propMap: Record<string, IPropMap>;
    fightPropMap: Record<string, number>;
    skillDepotId: number;
    inherentProudSkillList: number[];
    skillLevelMap: Record<string, number>;
    equipList: IEquipList[];
    fetterInfo: IFetterInfo;
    talentIdList?: number[];
    proudSkillExtraLevelMap?: Record<string, number>;
    costumeId?: number;
}

export interface IEquipList {
    itemId: number;
    reliquary?: IReliquary;
    flat: IFlat;
    weapon?: IWeapon;
}
export interface IEquipListWeapon {
    itemId: number;
    flat: IFlatWeapon;
    weapon: IWeapon;
}
export interface IEquipReliquary {
    itemId: number;
    reliquary: IReliquary;
    flat: IFlatReliquary;
}
export interface IFlat {
    nameTextMapHash: string;
    setNameTextMapHash?: string;
    rankLevel: number;
    reliquaryMainstat?: IReliquaryMainstat;
    reliquarySubstats?: IStat[];
    itemType: ItemType;
    icon: string;
    equipType?: EquipType;
    weaponStats?: IStat[];
}
export interface IFlatWeapon {
    nameTextMapHash: string;
    setNameTextMapHash?: string;
    rankLevel: number;
    reliquaryMainstat?: IReliquaryMainstat;
    reliquarySubstats?: IStat[];
    itemType: ItemType;
    icon: string;
    equipType?: EquipType;
    weaponStats: IStat[];
}
export interface IFlatReliquary {
    nameTextMapHash: string;
    setNameTextMapHash: string;
    rankLevel: number;
    reliquaryMainstat: IReliquaryMainstat;
    reliquarySubstats: IStat[];
    itemType: ItemType;
    icon: string;
    equipType: EquipType;
    weaponStats?: IStat[];
}
export enum EquipType {
    EquipBracer = "EQUIP_BRACER",
    EquipDress = "EQUIP_DRESS",
    EquipNecklace = "EQUIP_NECKLACE",
    EquipRing = "EQUIP_RING",
    EquipShoes = "EQUIP_SHOES",
}

export enum ItemType {
    ItemReliquary = "ITEM_RELIQUARY",
    ItemWeapon = "ITEM_WEAPON",
}

export interface IReliquaryMainstat {
    mainPropId: string;
    statValue: number;
}

export interface IStat {
    appendPropId: AppendPropID;
    statValue: number;
}

export enum AppendPropID {
    FightPropAttack = "FIGHT_PROP_ATTACK",
    FightPropAttackPercent = "FIGHT_PROP_ATTACK_PERCENT",
    FightPropBaseAttack = "FIGHT_PROP_BASE_ATTACK",
    FightPropChargeEfficiency = "FIGHT_PROP_CHARGE_EFFICIENCY",
    FightPropCritical = "FIGHT_PROP_CRITICAL",
    FightPropCriticalHurt = "FIGHT_PROP_CRITICAL_HURT",
    FightPropDefense = "FIGHT_PROP_DEFENSE",
    FightPropDefensePercent = "FIGHT_PROP_DEFENSE_PERCENT",
    FightPropElementMastery = "FIGHT_PROP_ELEMENT_MASTERY",
    FightPropHP = "FIGHT_PROP_HP",
    FightPropHPPercent = "FIGHT_PROP_HP_PERCENT",
    FightPropPhysicalAddHurt = "FIGHT_PROP_PHYSICAL_ADD_HURT",
}

export interface IReliquary {
    level: number;
    mainPropId: number;
    appendPropIdList: number[];
}

export interface IWeapon {
    level: number;
    promoteLevel?: number;
    affixMap?: { [key: string]: number };
}

export interface IFetterInfo {
    expLevel: number;
}

export interface IPropMap {
    type: number;
    ival: string;
    val?: string;
}

export interface IEnkaProfileData {
    username: string;
    profile: IProfile;
}

export interface IProfile {
    bio: string;
    level: number;
    signup_state: number;
    avatar: string;
    image_url: string;
}

export interface IEnkaAccountsData {
    [key: string]: IEnkaAccount;
}

export interface IEnkaAccount {
    uid_public: boolean;
    public: boolean;
    verified: boolean;
    player_info: IPlayerInfo;
    hash: string;
    region: string;
    order: number;
    avatar_order: { [key: string]: number };
    hoyo_type: number;
}

export interface IEnkaAccountBuildData {
    id: number;
    name: string;
    avatar_id: string;
    avatar_data: IAvatarInfoList;
    order: number;
    live: boolean;
    settings: unknown;
    public: boolean;
    image: string | null;
    hoyo_type: number;
}
