"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playerInfo = void 0;
const nameCard_1 = require("./nameCard");
class playerInfo {
    constructor(language, data) {
        this.nickname = data.nickname;
        this.signature = data.signature;
        this.level = data.level;
        this.worldLevel = data.worldLevel;
        this.nameCard = new nameCard_1.nameCard(language, data.nameCardId);
        this.finishAchievementNum = data.finishAchievementNum;
        this.towerFloorIndex = data.towerFloorIndex;
        this.towerLevelIndex = data.towerLevelIndex;
        this.showAvatarInfoList = data.showAvatarInfoList;
        this.showNameCardIdList = data.showNameCardIdList;
        this.profilePicture = data.profilePicture;
    }
}
exports.playerInfo = playerInfo;
