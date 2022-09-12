import { nameCard } from "../models/nameCard";

export interface IPlayerInfo {
    nickname: string;
    level: number;
    signature: string;
    worldLevel: number;
    nameCardId: number;
    nameCard: nameCard;
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