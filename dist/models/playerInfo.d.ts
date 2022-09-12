import { IPlayerInfo, IProfilePicture, IShowAvatarInfoList } from "../types/index";
import { nameCard } from "./nameCard";
export declare class playerInfo {
    nickname: string;
    signature: string;
    level: number;
    worldLevel: number;
    nameCardId: number;
    nameCard: nameCard;
    finishAchievementNum: number;
    towerFloorIndex: number;
    towerLevelIndex: number;
    showAvatarInfoList: IShowAvatarInfoList[];
    showNameCardIdList: number[];
    profilePicture: IProfilePicture;
    constructor(language: string, data: IPlayerInfo);
}
