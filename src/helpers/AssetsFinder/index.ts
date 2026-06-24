import { DataManager, LocalizationManager } from "../AssetsManager";
import { CharacterFinder } from "./CharacterFinder";
import { ConstellationFinder } from "./ConstellationFinder";
import { CostumeFinder } from "./CostumeFinder";
import { NamecardFinder } from "./NamecardFinder";
import { ProfilePictureFinder } from "./ProfilePictureFinder";
import { ReliquaryFinder } from "./ReliquaryFinder";
import { ReliquarySetFinder } from "./ReliquarySetFinder";
import { SkillFinder } from "./SkillFinder";
import { WeaponFinder } from "./WeaponFinder";
import { type IAssetAdapter, OriginAdapter } from "./adapters";

export * from "./adapters";
export * from "./CharacterFinder";
export * from "./NamecardFinder";
export * from "./WeaponFinder";

export class AssetsFinder {
	private data: DataManager;
	private localization: LocalizationManager;
	adapter: IAssetAdapter;
	characters: CharacterFinder;
	namecards: NamecardFinder;
	costumes: CostumeFinder;
	weapons: WeaponFinder;
	reliquaries: ReliquaryFinder;
	reliquarySets: ReliquarySetFinder;
	constellations: ConstellationFinder;
	skills: SkillFinder;
	profilePictures: ProfilePictureFinder;

	constructor({
		uiAssetsPath,
		adapter,
		dataManager = new DataManager(),
		localizationManager = new LocalizationManager(),
	}: {
		// @deprecated Use `adapter` (OriginAdapter) instead. Kept for backward compatibility.
		uiAssetsPath?: string;
		// Strategy that resolves (and optionally caches) image asset filenames. Default is an OriginAdapter.
		adapter?: IAssetAdapter;
		dataManager?: DataManager;
		localizationManager?: LocalizationManager;
	} = {}) {
		this.adapter = adapter ?? new OriginAdapter({ baseUrl: uiAssetsPath });

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
		this.profilePictures = new ProfilePictureFinder(
			dataManager.profilePictures,
			localizationManager.profilePictures,
		);
	}

	getAssetPath(filename: string) {
		return this.adapter.resolve(filename);
	}

	/** Await any in-flight background work in the adapter (e.g. cache downloads). */
	async flush() {
		await this.adapter.flush?.();
	}

	/** Resolve the given filenames (triggering caching) and await completion. */
	async prefetch(filenames: string[]) {
		for (const filename of filenames) this.adapter.resolve(filename);
		await this.flush();
	}
}
