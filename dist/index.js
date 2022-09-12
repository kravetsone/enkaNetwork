"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enkaNetwork = void 0;
const axios_1 = require("axios");
const fetchUser_1 = require("./models/fetchUser");
class enkaNetwork {
    constructor(data) {
        this.language = data.language || "EN";
        this.request = new axios_1.Axios({
            baseURL: "https://enka.network",
            headers: {
                Accept: "application/json",
            },
        });
    }
    async fetchUser(uid) {
        return this.request.get(`/u/${uid}/__data.json`).then(response => new fetchUser_1.fetchUser(this.language, JSON.parse(response.data)));
    }
}
exports.enkaNetwork = enkaNetwork;
