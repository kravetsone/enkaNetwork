import { IPlayerInfo, IProfilePicture, IShowAvatarInfoList } from "../types/index";
import { nameCard } from "./nameCard";
import { profilePicture } from "./profilePicture";
import { characterPreview } from "./characterPreview";
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
    charactersPreview: characterPreview[];
    nameCardsPreview: nameCard[];
    showNameCardIdList!: number[];
    profilePicture: profilePicture;
    constructor(language: string, data: IPlayerInfo) {
        this.nickname = data.nickname;
        this.signature = data.signature;
        this.level = data.level;
        this.worldLevel = data.worldLevel;
        this.nameCard = new nameCard(language, data.nameCardId);
        this.finishAchievementNum = data.finishAchievementNum;
        this.towerFloorIndex = data.towerFloorIndex;
        this.towerLevelIndex = data.towerLevelIndex;
        this.charactersPreview = data.showAvatarInfoList.map((character: { avatarId: number, level: number }) => {
            return new characterPreview(language, character);
        });
        this.nameCardsPreview = data.showNameCardIdList.map((nameCardId) => {
            return new nameCard(language, nameCardId);
        });
        this.profilePicture = new profilePicture(language, data.profilePicture);
    }

}