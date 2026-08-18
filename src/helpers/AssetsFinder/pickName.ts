import { NoLanguageFound } from "../../errors";
import type { TLanguage } from "../../types";

// One warning per missing language per process — enough to notice a misconfigured
// `assets.languages`, not enough to flood a log with one line per rendered name.
const warned = new Set<string>();

/**
 * Resolves a name from an already-found localization entry, degrading to any other
 * language the assets carry instead of throwing.
 *
 * A language the {@link AssetsUpdater} never downloaded used to be fatal *deep inside*
 * model construction (`new PlayerInfo` → `new Namecard`), so one missing name took down
 * the whole `fetchUser` call rather than one label. Falling back keeps the response
 * usable — the misconfiguration is reported through the warning instead.
 *
 * Still throws {@link NoLanguageFound} when the entry holds no name in *any* language.
 */
export function pickName(
	nameLocalizations: Record<string, string>,
	language: TLanguage,
	subject: string,
) {
	const name = nameLocalizations[language];
	if (name) return name;

	const fallback = Object.entries(nameLocalizations).find(([, value]) => value);
	if (!fallback)
		throw new NoLanguageFound(
			`There is no name in any downloaded language for ${subject}! Check the AssetsUpdater settings`,
		);

	if (!warned.has(language)) {
		warned.add(language);
		console.warn(
			`[enkanetwork] "${language}" is not downloaded (first miss: ${subject}) — falling back to "${fallback[0]}". Add it to the AssetsUpdater \`languages\` and let it refetch.`,
		);
	}

	return fallback[1];
}
