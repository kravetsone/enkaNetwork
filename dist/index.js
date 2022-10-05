"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnkaNetwork = void 0;
const axios_1 = require("axios");
const index_1 = require("./models/index");
class EnkaNetwork {
    constructor(data) {
        this.language = data.language || "EN";
        this.request = new axios_1.Axios({
            baseURL: "https://enka.network",
            headers: {
                Accept: "application/json",
                "User-Agent": "enkaNetwork@1.1.0"
            },
        });
    }
    async fetchUser(uid, language) {
        return this.request.get(`/u/${uid}/__data.json`).then((response) => JSON.parse(response.data)).then(data => data.profile ? new index_1.FetchUserProfile(language || this.language, data) : new index_1.FetchUserUID(language || this.language, data));
    }
    async fetchAccounts(tag, language) {
        return this.request.get(`/api/profile/${tag}/hoyos/`).then((response) => JSON.parse(response.data)).then(data => data.map((account) => { return { is_uid_public: account.is_uid_public, player: new index_1.PlayerInfo(language || this.language, account.player_info) }; }));
    }
}
exports.EnkaNetwork = EnkaNetwork;
