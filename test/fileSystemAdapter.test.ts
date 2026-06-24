import { describe, expect, test } from "bun:test";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import { FileSystemAdapter } from "../src/helpers/AssetsFinder/adapters/FileSystemAdapter";

const tmp = () => fs.mkdtempSync(path.join(os.tmpdir(), "enka-fsa-"));

describe("FileSystemAdapter", () => {
	test("uncached resolve falls back to origin url", () => {
		const adapter = new FileSystemAdapter({
			directory: tmp(),
			baseUrl: "https://example.invalid/ui/",
		});
		expect(adapter.resolve("Foo")).toBe("https://example.invalid/ui/Foo.png");
	});

	test("already-cached file resolves to a local path", () => {
		const dir = tmp();
		fs.writeFileSync(path.join(dir, "Seeded.png"), "x");
		const adapter = new FileSystemAdapter({ directory: dir });
		expect(adapter.resolve("Seeded")).toBe(path.join(dir, "Seeded.png"));
	});

	test("pathPrefix controls the returned reference", () => {
		const dir = tmp();
		fs.writeFileSync(path.join(dir, "Seeded.png"), "x");
		const adapter = new FileSystemAdapter({
			directory: dir,
			pathPrefix: "https://cdn.example/ui/",
		});
		expect(adapter.resolve("Seeded")).toBe("https://cdn.example/ui/Seeded.png");
	});

	test("respects concurrency cap and sends the configured User-Agent", async () => {
		const dir = tmp();
		let current = 0;
		let max = 0;
		const userAgents: (string | undefined)[] = [];

		const server = http.createServer((req, res) => {
			userAgents.push(req.headers["user-agent"]);
			current++;
			max = Math.max(max, current);
			setTimeout(() => {
				current--;
				res.end("png");
			}, 30);
		});
		await new Promise<void>((r) => server.listen(0, () => r()));
		const port = (server.address() as { port: number }).port;

		const adapter = new FileSystemAdapter({
			directory: dir,
			baseUrl: `http://127.0.0.1:${port}/`,
			userAgent: "ua-test",
			concurrency: 3,
		});

		for (let i = 0; i < 10; i++) adapter.resolve(`Icon_${i}`);
		await adapter.flush();
		server.close();

		expect(max).toBeGreaterThan(0);
		expect(max).toBeLessThanOrEqual(3);
		expect(userAgents).toHaveLength(10);
		expect(userAgents.every((ua) => ua === "ua-test")).toBe(true);
		expect(fs.existsSync(path.join(dir, "Icon_0.png"))).toBe(true);
		// once cached, subsequent resolve returns the local path
		expect(adapter.resolve("Icon_0")).toBe(path.join(dir, "Icon_0.png"));
	});
});
