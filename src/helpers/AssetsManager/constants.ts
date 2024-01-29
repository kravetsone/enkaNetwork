import path from "path";
import { TElement, TLanguage } from "../../types";

export const PROJECT_GITLAB_URL =
	"https://gitlab.com/api/v4/projects/53216109/repository/commits";
export const BASE_URL = "https://gitlab.com/Dimbreath/AnimeGameData/-/raw/main";
export const LOCALIZATION_BASE_URL = BASE_URL + "/TextMap/TextMap";

export const CHARACTER_DATA_URL =
	BASE_URL + "/ExcelBinOutput/AvatarExcelConfigData.json";
export const SKILLSET_DATA_URL =
	BASE_URL + "/ExcelBinOutput/AvatarSkillDepotExcelConfigData.json";
export const SKILL_DATA_URL =
	BASE_URL + "/ExcelBinOutput/AvatarSkillExcelConfigData.json";
export const CONSTELLATION_DATA_URL =
	BASE_URL + "/ExcelBinOutput/AvatarTalentExcelConfigData.json";
export const COSTUME_DATA_URL =
	BASE_URL + "/ExcelBinOutput/AvatarCostumeExcelConfigData.json";
export const NAMECARD_DATA_URL =
	BASE_URL + "/ExcelBinOutput/MaterialExcelConfigData.json";
export const WEAPON_DATA_URL =
	BASE_URL + "/ExcelBinOutput/WeaponExcelConfigData.json";
export const RELIQUARY_DATA_URL =
	BASE_URL + "/ExcelBinOutput/ReliquaryExcelConfigData.json";
export const RELIQUARY_SET_DATA_URL =
	BASE_URL + "/ExcelBinOutput/ReliquarySetExcelConfigData.json";
export const RELIQUARY_AFFIX_DATA_URL =
	BASE_URL + "/ExcelBinOutput/EquipAffixExcelConfigData.json";

export const qualityTypesStars: Record<
	"QUALITY_ORANGE" | "QUALITY_PURPLE",
	5 | 4
> = {
	QUALITY_ORANGE: 5,
	QUALITY_PURPLE: 4,
};

export const elements: Record<string, TElement> = {
	Ice: "Cryo",
	Water: "Hydro",
	Wind: "Anemo",
	Fire: "Pyro",
	Rock: "Geo",
	Electric: "Electro",
	Grass: "Dendro",
};

export const excludeCharacters = [
	10000001, 10000005, 10000007, 11000008, 11000009, 11000010, 11000011,
	11000013, 11000017, 11000018, 11000019, 11000025, 11000026, 11000027,
	11000028, 11000030, 11000031, 11000032, 11000033, 11000034, 11000035,
	11000036, 11000037, 11000038, 11000039, 11000040, 11000041, 11000042,
	11000043, 11000044, 11000045,
];

export const localizationLanguages: TLanguage[] = [
	"CHS",
	"CHT",
	"DE",
	"EN",
	"ES",
	"FR",
	"ID",
	"JP",
	"KR",
	"PT",
	"RU",
	"TH",
	"VI",
];

export const ASSETS_PATH = path.resolve(__dirname, "..", "..", "..", "assets");
