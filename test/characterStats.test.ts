import { describe, expect, test } from "bun:test";
import { CharacterStats } from "../src/models/character/CharacterStats";

describe("CharacterStats stat-id mapping", () => {
	const s = new CharacterStats({
		"22": 1.5,
		"32": 0.999,
		"62": 0.123,
		"2000": 40000,
		"2001": 2000,
		"2002": 1500,
		"2003": 250,
		"3003": 777,
	});

	test("freezeResist reads id 62, not id 32 (regression)", () => {
		expect(s.freezeResist).toBe(0.123);
	});

	test("defenceIgnoreDelta still reads id 32", () => {
		expect(s.defenceIgnoreDelta).toBe(0.999);
	});

	test("curSpeed reads id 2003 and is not clobbered by 3003 (regression)", () => {
		expect(s.curSpeed).toBe(250);
	});

	test("core derived stats map correctly", () => {
		expect(s.maxHp).toBe(40000);
		expect(s.curAttack).toBe(2000);
		expect(s.curDefense).toBe(1500);
		expect(s.criticalHurt).toBe(1.5);
	});

	test("absent stats default to 0", () => {
		const empty = new CharacterStats({});
		expect(empty.maxHp).toBe(0);
		expect(empty.freezeResist).toBe(0);
	});
});
