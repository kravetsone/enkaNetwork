"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUser = void 0;
const playerInfo_1 = require("./playerInfo");
class fetchUser {
    constructor(language, data) {
        this.playerInfo = new playerInfo_1.playerInfo(language, data.playerInfo);
        this.avatarInfoList = data.avatarInfoList;
    }
}
exports.fetchUser = fetchUser;
