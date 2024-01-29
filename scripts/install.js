const fs = require("node:fs/promises");
const fsSync = require("node:fs");
const path = require("node:path");

const languagesString = process.env.npm_config_languages;
const languages = languagesString?.length ? languagesString.split(",") : ["EN"];
const dataFiles = [
	"characters.json",
	"constellations.json",
	"costumes.json",
	"namecards.json",
	"skills.json",
];
const localizationFiles = [
	"characters.json",
	"constellations.json",
	"costumes.json",
	"namecards.json",
	"reliquary.json",
	"reliquarySets.json",
	"skills.json",
	"weapons.json",
];
const cwd = path.dirname(require.main.path);
const assetsPath = path.resolve(cwd, "assets");

async function run() {
	console.log(
		`[ASSETS] Download assets and localization for ${languages.join(", ")}`,
	);

	if (!fsSync.existsSync(assetsPath)) {
		await fs.mkdir(assetsPath);
		await fs.writeFile(
			`${assetsPath}/config.json`,
			JSON.stringify(
				{
					lastUpdate: "1990-12-20T04:40:14.000+00:00",
					languages: [],
				},
				null,
				4,
			),
		);

		await fs.mkdir(`${assetsPath}/data`);
		for await (const name of dataFiles) {
			await fs.writeFile(`${assetsPath}/data/${name}`, "[]");
		}
		await fs.mkdir(`${assetsPath}/localization`);
		for await (const name of localizationFiles) {
			await fs.writeFile(`${assetsPath}/localization/${name}`, "{}");
		}
	}

	const {
		LocalizationManager,
		DataManager,
		AssetsUpdater,
	} = require("../dist/helpers");
	const updater = new AssetsUpdater(
		{
			languages,
			checkInterval: false,
		},
		new DataManager(),
		new LocalizationManager(),
	);
	await updater.fetchAssets();

	console.log("[ASSETS] Assets and localization has been downloaded!");
}

run();
