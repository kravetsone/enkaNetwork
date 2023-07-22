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
            Object.entries(this.data)
                .filter(([_, value]) => value!.expiredAt < Date.now())
                .forEach(([key]) => {
                    delete this.data[key];
                });
        }, checkPeriod * 1000);
    }

    async set(key: string, data: unknown, ttl: number) {
        this.data[key] = { data, expiredAt: Date.now() + ttl * 1000 };
    }

    async get<T>(key: string): Promise<T | null> {
        const storageKey = this.data[key];

        if (!storageKey || storageKey.expiredAt < Date.now()) return null;

        return storageKey.data as T;
    }
}
