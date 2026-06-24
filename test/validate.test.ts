import { describe, expect, test } from "bun:test";
import { validateAssets } from "../src/helpers/AssetsManager/validate";

const goodCharacter = {
	id: 1,
	skillDepotId: 1,
	nameTextMapHash: 1,
	iconName: "a",
	sideIconName: "b",
	gachaIcon: "c",
	qualityStars: 5 as const,
	element: "Pyro" as const,
	skills: [1],
	talents: [2],
};

describe("validateAssets", () => {
	test("valid record produces no problems", () => {
		expect(validateAssets("characters", [goodCharacter])).toHaveLength(0);
	});

	test("missing required key is reported (e.g. Aloy-style qualityStars)", () => {
		const { qualityStars, ...bad } = goodCharacter;
		const problems = validateAssets("characters", [bad as never]);
		expect(problems.some((p) => p.includes("qualityStars is missing"))).toBe(
			true,
		);
	});

	test("wrong primitive type is reported", () => {
		const problems = validateAssets("skills", [
			{ id: 1, nameTextMapHash: "x", skillIcon: "i", proudSkillGroupId: 1 } as never,
		]);
		expect(problems.some((p) => /expected number, got string/.test(p))).toBe(
			true,
		);
	});

	test("optional namecard navbar may be absent", () => {
		expect(
			validateAssets("namecards", [
				{ id: 1, nameTextMapHash: 1, icon: "i", banner: "b" } as never,
			]),
		).toHaveLength(0);
	});

	test("required namecard banner must be present", () => {
		const problems = validateAssets("namecards", [
			{ id: 7, nameTextMapHash: 1, icon: "i" } as never,
		]);
		expect(problems.some((p) => p.includes("banner is missing"))).toBe(true);
	});

	test("profilePictures require id, iconName and nameTextMapHash", () => {
		expect(
			validateAssets("profilePictures", [
				{ id: 11200, iconName: "UI_AvatarIcon_Linnea_Circle", nameTextMapHash: 1 },
			]),
		).toHaveLength(0);

		const problems = validateAssets("profilePictures", [
			{ id: 11200, nameTextMapHash: 1 } as never,
		]);
		expect(problems.some((p) => p.includes("iconName is missing"))).toBe(true);
	});
});
