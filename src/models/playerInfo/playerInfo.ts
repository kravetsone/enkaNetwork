import { IPlayerInfo } from "../../types/index";
import { NameCard, ProfilePicture, CharacterPreview } from "../index";

export class PlayerInfo {
    nickname: string;
    signature?: string;
    level: number;
    worldLevel?: number;
    nameCard: NameCard;
    achievements?: number;
    abyssFloor?: number;
    abyssLevel?: number;
    charactersPreview: CharacterPreview[];
    nameCardsPreview: NameCard[];
    profilePicture?: ProfilePicture;
    constructor(language: string, data: IPlayerInfo) {
        this.nickname = data.nickname;
        this.signature = data.signature;
        this.level = data.level;
        this.worldLevel = data.worldLevel;
        this.nameCard = new NameCard(language, data.nameCardId);
        this.achievements = data.finishAchievementNum;
        this.abyssFloor = data.towerFloorIndex;
        this.abyssLevel = data.towerLevelIndex;
        this.charactersPreview = (data.showAvatarInfoList || []).map(
            (character: { avatarId: number; level: number }) => {
                return new CharacterPreview(language, character) ?? undefined;
            }
        );
        this.nameCardsPreview = (data.showNameCardIdList || []).map(
            (nameCardId) => {
                return new NameCard(language, nameCardId) ?? undefined;
            }
        );
        this.profilePicture = data.profilePicture.avatarId ? new ProfilePicture(language, data.profilePicture) : undefined;
    }
}
