import { FetchUserUID, FetchUserProfile, PlayerInfo } from "./models/index";
import { TLanguage } from "./types";
export declare class EnkaNetwork {
    #private;
    language: TLanguage;
    constructor(data: {
        language?: TLanguage;
        caching: boolean;
    });
    /**
     * Fetch user by uid from the game.
     * @param {number} uid `UID` from the game.
     * @param {string} language The language to be used in the localization of names (characters, artifacts, etc.). Default is EnkaNetwork.language.
     */
    fetchUser(uid: number, language?: TLanguage): Promise<FetchUserUID>;
    fetchProfile(profileTag: string, language?: TLanguage): Promise<FetchUserProfile>;
    fetchAccounts(tag: string, language?: TLanguage): Promise<[{
        is_uid_public: boolean;
        player: PlayerInfo;
    }]>;
}
