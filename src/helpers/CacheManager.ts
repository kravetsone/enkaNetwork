export class CacheManager {
	data: Record<string, { data: unknown; expiredAt: number } | null>;

	constructor({
		checkPeriod = 20,
	}: {
		//The period in seconds, as a number, used for the automatic delete check interval
		checkPeriod?: number;
	} = {}) {
		this.data = {};

		setInterval(() => {
			for (const [key, value] of Object.entries(this.data)) {
				if (value && Date.now() > value?.expiredAt) {
					delete this.data[key];
				}
			}
		}, checkPeriod * 1000);
	}

	async set(key: string, data: unknown, ttl: number) {
		this.data[key] = { data, expiredAt: Date.now() + ttl * 1000 };
	}

	async get<T>(key: string): Promise<T | null> {
		const storageKey = this.data[key];

		if (!storageKey || Date.now() > storageKey.expiredAt) return null;

		return storageKey.data as T;
	}
}
