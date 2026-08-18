import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import fs from "node:fs/promises";
import path from "node:path";
import { NoLanguageFound } from "../src/errors";
import { CostumeFinder } from "../src/helpers/AssetsFinder/CostumeFinder";
import { pickName } from "../src/helpers/AssetsFinder/pickName";
import { LocalizationManager } from "../src/helpers/AssetsManager/LocalizationManager";
import { ASSETS_PATH } from "../src/helpers/AssetsManager/constants";
import { validateAssets } from "../src/helpers/AssetsManager/validate";

describe("pickName", () => {
	test("returns the requested language", () => {
		expect(pickName({ EN: "Amber", RU: "Эмбер" }, "EN", "character 1")).toBe(
			"Amber",
		);
	});

	// A language the updater never downloaded used to throw from inside model
	// construction, killing the whole fetchUser call over one label.
	test("falls back to a downloaded language instead of throwing", () => {
		expect(pickName({ RU: "Эмбер" }, "EN", "character 1")).toBe("Эмбер");
	});

	test("throws when the entry holds no name at all", () => {
		expect(() => pickName({}, "EN", "character 1")).toThrow(NoLanguageFound);
	});
});

describe("CostumeFinder", () => {
	// Default outfits are not in the generated data (they carry no icons upstream),
	// so an unknown skinId must degrade to the character's base art, not throw.
	test("getById returns undefined for an unknown costume", () => {
		const finder = new CostumeFinder([], {});
		expect(finder.getById(200301)).toBeUndefined();
	});
});

describe("LocalizationManager", () => {
	// write() persists the store, so keep the real (generated) file intact around it.
	const file = path.resolve(ASSETS_PATH, "localization", "namecards.json");
	let backup: string;

	beforeAll(async () => {
		backup = await fs.readFile(file, "utf8");
	});
	afterAll(async () => {
		await fs.writeFile(file, backup);
	});

	test("write merges languages per hash instead of replacing them", async () => {
		const manager = new LocalizationManager();
		manager.namecards = { "1": { RU: "Разлом" } };

		// Writing an EN-only fetch (what the postinstall does by default) must keep RU.
		await manager.write("namecards", { "1": { EN: "Cleft" } });

		expect(manager.namecards["1"]).toEqual({ RU: "Разлом", EN: "Cleft" });
		expect(JSON.parse(await fs.readFile(file, "utf8"))["1"]).toEqual({
			RU: "Разлом",
			EN: "Cleft",
		});
	});
});

describe("validateAssets", () => {
	// Alternate-sprint skills (Citlali 11076, Olorun 30506) have no proud-skill group.
	test("accepts a skill without proudSkillGroupId", () => {
		expect(
			validateAssets("skills", [
				{ id: 11076, nameTextMapHash: 1, skillIcon: "Skill_S_Citlali_03" },
			] as never),
		).toHaveLength(0);
	});
});
