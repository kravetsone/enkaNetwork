import { DataManager, LocalizationManager } from "../AssetsManager";
import { CharacterFinder } from "./CharacterFinder";
import { ConstellationFinder } from "./ConstellationFinder";
import { CostumeFinder } from "./CostumeFinder";
import { NamecardFinder } from "./NamecardFinder";
import { ReliquaryFinder } from "./ReliquaryFinder";
import { ReliquarySetFinder } from "./ReliquarySetFinder";
import { SkillFinder } from "./SkillFinder";
import { WeaponFinder } from "./WeaponFinder";

export * from "./CharacterFinder";
export * from "./NamecardFinder";
export * from "./WeaponFinder";

export class AssetsFinder {
	private data: DataManager;
	private localization: LocalizationManager;
	uiAssetsPath: string;
	characters: CharacterFinder;
	namecards: NamecardFinder;
	costumes: CostumeFinder;
	weapons: WeaponFinder;
	reliquaries: ReliquaryFinder;
	reliquarySets: ReliquarySetFinder;
	constellations: ConstellationFinder;
	skills: SkillFinder;

	constructor({
		uiAssetsPath = "https://enka.network/ui/",
		dataManager = new DataManager(),
		localizationManager = new LocalizationManager(),
	}: {
		uiAssetsPath?: string;
		dataManager?: DataManager;
		localizationManager?: LocalizationManager;
	} = {}) {
		this.uiAssetsPath = uiAssetsPath;

		this.data = dataManager;
		this.localization = localizationManager;

		this.characters = new CharacterFinder(
			dataManager.characters,
			localizationManager.characters,
		);
		this.namecards = new NamecardFinder(
			dataManager.namecards,
			localizationManager.namecards,
		);
		this.constellations = new ConstellationFinder(
			dataManager.constellations,
			localizationManager.constellations,
		);
		this.skills = new SkillFinder(
			dataManager.skills,
			localizationManager.skills,
		);
		this.costumes = new CostumeFinder(
			dataManager.costumes,
			localizationManager.costumes,
		);
		this.weapons = new WeaponFinder(localizationManager.weapons);
		this.reliquaries = new ReliquaryFinder(localizationManager.reliquary);
		this.reliquarySets = new ReliquarySetFinder(
			localizationManager.reliquarySets,
		);
	}

	getAssetPath(filename: string) {
		return `${this.uiAssetsPath}${filename}.png`;
	}
}
