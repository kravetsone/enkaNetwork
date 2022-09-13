import { IPlayerInfo } from "../types/index";
import { nameCard } from "./nameCard";
import { profilePicture } from "./profilePicture";
import { characterPreview } from "./characterPreview";
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
    charactersPreview: characterPreview[];
    nameCardsPreview: nameCard[];
    showNameCardIdList: number[];
    profilePicture: profilePicture;
    constructor(language: string, data: IPlayerInfo);
}
