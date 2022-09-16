import { Axios } from "axios";
import { fetchUser } from "./models/fetchUser";
import { TLanguage } from "./types";
export declare class enkaNetwork {
    language: TLanguage;
    request: Axios;
    constructor(data: {
        language?: TLanguage;
    });
    fetchUser(uid: number): Promise<fetchUser>;
}
