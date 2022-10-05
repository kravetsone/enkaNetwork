import { Axios } from "axios";
import { FetchUserUID, FetchUserProfile, PlayerInfo } from "./models/index";
import { TLanguage } from "./types";
export class EnkaNetwork {
    language: TLanguage;
    request: Axios;
    constructor(data: { language?: TLanguage }) {
        this.language = data.language || "EN";
        this.request = new Axios({
            baseURL: "https://enka.network",
            headers: {
                Accept: "application/json",
                "User-Agent": "enkaNetwork@1.1.0"
            },
        });
    }

    async fetchUser(uid: number | string, language?: TLanguage) {
        return this.request.get(`/u/${uid}/__data.json`).then((response) => JSON.parse(response.data)).then(data => data.profile ? new FetchUserProfile(language || this.language, data) : new FetchUserUID(language || this.language, data));
    }
    async fetchAccounts(tag: string, language?: TLanguage) {
        return this.request.get(`/api/profile/${tag}/hoyos/`).then((response) => JSON.parse(response.data)).then(data => data.map((account: any) => { return { is_uid_public: account.is_uid_public, player: new PlayerInfo(language || this.language, account.player_info) }; }));
    }
}