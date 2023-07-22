export interface ICharacterExcelData {
    useType: string;
    bodyType: string;
    scriptDataPathHash: number;
    iconName: string;
    sideIconName: string;
    qualityType: "QUALITY_ORANGE" | "QUALITY_PURPLE";
    chargeEfficiency: number;
    LBODGAEPDMJ: number;
    initialWeapon: number;
    weaponType: string;
    NIPILHLOMDG: number;
    imageName: string;
    gachaCardNameHash: number;
    manekinPathHash: number;
    cutsceneShow: string;
    skillDepotId: number;
    staminaRecoverSpeed: number;
    candSkillDepotIds: number[];
    manekinJsonConfigHash: number;
    manekinMotionConfig: number;
    descTextMapHash: number;
    avatarIdentityType: string;
    avatarPromoteId: number;
    avatarPromoteRewardLevelList: number[];
    avatarPromoteRewardIdList: number[];
    featureTagGroupID: number;
    infoDescTextMapHash: number;
    hpBase: number;
    attackBase: number;
    defenseBase: number;
    critical: number;
    criticalHurt: number;
    propGrowCurves: IPropGrowCurve[];
    BCAGNCKHFOF: number;
    prefabPathHash: number;
    id: number;
    nameTextMapHash: number;
    NOLCALJMBOB: number;
    prefabPathRemoteHash: number;
    controllerPathHash: number;
    controllerPathRemoteHash: number;
    LODPatternName: string;
}

export interface IPropGrowCurve {
    type: string;
    growCurve: string;
}

export interface ISkillsetExcelData {
    id: number;
    energySkill: number;
    skills: number[];
    subSkills: number[];
    extraAbilities: string[];
    talents: number[];
    talentStarName: string;
    inherentProudSkillOpens: unknown[];
    skillDepotAbilityGroup: string;
}

export interface ISkillExcelData {
    id: number;
    nameTextMapHash: number;
    abilityName: string;
    descTextMapHash: number;
    skillIcon: string;
    cdTime: number;
    costElemType:
        | "Ice"
        | "Water"
        | "Wind"
        | "Fire"
        | "Rock"
        | "Electric"
        | "Grass";
    costElemVal: number;
    maxChargeNum: number;
    triggerID: number;
    lockShape: string;
    lockWeightParams: number[];
    isAttackCameraLock: boolean;
    buffIcon: string;
    proudSkillGroupId: number;
    globalValueKey: string;
}

export interface IConstellationExcelData {
    talentId: number;
    nameTextMapHash: number;
    descTextMapHash: number;
    icon: string;
    mainCostItemId: number;
    mainCostItemCount: number;
    openConfig: string;
    addProps: unknown[];
    paramList: number[];
}

export interface ICostumeExcelData {
    KKGNHHIFAMD: number;
    BOKNDNFKIGE: number;
    nameTextMapHash: number;
    descTextMapHash: number;
    itemId: number;
    PIJICPMEBIP: number;
    jsonName: string;
    JGPBEIOHAPP: number;
    JBEMKLEMLOB: number;
    IEHAIEJOHKJ: number;
    PGCDEBDODIB: number;
    NMGBGGFJBIA: number;
    NGEMPNOFHLJ: string;
    sideIconName: string;
    CEABIFHHIKH: number;
}

export interface INamecardExcelData {
    interactionTitleTextMapHash: number;
    materialType: string;
    stackLimit: number;
    maxUseCount: number;
    useOnGain: boolean;
    noFirstGetHint: boolean;
    itemUse: unknown[];
    rankLevel: number;
    effectDescTextMapHash: number;
    specialDescTextMapHash: number;
    typeDescTextMapHash: number;
    effectIcon: string;
    effectName: string;
    picPath: string[];
    satiationParams: unknown[];
    destroyReturnMaterial: unknown[];
    destroyReturnMaterialCount: unknown[];
    isForceGetHint: boolean;
    id: number;
    nameTextMapHash: number;
    descTextMapHash: number;
    icon: string;
    itemType: string;
}

export interface IReliquaryAffixExcelData {
    affixId: number;
    id: number;
    level: number;
    nameTextMapHash: number;
    descTextMapHash: number;
    openConfig: string;
    addProps: unknown[];
    paramList: number[];
}

export interface IReliquarySetExcelData {
    setId: number;
    setIcon: string;
    setNeedNum: number[];
    EquipAffixId: number;
    containsList: number[];
    PJBFOFFGFJD: number;
    JNBEOBPDNND: unknown[];
    textList: number[];
}

export interface INameTextMapHash {
    nameTextMapHash: number;
}
