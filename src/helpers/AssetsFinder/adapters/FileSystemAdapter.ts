import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import type { IAssetAdapter } from "./types";

export interface IFileSystemAdapterOptions {
	// Directory where the image files are stored. Default is «`{cwd}/.enka-cache/ui`»
	directory?: string;
	// What `resolve` returns: «`{pathPrefix}{filename}{extension}`». Default is the storage `directory` (returns a filesystem path).
	// Set to a public base (e.g. «https://my.site/ui/») when the directory is served over HTTP.
	pathPrefix?: string;
	// The origin from which missing files are downloaded. Default is «https://enka.network/ui/»
	baseUrl?: string;
	// The file extension. Default is «`.png`»
	extension?: string;
	// Whether to return the origin URL while a file is not cached yet (or a download failed). Default is «`true`»
	fallbackToOrigin?: boolean;
}

/**
 * Caches image assets on the local filesystem. On `resolve`:
 * - if the file is already cached, returns a local reference;
 * - otherwise enqueues a deduplicated background download and (by default) returns the
 *   origin URL until the file is available, after which subsequent calls return the
 *   local reference.
 *
 * Downloads are best-effort and never throw out of `resolve`. Use `flush` to await all
 * pending downloads (e.g. to warm the cache before rendering).
 */
export class FileSystemAdapter implements IAssetAdapter {
	directory: string;
	pathPrefix: string;
	baseUrl: string;
	extension: string;
	fallbackToOrigin: boolean;

	private cached = new Set<string>();
	private pending = new Map<string, Promise<void>>();

	constructor({
		directory = path.resolve(process.cwd(), ".enka-cache", "ui"),
		pathPrefix,
		baseUrl = "https://enka.network/ui/",
		extension = ".png",
		fallbackToOrigin = true,
	}: IFileSystemAdapterOptions = {}) {
		this.directory = directory;
		// Default to the storage directory (with a trailing separator) so `resolve` returns a real path.
		this.pathPrefix = pathPrefix ?? `${directory}${path.sep}`;
		this.baseUrl = baseUrl;
		this.extension = extension;
		this.fallbackToOrigin = fallbackToOrigin;

		this.init();
	}

	init() {
		fs.mkdirSync(this.directory, { recursive: true });

		for (const entry of fs.readdirSync(this.directory)) {
			if (entry.endsWith(this.extension))
				this.cached.add(entry.slice(0, -this.extension.length));
		}
	}

	private localRef(filename: string) {
		return `${this.pathPrefix}${filename}${this.extension}`;
	}

	private originUrl(filename: string) {
		return `${this.baseUrl}${filename}${this.extension}`;
	}

	private download(filename: string) {
		const promise = (async () => {
			const res = await fetch(this.originUrl(filename));
			if (!res.ok) throw new Error(`Status ${res.status}`);

			const buffer = Buffer.from(await res.arrayBuffer());
			await fsp.writeFile(
				path.resolve(this.directory, `${filename}${this.extension}`),
				buffer,
			);

			this.cached.add(filename);
		})()
			.catch(() => {
				// Best-effort: leave uncached so it is retried on the next resolve.
			})
			.finally(() => {
				this.pending.delete(filename);
			});

		this.pending.set(filename, promise);
	}

	resolve(filename: string) {
		if (this.cached.has(filename)) return this.localRef(filename);

		if (!this.pending.has(filename)) this.download(filename);

		return this.fallbackToOrigin
			? this.originUrl(filename)
			: this.localRef(filename);
	}

	async flush() {
		await Promise.all(this.pending.values());
	}
}
