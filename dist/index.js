"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _EnkaNetwork_request, _EnkaNetwork_cache;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnkaNetwork = void 0;
const axios_1 = require("axios");
const index_1 = require("./models/index");
const node_cache_1 = __importDefault(require("node-cache"));
class EnkaNetwork {
    constructor(data) {
        _EnkaNetwork_request.set(this, void 0);
        _EnkaNetwork_cache.set(this, void 0);
        this.language = data.language || "EN";
        __classPrivateFieldSet(this, _EnkaNetwork_request, new axios_1.Axios({
            baseURL: "https://enka.network",
            headers: {
                Accept: "application/json",
                "User-Agent": "enkaNetwork@1.1.1",
            },
        }), "f");
        __classPrivateFieldSet(this, _EnkaNetwork_cache, data.caching !== false
            ? new node_cache_1.default({ checkperiod: 40 })
            : undefined, "f");
    }
    /**
     * Fetch user by uid from the game.
     * @param {number} uid `UID` from the game.
     * @param {string} language The language to be used in the localization of names (characters, artifacts, etc.). Default is EnkaNetwork.language.
     */
    async fetchUser(uid, language = "EN") {
        var _a;
        let cache = (_a = __classPrivateFieldGet(this, _EnkaNetwork_cache, "f")) === null || _a === void 0 ? void 0 : _a.get(`uid-${uid}-${language || this.language}`);
        if (cache)
            return cache;
        return __classPrivateFieldGet(this, _EnkaNetwork_request, "f")
            .get(`/u/${uid}/__data.json`)
            .then((response) => JSON.parse(response.data))
            .then((data) => {
            var _a;
            console.log("аыоароыа не кеш блять");
            const res = new index_1.FetchUserUID(language || this.language, data);
            (_a = __classPrivateFieldGet(this, _EnkaNetwork_cache, "f")) === null || _a === void 0 ? void 0 : _a.set(`uid-${uid}-${language || this.language}`, res, res.ttl);
            return res;
        });
    }
    async fetchProfile(profileTag, language) {
        return __classPrivateFieldGet(this, _EnkaNetwork_request, "f")
            .get(`/u/${profileTag}/__data.json`)
            .then((response) => JSON.parse(response.data))
            .then((data) => new index_1.FetchUserProfile(language || this.language, data));
    }
    async fetchAccounts(tag, language) {
        return __classPrivateFieldGet(this, _EnkaNetwork_request, "f")
            .get(`/api/profile/${tag}/hoyos/`)
            .then((response) => JSON.parse(response.data))
            .then((data) => data.map((account) => {
            return {
                is_uid_public: account.is_uid_public,
                player: new index_1.PlayerInfo(language || this.language, account.player_info),
            };
        }));
    }
}
exports.EnkaNetwork = EnkaNetwork;
_EnkaNetwork_request = new WeakMap(), _EnkaNetwork_cache = new WeakMap();
