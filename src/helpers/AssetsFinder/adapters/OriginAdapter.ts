import type { IAssetAdapter } from "./types";

export interface IOriginAdapterOptions {
	// The path to which the «`{filename}{extension}`» string will be added. Default is «https://enka.network/ui/»
	baseUrl?: string;
	// The extension appended to the filename. Default is «`.png`»
	extension?: string;
}

/**
 * Default adapter. Resolves a filename to a remote URL on the origin, without any
 * caching. Reproduces the historical `getAssetPath` behavior.
 */
export class OriginAdapter implements IAssetAdapter {
	baseUrl: string;
	extension: string;

	constructor({
		baseUrl = "https://enka.network/ui/",
		extension = ".png",
	}: IOriginAdapterOptions = {}) {
		this.baseUrl = baseUrl;
		this.extension = extension;
	}

	resolve(filename: string) {
		return `${this.baseUrl}${filename}${this.extension}`;
	}
}
