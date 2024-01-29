export class AssetsUpdateError extends Error {
	// biome-ignore lint/suspicious/noExplicitAny: unknown fetch error
	data: any;

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	constructor(data: any) {
		super();
		this.data = data;
		this.message = "Some error occurred in assets updater";
	}
}
