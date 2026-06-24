import { describe, expect, test } from "bun:test";
import { EnkaNetwork, FetchUserUID } from "../src/index";
import legacyFixture from "./fixtures/uid-618285856.json";
import modernFixture from "./fixtures/uid-825436941.json";

// Parse real (public) enka.network showcase responses through the full model
// pipeline using the bundled assets. Requires assets to be generated first
// (run the install/regeneration step); otherwise these are skipped.
const enka = new EnkaNetwork({ assets: false });

let assetsReady = true;
try {
	enka.assets.characters.getById(10000021); // Amber — always present
} catch {
	assetsReady = false;
}

const d = assetsReady ? describe : describe.skip;

d("model parsing against live fixtures", () => {
	test("modern fixture: 12 characters parse with resolved names and stats", () => {
		const user = new FetchUserUID(enka.assets, "EN", modernFixture as never);

		expect(user.characters).toHaveLength(12);

		for (const c of user.characters) {
			expect(typeof c.name).toBe("string");
			expect(c.name.length).toBeGreaterThan(0);
			expect(c.stats.maxHp).toBeGreaterThan(0);
			expect(c.weapon).toBeDefined();
			expect(c.weapon.name.length).toBeGreaterThan(0);
			for (const r of c.reliquaries) {
				expect(r.level).toBeGreaterThanOrEqual(0);
				expect(r.level).toBeLessThanOrEqual(20);
			}
		}

		// At least one name must actually resolve (guards against the old
		// "everything is UNKNOWN" localization bug).
		expect(user.characters.some((c) => c.name !== "UNKNOWN")).toBe(true);
	});

	test("weapon exposes awakenIcon derived from the base icon", () => {
		const user = new FetchUserUID(enka.assets, "EN", modernFixture as never);
		const weapon = user.characters[0]?.weapon;
		expect(weapon?.awakenIcon).toBeDefined();
		expect(weapon?.awakenIcon).toBe(
			weapon!.icon.replace(".png", "_Awaken.png"),
		);
	});

	test("reliquary level is computed without mutating the input (regression)", () => {
		const first = new FetchUserUID(enka.assets, "EN", modernFixture as never);
		const second = new FetchUserUID(enka.assets, "EN", modernFixture as never);
		const a = first.characters[0]?.reliquaries[0]?.level;
		const b = second.characters[0]?.reliquaries[0]?.level;
		expect(a).toBe(b);
	});

	test("legacy fixture: profilePicture {avatarId} resolves to a character", () => {
		const user = new FetchUserUID(enka.assets, "EN", legacyFixture as never);
		expect(user.player.profilePicture).toBeDefined();
		expect(user.player.profilePicture?.id).toBe(10000021);
		expect(user.player.profilePicture?.name).toBe("Amber");
	});

	test("modern fixture: profilePicture {id} resolves via ProfilePictureExcelConfigData", () => {
		const user = new FetchUserUID(enka.assets, "EN", modernFixture as never);
		expect(user.player.profilePicture).toBeDefined();
		expect(user.player.profilePicture?.id).toBe(11200);
		expect(user.player.profilePicture?.name).toBe("Linnea");
		expect(user.player.profilePicture?.icon).toContain("_Circle");
	});
});
