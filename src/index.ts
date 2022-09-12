import { Axios } from "axios";
import { fetchUser } from "./models/fetchUser";
export class enkaNetwork {
    language: string;
    request: Axios;
    constructor(data: { language: string }) {
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