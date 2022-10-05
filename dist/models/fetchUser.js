"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchUser = void 0;
const index_1 = require("./index");
class FetchUser {
    constructor(language, data) {
        this.player = new index_1.PlayerInfo(language, data.playerInfo);
        this.characters = data.avatarInfoList.map(avatar => { return new index_1.Character(language, avatar); });
        this.ttl = data.ttl;
    }
}
exports.FetchUser = FetchUser;
