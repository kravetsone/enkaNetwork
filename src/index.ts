import { Axios } from "axios";
import { FetchUserUID, FetchUserProfile, PlayerInfo } from "./models/index";
import { TLanguage } from "./types";
import NodeCache from "node-cache";

export class EnkaNetwork {
    language: TLanguage;
    private readonly request: Axios;
    private readonly cache?: NodeCache;
    constructor(data: {
        language?: TLanguage;
        caching: boolean;
        userAgent?: string | boolean;
    }) {
        this.language = data.language || "EN";
        this.request = new Axios({
            baseURL: "https://enka.network",
            timeout: 10 * 1000,
            headers: {
                Accept: "application/json",
                ...(data.userAgent !== false && {
                    "User-Agent":
                        typeof data.userAgent == "string"
                            ? data.userAgent
                            : "enkaNetwork@1.1.6",
                }),
            },
        });
        this.cache =
            data.caching !== false
                ? new NodeCache({ checkperiod: 20 })
                : undefined;
    }
    /**
     * Fetch user by uid from the game.
     * @param {number} uid `UID` from the game.
     * @param {string} language The language to be used in the localization of names (characters, artifacts, etc.). Default is EnkaNetwork.language.
     */
    async fetchUser(uid: number, language: TLanguage = "EN") {
        let cache: FetchUserUID | undefined = this.cache?.get(
            `uid-${uid}-${language || this.language}`
        );
        if (cache) return cache;
        return this.request
            .get(`/u/${uid}/__data.json`)
            .then((response) => JSON.parse(response.data))
            .then((data) => {
                const res = new FetchUserUID(language || this.language, data);
                this.cache?.set(
                    `uid-${uid}-${language || this.language}`,
                    res,
                    res.ttl
                );
                return res;
            });
    }
    async fetchProfile(
        profileTag: string,
        language?: TLanguage
    ): Promise<FetchUserProfile> {
        return this.request
            .get(`/u/${profileTag}/__data.json`)
            .then((response) => JSON.parse(response.data))
            .then(
                (data) => new FetchUserProfile(language || this.language, data)
            );
    }
    async fetchAccounts(
        tag: string,
        language?: TLanguage
    ): Promise<[{ is_uid_public: boolean; player: PlayerInfo }]> {
        return this.request
            .get(`/api/profile/${tag}/hoyos/`)
            .then((response) => JSON.parse(response.data))
            .then((data) =>
                (data || []).map((account: any) => {
                    return {
                        is_uid_public: account.is_uid_public,
                        player: new PlayerInfo(
                            language || this.language,
                            account.player_info
                        ),
                    };
                })
            );
    }
}
