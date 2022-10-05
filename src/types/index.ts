import { NameCard } from "../models/index";

export interface IPlayerInfo {
    nickname: string;
    level: number;
    signature: string;
    worldLevel: number;
    nameCardId: number;
    nameCard: NameCard;
    finishAchievementNum: number;
    towerFloorIndex: number;
    towerLevelIndex: number;
    showAvatarInfoList: IShowAvatarInfoList[];
    showNameCardIdList: number[];
    profilePicture: IProfilePicture;
}
export interface IShowAvatarInfoList {
    avatarId: number;
    level: number;
}
export interface IProfilePicture {
    avatarId: number;
}
export interface ILocalizations {
    [key: string]: {
        [key: string]: string
    }
}
export interface INameCardAssets {
    [key: string]: INameCardAsset
}
export interface INameCardAsset {
    nameTextMapHash: number
    icon: string
    picPath: string[]
    rankLevel: number
    materialType: string
}
export interface ICharacterAssets {
    [key: string]: ICharacterAsset
}
export interface ICharacterAsset {
    nameTextMapHash: number;
    iconName: string;
    sideIconName: string;
    qualityType: string;
    costElemType: string;
    skills: number[];
    talents: number[];
}
export interface ICharacterConstellationAssets {
    [key: string]: ICharacterConstellationAsset
}
export interface ICharacterConstellationAsset {
    nameTextMapHash: number;
    icon: string;
}
export interface ICharacterSkillAssets {
    [key: string]: ICharacterSkillAsset
}
export interface ICharacterSkillAsset {
    nameTextMapHash: number;
    skillIcon: string;
}
export type TLanguage = "CHS" | "CHT" | "DE" | "EN" | "ES" | "FR" | "ID" | "JP" | "KR" | "PT" | "RU" | "TH" | "VI"