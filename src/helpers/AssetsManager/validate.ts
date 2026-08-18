import type {
	ICharacterData,
	IConstellationData,
	ICostumeData,
	INamecardData,
	IProfilePictureData,
	ISkillData,
} from "../../types";

type TFieldType = "number" | "string" | "array";

interface IFieldSpec {
	key: string;
	type: TFieldType;
	// The field may be absent or `null` (e.g. namecard `navbar`).
	optional?: boolean;
}

// The keys every generated record must contain, mirroring the I*Data interfaces.
// If a key is `undefined`/`null` (or the wrong type) after transformation it almost
// always means an upstream game-data column was renamed/removed (schema drift).
const schemas: Record<keyof IDataShapes, IFieldSpec[]> = {
	characters: [
		{ key: "id", type: "number" },
		{ key: "skillDepotId", type: "number" },
		{ key: "nameTextMapHash", type: "number" },
		{ key: "iconName", type: "string" },
		{ key: "sideIconName", type: "string" },
		{ key: "gachaIcon", type: "string" },
		{ key: "qualityStars", type: "number" },
		{ key: "element", type: "string" },
		{ key: "skills", type: "array" },
		{ key: "talents", type: "array" },
	],
	constellations: [
		{ key: "id", type: "number" },
		{ key: "nameTextMapHash", type: "number" },
		{ key: "icon", type: "string" },
	],
	costumes: [
		{ key: "id", type: "number" },
		{ key: "iconName", type: "string" },
		{ key: "sideIconName", type: "string" },
		{ key: "gachaIcon", type: "string" },
		{ key: "nameTextMapHash", type: "number" },
	],
	namecards: [
		{ key: "id", type: "number" },
		{ key: "nameTextMapHash", type: "number" },
		{ key: "icon", type: "string" },
		{ key: "navbar", type: "string", optional: true },
		{ key: "banner", type: "string" },
	],
	skills: [
		{ key: "id", type: "number" },
		{ key: "nameTextMapHash", type: "number" },
		{ key: "skillIcon", type: "string" },
		// Alternate-sprint skills (Citlali, Olorun, …) carry no proud-skill group —
		// they aren't levellable, so the column is simply absent upstream.
		{ key: "proudSkillGroupId", type: "number", optional: true },
	],
	profilePictures: [
		{ key: "id", type: "number" },
		{ key: "iconName", type: "string" },
		{ key: "nameTextMapHash", type: "number" },
	],
};

interface IDataShapes {
	characters: ICharacterData;
	constellations: IConstellationData;
	costumes: ICostumeData;
	namecards: INamecardData;
	skills: ISkillData;
	profilePictures: IProfilePictureData;
}

/**
 * Validates that every generated record contains all required keys with the right
 * primitive shape. Returns a (possibly empty) list of human-readable problems instead
 * of throwing, so callers decide how to react.
 */
export function validateAssets<T extends keyof IDataShapes>(
	type: T,
	records: IDataShapes[T][],
): string[] {
	const schema = schemas[type];
	const problems: string[] = [];

	records.forEach((record, index) => {
		const id = (record as { id?: number }).id ?? `#${index}`;

		for (const { key, type: fieldType, optional } of schema) {
			const value = (record as unknown as Record<string, unknown>)[key];

			if (value === undefined || value === null) {
				if (!optional) problems.push(`${type}[${id}].${key} is missing`);
				continue;
			}

			const actual = Array.isArray(value) ? "array" : typeof value;

			if (actual !== fieldType)
				problems.push(
					`${type}[${id}].${key} expected ${fieldType}, got ${actual}`,
				);
		}
	});

	return problems;
}
