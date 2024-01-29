export class NoDataAssetsFound extends Error {
	constructor(message: string) {
		super();
		this.message = message;
	}
}
export class NoLocalizationAssetsFound extends Error {
	constructor(message: string) {
		super();
		this.message = message;
	}
}

export class NoLanguageFound extends Error {
	constructor(message: string) {
		super();
		this.message = message;
	}
}
