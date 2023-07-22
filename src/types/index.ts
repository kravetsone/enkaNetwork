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
    | "JP"
    | "KR"
    | "PT"
    | "RU"
    | "TH"
    | "VI";

export interface IAssetsUpdaterParams {
    // Array of languages with localization. Already contains enkaNetwork.language value
    languages?: TLanguage[];
    // The interval for checking the relevance of assets in **`ms`**. Default is 30 * 60 * 1000 (half hour)
    checkInterval?: number | false;
    // Check immediately for the first time
    instant?: boolean;
}
