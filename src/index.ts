import { Axios } from "axios";
import NodeCache from "node-cache";
//@ts-ignore
import { version } from "../package.json";
import { APIError } from "./errors/APIError";
import {
    FetchProfileAccount,
    FetchProfileInfo,
    FetchUserProfile,
    FetchUserUID,
} from "./models";
import { TLanguage } from "./types";

export class EnkaNetwork {
    language: TLanguage;
    private readonly request: Axios;
    private readonly cache?: NodeCache;
    constructor(data: {
        language?: TLanguage;
        caching?: boolean;
        userAgent?: string | false;
    }) {
        this.language = data.language || "EN";
        this.request = new Axios({
            baseURL: "https://enka.network/api",
            timeout: 10 * 1000,
            validateStatus(status) {
                return status >= 200 && status < 300;
            },
            headers: {
                Accept: "application/json",
                ...(data.userAgent !== false && {
                    "User-Agent":
                        typeof data.userAgent == "string"
                            ? data.userAgent
                            : `enkaNetwork@${version}`,
                }),
            },
        });

        this.request.interceptors.response.use(
            (res) => res,
            (error) => Promise.reject(new APIError(error.response.status)),
        );
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
    async fetchPlayerInfo(uid: number, language: TLanguage = "EN") {
        const cache = this.cache?.get<FetchProfileInfo | undefined>(
            `playerInfoByUID-${uid}-${language || this.language}`,
        );
        if (cache) return cache;
        return this.request
            .get(`/uid/${uid}/?info`)
            .then((response) => JSON.parse(response.data))
            .then((data) => {
                const res = new FetchProfileInfo(
                    language || this.language,
                    data,
                );
                this.cache?.set(
                    `playerInfoByUID-${uid}-${language || this.language}`,
                    res,
                    res.ttl,
                );
                return res;
            });
    }

    /**
     * Fetch user by uid from the game.
     * @param {number} uid `UID` from the game.
     * @param {string} language The language to be used in the localization of names (characters, artifacts, etc.). Default is EnkaNetwork.language.
     */
    async fetchUser(uid: number, language: TLanguage = "EN") {
        const cache = this.cache?.get<FetchUserUID | undefined>(
            `uid-${uid}-${language || this.language}`,
        );
        if (cache) return cache;
        return this.request
            .get(`/uid/${uid}/`)
            .then((response) => JSON.parse(response.data))
            .then((data) => {
                const res = new FetchUserUID(language || this.language, data);
                this.cache?.set(
                    `uid-${uid}-${language || this.language}`,
                    res,
                    res.ttl,
                );
                return res;
            });
    }

    /**
     * Fetch enkaProfile by username from the site.
     * @param {string} username `username` from the site.
     */
    async fetchProfile(username: string): Promise<FetchUserProfile> {
        return this.request
            .get(`/profile/${username}/`)
            .then((response) => JSON.parse(response.data))
            .then((data) => new FetchUserProfile(data));
    }

    /**
     * Fetch enkaProfile accounts by username from the site.
     * @param {string} username `username` from the site.
     * @param language
     */
    async fetchProfileAccounts(username: string, language?: TLanguage) {
        return this.request
            .get(`/profile/${username}/hoyos/`)
            .then((response) => JSON.parse(response.data))
            .then((data) =>
                Object.keys(data).map(
                    (accountHash) =>
                        new FetchProfileAccount(
                            language || this.language,
                            data[accountHash],
                        ),
                ),
            );
    }

    /**
     * Fetch enkaProfile account by username and account hash from the site.
     * @param {string} username `username` from the site.
     * @param {string} hash account `hash` from the account.
     * @param language
     */
    async fetchProfileAccount(
        username: string,
        hash: string,
        language?: TLanguage,
    ) {
        return this.request
            .get(`/profile/${username}/hoyos/${hash}`)
            .then((response) => JSON.parse(response.data))
            .then(
                (data) =>
                    new FetchProfileAccount(language || this.language, data),
            );
    }
}
