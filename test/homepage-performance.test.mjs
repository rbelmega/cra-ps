import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { test } from "node:test";
import { gzipSync } from "node:zlib";

test("homepage keeps preloaded fonts within a 24 KiB payload budget", async () => {
	const html = await readFile(".next/server/app/index.html", "utf8");
	const fontUrls = [...html.matchAll(/<link\b[^>]*>/g)]
		.map(([tag]) => tag)
		.filter((tag) => /\bas="font"/.test(tag) && /\brel="preload"/.test(tag))
		.map((tag) => tag.match(/\bhref="([^"]+)"/)?.[1]);
	assert.ok(fontUrls.length > 0, "critical fonts must be discoverable in the initial HTML");
	const sizes = await Promise.all(
		[...new Set(fontUrls)].map(async (url) => {
			assert.ok(
				url?.startsWith("/_next/static/media/") || url?.startsWith("/assets/fonts/"),
				"fonts must be served locally",
			);
			const file = url.startsWith("/_next/")
				? `.next/${url.slice("/_next/".length)}`
				: `public${url}`;
			return (await stat(file)).size;
		}),
	);
	const total = sizes.reduce((sum, size) => sum + size, 0);
	assert.ok(total <= 24 * 1024, `preloaded fonts total ${total} bytes; budget is 24576`);
});

test("homepage keeps initial modern-browser JavaScript within a 140 kB gzip budget", async () => {
	const html = await readFile(".next/server/app/index.html", "utf8");
	const scripts = [...html.matchAll(/<script\b[^>]*>/g)]
		.map(([tag]) => tag)
		.filter((tag) => !/\bnoModule\b/i.test(tag))
		.map((tag) => tag.match(/\bsrc="([^"]+)"/)?.[1])
		.filter(Boolean);
	const sizes = await Promise.all(
		[...new Set(scripts)].map(async (url) => {
			assert.ok(url.startsWith("/_next/static/"), "initial scripts must be served locally");
			return gzipSync(await readFile(`.next/${url.slice("/_next/".length)}`)).length;
		}),
	);
	const total = sizes.reduce((sum, size) => sum + size, 0);
	assert.ok(total <= 140000, `initial JavaScript totals ${total} gzip bytes; budget is 140000`);
});
