"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUser = void 0;
const playerInfo_1 = require("./playerInfo");
const character_1 = require("./character");
class fetchUser {
    constructor(language, data) {
        this.playerInfo = new playerInfo_1.playerInfo(language, data.playerInfo);
        this.characters = data.avatarInfoList.map(avatar => { return new character_1.character(language, avatar); });
        this.ttl = data.ttl;
    }
}
exports.fetchUser = fetchUser;
