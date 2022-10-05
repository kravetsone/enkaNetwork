import { Axios } from "axios";
import { FetchUserUID, FetchUserProfile } from "./models/index";
import { TLanguage } from "./types";
export declare class EnkaNetwork {
    language: TLanguage;
    request: Axios;
    constructor(data: {
        language?: TLanguage;
    });
    fetchUser(uid: number | string, language?: TLanguage): Promise<FetchUserUID | FetchUserProfile>;
    fetchAccounts(tag: string, language?: TLanguage): Promise<any>;
}
