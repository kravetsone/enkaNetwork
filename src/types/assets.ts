export type TElement =
	| "Cryo"
	| "Hydro"
	| "Anemo"
	| "Pyro"
	| "Geo"
	| "Electro"
	| "Dendro";
export type TAssetsList =
	| "characters"
	| "costumes"
	| "constellations"
	| "namecards"
	| "reliquary"
	| "reliquarySets"
	| "skills"
	| "weapons"
	| "profilePictures";

export interface ICharacterData {
	id: number;
	skillDepotId: number;
	nameTextMapHash: number;
	iconName: string;
	sideIconName: string;
	gachaIcon: string;
	qualityStars: 5 | 4;
	element: TElement;
	skills: number[];
	talents: number[];
}

export interface IConstellationData {
	id: number;
	nameTextMapHash: number;
	icon: string;
}

export interface ICostumeData {
	id: number;
	iconName: string;
	sideIconName: string;
	gachaIcon: string;
	nameTextMapHash: number;
}

export interface INamecardData {
	id: number;
	nameTextMapHash: number;
	icon: string;
	navbar?: string;
	banner: string;
}

export interface ISkillData {
	id: number;
	nameTextMapHash: number;
	skillIcon: string;
	/** Absent for skills that can't be levelled (alternate sprints, some passives). */
	proudSkillGroupId?: number;
}

export interface IProfilePictureData {
	// The profilePicture id sent by the game (ProfilePictureExcelConfigData id).
	id: number;
	// The circle icon name, e.g. "UI_AvatarIcon_Hutao_Circle".
	iconName: string;
	nameTextMapHash: number;
}

export type TLocalizationData = Record<string, Record<string, string> | null>;
