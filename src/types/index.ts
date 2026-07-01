export * from "./assets";
export * from "./parseDatas";
export * from "./responses";

export type TLanguage =
	| "CHS"
	| "CHT"
	| "DE"
	| "EN"
	| "ES"
	| "FR"
	| "ID"
	| "IT"
	| "JP"
	| "KR"
	| "PT"
	| "RU"
	| "TH"
	| "TR"
	| "VI";

export interface IAssetsUpdaterParams {
	// Array of languages with localization. Already contains enkaNetwork.language value
	languages?: TLanguage[];
	// The interval for checking the relevance of assets in **`ms`**. Default is 30 * 60 * 1000 (half hour)
	checkInterval?: number | false;
	// Check immediately for the first time
	instant?: boolean;
	// Force the initial fetch to rebuild assets even if the update guard thinks
	// they are current (e.g. after switching data sources). Applies to the
	// `instant` run; interval runs stay guarded.
	force?: boolean;
}
