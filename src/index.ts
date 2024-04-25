//@ts-ignore
import config from "../assets/config.json";
//@ts-ignore
import { version } from "../package.json";
import { APIError, NoLanguageFound } from "./errors";
import {
	AssetsFinder,
	AssetsUpdater,
	CacheManager,
	DataManager,
	LocalizationManager,
} from "./helpers";
import {
	FetchEnkaHoyo,
	FetchEnkaHoyoBuilds,
	FetchEnkaProfile,
	FetchProfileInfo,
	FetchUserUID,
} from "./models";
import type {
	IAssetsUpdaterParams,
	IEnkaAccount,
	IEnkaAccountBuildData,
	IEnkaAccountsData,
	IEnkaProfileData,
	IProfileAvatarsInfo,
	IProfileInfo,
	TLanguage,
} from "./types";

export * from "./models";

/** The class in which all interaction with enka.network takes place
 *
 * [Documentation](https://kravets.gitbook.io/enkanetwork/class-description/enkanetwork)
 **/
export class EnkaNetwork {
	private readonly cache?: CacheManager;
	language: TLanguage;
	assets: AssetsFinder;
	assetsUpdater?: AssetsUpdater;
	userAgent?: string | false | null;

	constructor({
		language = "EN",
		caching = true,
		userAgent,
		assets = { instant: false, languages: [] },
		uiAssetsPath,
	}: {
		// The **language** to be used in the localization of names (character, artifacts, etc.). Default is «**`EN`**»
		language?: TLanguage;
		// Enabling response caching. Default is «`true`»
		caching?: boolean;
		// Disable or change the header «`User-Agent`». (`false` for disable). Default is «`enkanetwork@version`»
		userAgent?: string | false | null;
		// Params for AssetsUpdater
		assets?: IAssetsUpdaterParams | false;
		// The path to which the **`{icon}.png`** string will be added. Default is «https://enka.network/ui/»
		uiAssetsPath?: string;
	} = {}) {
		this.language = language;
		this.userAgent = userAgent;

		this.cache = caching ? new CacheManager({ checkPeriod: 20 }) : undefined;

		const dataManager = new DataManager();
		const localizationManager = new LocalizationManager();

		this.assets = new AssetsFinder({
			uiAssetsPath,
			dataManager,
			localizationManager,
		});

		// Thus it is not necessary to fill in the languages in assets if it is selected
		if (typeof assets === "object") {
			if (!assets.languages) assets.languages = [];

			assets.languages.push(language);
		}

		this.assetsUpdater = assets
			? new AssetsUpdater(assets, dataManager, localizationManager)
			: undefined;
	}

	async request<T>(url: string, cacheKey?: string) {
		if (cacheKey && this.cache) {
			const cache = await this.cache.get(cacheKey);
			if (cache) return cache as T;
		}
		const res = await fetch(`https://enka.network/api${url}`, {
			method: "GET",
			headers: {
				...(this.userAgent !== false && {
					"User-Agent":
						typeof this.userAgent === "string"
							? this.userAgent
							: `enkaNetwork@${version}`,
				}),
			},
		});
		if (!res.ok) throw new APIError(res.status);

		const data = await res.json();

		if (cacheKey && this.cache && data.ttl) {
			this.cache.set(cacheKey, data, data.ttl);
		}

		return data as T;
	}

	/**
	 * Fetch only profile info by uid from the game.
	 * @param {number} uid `UID` from the game.
	 * @param {string} language The language to be used in the localization of names (character, artifacts, etc.). Default is EnkaNetwork.language.
	 */
	async fetchProfileInfo(uid: number, language?: TLanguage) {
		const response = await this.request<IProfileInfo>(
			`/uid/${uid}/?info`,
			`playerInfoByUID-${uid}-${language || this.language}`,
		);

		const data = new FetchProfileInfo(
			this.assets,
			language || this.language,
			response,
		);

		return data;
	}

	/**
	 * Fetch user by uid from the game.
	 *
	 * [Documentation](https://kravets.gitbook.io/enkanetwork/methods/fetchuser)
	 * @param {number} uid `UID` from the game.
	 * @param {string} language The language to be used in the localization of names (character, artifacts, etc.). Default is EnkaNetwork.language.
	 */
	async fetchUser(uid: number, language?: TLanguage) {
		const response = await this.request<IProfileAvatarsInfo>(
			`/uid/${uid}/`,
			`uid-${uid}-${language || this.language}`,
		);

		const data = new FetchUserUID(
			this.assets,
			language || this.language,
			response,
		);

		return data;
	}

	/**
	 * Fetch enkaProfile by username from the site.
	 * @param {string} username `username` from the site.
	 */
	async fetchEnkaProfile(username: string) {
		const response = await this.request<IEnkaProfileData>(
			`/profile/${username}/`,
		);

		return new FetchEnkaProfile(response);
	}

	/**
	 * Fetch enkaProfile accounts by username from the site.
	 * @param {string} username `username` from the site.
	 * @param {string} language The language to be used in the localization of names (character, artifacts, etc.). Default is EnkaNetwork.language.
	 */
	async fetchEnkaHoyos(username: string, language?: TLanguage) {
		const response = await this.request<IEnkaAccountsData>(
			`/profile/${username}/hoyos/`,
		);

		return Object.values(response).map(
			(account) =>
				new FetchEnkaHoyo(this.assets, language || this.language, account),
		);
	}

	/**
	 * Fetch enkaProfile account by username and account hash from the site.
	 * @param {string} username `username` from the site.
	 * @param {string} hash account `hash` from the account.
	 * @param {string} language The language to be used in the localization of names (character, artifacts, etc.). Default is EnkaNetwork.language.
	 */
	async fetchEnkaHoyo(username: string, hash: string, language?: TLanguage) {
		const response = await this.request<IEnkaAccount>(
			`/profile/${username}/hoyos/${hash}`,
		);

		return new FetchEnkaHoyo(this.assets, language || this.language, response);
	}

	/**
	 * Fetch enkaProfile builds for account from the site.
	 * @param {string} username `username` from the site.
	 * @param {string} hash account `hash` from the account.
	 * @param {string} language The language to be used in the localization of names (character, artifacts, etc.). Default is EnkaNetwork.language.
	 */
	async fetchEnkaHoyoBuilds(
		username: string,
		hash: string,
		language?: TLanguage,
	) {
		const response = await this.request<
			Record<string, IEnkaAccountBuildData[]>
		>(`/profile/${username}/hoyos/${hash}/builds`);

		return Object.values(response)
			.flat()
			.map(
				(build) =>
					new FetchEnkaHoyoBuilds(
						this.assets,
						language || this.language,
						build,
					),
			);
	}

	setLanguage(language: TLanguage) {
		if (!(config.languages as TLanguage[]).includes(language))
			throw new NoLanguageFound("This language is not downloaded");

		this.language = language;

		return this;
	}
}
