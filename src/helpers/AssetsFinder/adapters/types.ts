/**
 * An adapter that decides how an image asset filename (e.g. `UI_AvatarIcon_Ambor`)
 * is turned into the final string exposed on models, and optionally how/where it is
 * cached.
 *
 * `resolve` **must be synchronous** because it is called inside synchronous model
 * constructors. Any I/O (downloading, persisting) has to happen out-of-band and be
 * awaitable through `flush`.
 */
export interface IAssetAdapter {
	/** Optional one-time setup (e.g. scanning an existing cache directory). */
	init?(): void | Promise<void>;
	/** Given a bare filename (without extension), return the final string for models. */
	resolve(filename: string): string;
	/** Optional: await any in-flight background work (e.g. downloads). */
	flush?(): Promise<void>;
}
