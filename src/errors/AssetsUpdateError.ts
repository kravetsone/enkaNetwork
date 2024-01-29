export class AssetsUpdateError extends Error {
	// biome-ignore lint/suspicious/noExplicitAny: unknown fetch error
	data: any;
	url: string;

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	constructor(url: string, data: any) {
		super();

		this.data = data;
		this.url = url;
		this.message = "Some error occurred in assets updater";
	}
}
