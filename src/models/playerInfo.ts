import { IPlayerInfo, IProfilePicture, IShowAvatarInfoList } from "../types/index";
import { nameCard } from "./nameCard";
export class playerInfo {
    nickname: string
    signature: string;
    level: number;
    worldLevel: number;
    nameCardId!: number;
    nameCard: nameCard;
    finishAchievementNum: number;
    towerFloorIndex: number;
    towerLevelIndex: number;
    showAvatarInfoList: IShowAvatarInfoList[];
    showNameCardIdList: number[];
    profilePicture: IProfilePicture;
    constructor(language: string, data: IPlayerInfo) {
        this.nickname = data.nickname;
        this.signature = data.signature;
        this.level = data.level;
        this.worldLevel = data.worldLevel;
        this.nameCard = new nameCard(language, data.nameCardId);
        this.finishAchievementNum = data.finishAchievementNum;
        this.towerFloorIndex = data.towerFloorIndex;
        this.towerLevelIndex = data.towerLevelIndex;
        this.showAvatarInfoList = data.showAvatarInfoList;
        this.showNameCardIdList = data.showNameCardIdList;
        this.profilePicture = data.profilePicture;
    }

}