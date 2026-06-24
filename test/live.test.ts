import { describe, expect, test } from "bun:test";
import { APIError } from "../src/errors";
import {
	BASE_URL,
	BASE_URL_FALLBACK,
	CHARACTER_DATA_URL,
	CONSTELLATION_DATA_URL,
	COSTUME_DATA_URL,
	LOCALIZATION_BASE_URL,
	NAMECARD_DATA_URL,
	PROFILE_PICTURE_DATA_URL,
	RELIQUARY_AFFIX_DATA_URL,
	RELIQUARY_DATA_URL,
	RELIQUARY_SET_DATA_URL,
	SKILLSET_DATA_URL,
	SKILL_DATA_URL,
	WEAPON_DATA_URL,
} from "../src/helpers/AssetsManager/constants";
import { EnkaNetwork } from "../src/index";

// Network tests. Off by default so CI/offline runs stay green; enable with:
//   ENKA_LIVE=1 bun test test/live.test.ts
const LIVE = !!process.env.ENKA_LIVE;
const d = LIVE ? describe : describe.skip;
const TIMEOUT = 30_000;

const DATA_URLS = [
	CHARACTER_DATA_URL,
	SKILLSET_DATA_URL,
	SKILL_DATA_URL,
	CONSTELLATION_DATA_URL,
	COSTUME_DATA_URL,
	NAMECARD_DATA_URL,
	WEAPON_DATA_URL,
	RELIQUARY_DATA_URL,
	RELIQUARY_SET_DATA_URL,
	RELIQUARY_AFFIX_DATA_URL,
	PROFILE_PICTURE_DATA_URL,
];

// Checks existence without downloading multi-MB files. Returns the HTTP status
// (404 = missing). HEAD avoids transferring/decompressing the body.
async function probe(url: string) {
	const res = await fetch(url, {
		method: "HEAD",
		headers: { "User-Agent": "enkanetwork-test/1.0" },
	});
	return res.status;
}

const exists = (status: number) => status !== 404;

d("live: asset data endpoints do not 404", () => {
	for (const url of DATA_URLS) {
		test(
			`GitLab ${url}`,
			async () => expect(exists(await probe(BASE_URL + url))).toBe(true),
			TIMEOUT,
		);
		test(
			`GitHub mirror ${url}`,
			async () =>
				expect(exists(await probe(BASE_URL_FALLBACK + url))).toBe(true),
			TIMEOUT,
		);
	}
});

d("live: localization TextMaps resolve (incl. split languages)", () => {
	// Single-file language.
	test(
		"EN single file exists",
		async () =>
			expect(
				exists(await probe(`${BASE_URL + LOCALIZATION_BASE_URL}EN.json`)),
			).toBe(true),
		TIMEOUT,
	);

	// RU is split: the single file is gone, but the _0/_1 parts exist.
	test(
		"RU is split into _0/_1 parts",
		async () => {
			const single = await probe(`${BASE_URL + LOCALIZATION_BASE_URL}RU.json`);
			const part0 = await probe(`${BASE_URL + LOCALIZATION_BASE_URL}RU_0.json`);
			expect(single).toBe(404);
			expect(exists(part0)).toBe(true);
		},
		TIMEOUT,
	);

	test(
		"new languages IT and TR exist",
		async () => {
			expect(
				exists(await probe(`${BASE_URL + LOCALIZATION_BASE_URL}IT.json`)),
			).toBe(true);
			expect(
				exists(await probe(`${BASE_URL + LOCALIZATION_BASE_URL}TR.json`)),
			).toBe(true);
		},
		TIMEOUT,
	);
});

d("live: enka API fetchUser parses real showcase data", () => {
	const enka = new EnkaNetwork({ assets: false });

	test(
		"fetchUser(825436941)",
		async () => {
			let user: Awaited<ReturnType<typeof enka.fetchUser>>;
			try {
				user = await enka.fetchUser(825436941);
			} catch (error) {
				if (
					error instanceof APIError &&
					[429, 424, 503].includes(error.status)
				) {
					console.warn(`skipping: enka API returned ${error.status}`);
					return;
				}
				throw error;
			}

			expect(typeof user.player.nickname).toBe("string");
			expect(Array.isArray(user.characters)).toBe(true);

			for (const c of user.characters) {
				expect(c.name.length).toBeGreaterThan(0);
				expect(c.stats.maxHp).toBeGreaterThan(0);
				expect(c.weapon.name.length).toBeGreaterThan(0);
			}
		},
		TIMEOUT,
	);
});

d("live: image asset URLs resolve on the UI CDN", () => {
	const enka = new EnkaNetwork({ assets: false });

	test(
		"core icons (avatar/side/gacha/skill/constellation) are hosted",
		async () => {
			const character = enka.assets.characters.getById(10000046); // Hu Tao
			const skill = enka.assets.skills.getById(character.skills[0]);
			const constellation = enka.assets.constellations.getById(
				character.talents[0],
			);

			const urls = [
				enka.assets.getAssetPath(character.iconName),
				enka.assets.getAssetPath(character.sideIconName),
				enka.assets.getAssetPath(character.gachaIcon),
				enka.assets.getAssetPath(skill.skillIcon),
				enka.assets.getAssetPath(constellation.icon),
			];

			for (const url of urls) {
				expect(url.startsWith("https://enka.network/ui/")).toBe(true);
				expect(exists(await probe(url))).toBe(true);
			}
		},
		TIMEOUT,
	);
});
