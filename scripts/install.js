const {
    LocalizationManager,
    DataManager,
    AssetsUpdater,
} = require("../dist/helpers");

const languagesString = process.env.npm_config_languages;
const languages = languagesString?.length ? languagesString.split(",") : ["EN"];

const updater = new AssetsUpdater(
    {
        languages,
        checkInterval: false,
    },
    new DataManager(),
    new LocalizationManager(),
);
console.log(
    `[ASSETS] Download assets and localization for ${languages.join(", ")}`,
);
updater
    .fetchAssets()
    .then(() =>
        console.log("[ASSETS] Assets and localization has been downloaded!"),
    );
