import { IPlayerInfo, IProfilePicture, IShowAvatarInfoList } from "../types/index";
import { nameCard } from "./nameCard";
import { profilePicture } from "./profilePicture";
import { characterPreview } from "./characterPreview";
export class playerInfo {
    nickname: string
    signature: string;
    level: number;
    worldLevel: number;
    nameCard: nameCard;
    achievements: number;
    abyssFloor: number;
    abyssLevel: number;
    charactersPreview: characterPreview[];
    nameCardsPreview: nameCard[];
    profilePicture: profilePicture;
    constructor(language: string, data: IPlayerInfo) {
        this.nickname = data.nickname;
        this.signature = data.signature;
        this.level = data.level;
        this.worldLevel = data.worldLevel;
        this.nameCard = new nameCard(language, data.nameCardId);
        this.achievements = data.finishAchievementNum;
        this.abyssFloor = data.towerFloorIndex;
        this.abyssLevel = data.towerLevelIndex;
        this.charactersPreview = data.showAvatarInfoList.map((character: { avatarId: number, level: number }) => {
            return new characterPreview(language, character);
        });
        this.nameCardsPreview = data.showNameCardIdList.map((nameCardId) => {
            return new nameCard(language, nameCardId);
        });
        this.profilePicture = new profilePicture(language, data.profilePicture);
    }

}