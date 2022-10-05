"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerInfo = void 0;
const index_1 = require("./index");
class PlayerInfo {
    constructor(language, data) {
        this.nickname = data.nickname;
        this.signature = data.signature;
        this.level = data.level;
        this.worldLevel = data.worldLevel;
        this.nameCard = new index_1.NameCard(language, data.nameCardId);
        this.achievements = data.finishAchievementNum;
        this.abyssFloor = data.towerFloorIndex;
        this.abyssLevel = data.towerLevelIndex;
        this.charactersPreview = data.showAvatarInfoList.map((character) => {
            return new index_1.CharacterPreview(language, character);
        });
        this.nameCardsPreview = data.showNameCardIdList.map((nameCardId) => {
            return new index_1.NameCard(language, nameCardId);
        });
        this.profilePicture = new index_1.ProfilePicture(language, data.profilePicture);
    }
}
exports.PlayerInfo = PlayerInfo;
