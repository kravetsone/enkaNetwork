"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playerInfo = void 0;
const nameCard_1 = require("./nameCard");
const profilePicture_1 = require("./profilePicture");
const characterPreview_1 = require("./characterPreview");
class playerInfo {
    constructor(language, data) {
        this.nickname = data.nickname;
        this.signature = data.signature;
        this.level = data.level;
        this.worldLevel = data.worldLevel;
        this.nameCard = new nameCard_1.nameCard(language, data.nameCardId);
        this.achievements = data.finishAchievementNum;
        this.abyssFloor = data.towerFloorIndex;
        this.abyssLevel = data.towerLevelIndex;
        this.charactersPreview = data.showAvatarInfoList.map((character) => {
            return new characterPreview_1.characterPreview(language, character);
        });
        this.nameCardsPreview = data.showNameCardIdList.map((nameCardId) => {
            return new nameCard_1.nameCard(language, nameCardId);
        });
        this.profilePicture = new profilePicture_1.profilePicture(language, data.profilePicture);
    }
}
exports.playerInfo = playerInfo;
