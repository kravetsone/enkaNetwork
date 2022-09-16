import { Axios } from "axios";
import { fetchUser } from "./models/fetchUser";
import { TLanguage } from "./types";
export class enkaNetwork {
    language: TLanguage;
    request: Axios;
    constructor(data: { language?: TLanguage }) {
        this.language = data.language || "EN";
        this.request = new Axios({
            baseURL: "https://enka.network",
            headers: {
                Accept: "application/json",
            },
        });
    }
    async fetchUser(uid: number) {
        return this.request.get(`/u/${uid}/__data.json`).then(response => new fetchUser(this.language, JSON.parse(response.data)));
    }
}