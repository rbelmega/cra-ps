import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const origin = "https://www.belmeha.com";
const readPage = (path) => readFile(`.next/server/app/${path}.html`, "utf8");
const tag = (html, attribute, value) =>
	html.match(new RegExp(`<[^>]+${attribute}="${value}"[^>]*>`))?.[0] ?? "";

test("built homepage has canonical, social previews, and a truthful author profile", async () => {
	const html = await readPage("index");
	assert.equal(
		new URL(tag(html, "rel", "canonical").match(/href="([^"]+)"/)?.[1]).href,
		`${origin}/`,
	);
	assert.ok(tag(html, "property", "og:image").includes(`${origin}/social-preview`));
	assert.ok(tag(html, "name", "twitter:card").includes("summary_large_image"));
	assert.ok(!tag(html, "name", "description").includes("SoftServe"));
	const json = html.match(/<script[^>]+type="application\/ld\+json"[^>]*>(.*?)<\/script>/s)?.[1];
	assert.ok(json, "profile JSON-LD must be present in server HTML");
	const profile = JSON.parse(json);
	assert.equal(profile["@type"], "ProfilePage");
	assert.equal(profile.mainEntity["@type"], "Person");
	assert.equal(profile.mainEntity.name, "Rostyslav Belmeha");
	assert.ok(profile.mainEntity.sameAs.includes("https://github.com/rbelmega"));
	assert.equal(profile.mainEntity.worksFor, undefined);
});

test("every built article has its own title, description, canonical and social metadata", async () => {
	const posts = JSON.parse(await readFile("public/posts.json", "utf8"));
	for (const post of posts) {
		const html = await readPage(`blog/${post.slug}`);
		assert.ok(html.includes(`<title>${post.name} | Rostyslav Belmeha</title>`), post.slug);
		assert.ok(tag(html, "name", "description").includes(post.excerpt), post.slug);
		assert.ok(tag(html, "rel", "canonical").includes(`${origin}/blog/${post.slug}`));
		assert.ok(tag(html, "property", "og:type").includes('content="article"'));
		assert.ok(tag(html, "property", "og:title").includes(post.name));
		const imageUrl = `${origin}/blog/${post.slug}/social-preview`;
		assert.ok(tag(html, "property", "og:image").includes(imageUrl), post.slug);
		assert.ok(tag(html, "name", "twitter:image").includes(imageUrl), post.slug);
		const png = await readFile(`.next/server/app/blog/${post.slug}/social-preview.body`);
		assert.equal(png.subarray(1, 4).toString(), "PNG");
		assert.equal(png.readUInt32BE(16), 1200);
		assert.equal(png.readUInt32BE(20), 630);
	}
});

test("server HTML declares the language of each page", async () => {
	for (const [path, language] of [
		["index", "en"],
		["traffic-rules", "uk"],
		["traffic-rules/support", "en"],
		["traffic-rules/privacy-policy", "en"],
	]) {
		const html = await readPage(path);
		assert.ok(tag(html, "lang", language).startsWith("<html"), `${path}: expected ${language}`);
	}
});

test("global 404 renders the site design and current fallback metadata on the server", async () => {
	const html = await readPage("_not-found");
	assert.ok(tag(html, "lang", "en").startsWith("<html"));
	assert.ok(html.includes("Page not found."));
	assert.ok(tag(html, "name", "robots").includes("noindex"));
	assert.ok(tag(html, "name", "description").includes("AI-assisted development workflows"));
	assert.ok(!html.includes("Business Intelligence"));
});

test("sitemap contains only built canonical pages and robots advertises it", async () => {
	const xml = await readFile(".next/server/app/sitemap.xml.body", "utf8");
	const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
	assert.ok(urls.includes(`${origin}/`));
	assert.ok(urls.includes(`${origin}/traffic-rules`));
	assert.equal(new Set(urls).size, urls.length);
	assert.equal(urls.length, 13);
	for (const url of urls) {
		assert.ok(url.startsWith(`${origin}/`));
		const path = new URL(url).pathname;
		assert.ok(!/^\/(homa|uvly|idiomate)\/?$/.test(path), "exclude redirect-only pages");
		const html = await readPage(path === "/" ? "index" : path.slice(1));
		assert.equal(new URL(tag(html, "rel", "canonical").match(/href="([^"]+)"/)?.[1]).href, url);
	}
	const robots = await readFile(".next/server/app/robots.txt.body", "utf8");
	assert.ok(robots.includes("User-Agent: *"));
	assert.ok(robots.includes("Allow: /"));
	assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
});

test("social preview builds to an actual 1200 by 630 PNG", async () => {
	const png = await readFile(".next/server/app/social-preview.body");
	assert.equal(png.subarray(1, 4).toString(), "PNG");
	assert.equal(png.readUInt32BE(16), 1200);
	assert.equal(png.readUInt32BE(20), 630);
});

test("legacy article redirects are resolved before page rendering", async () => {
	const posts = JSON.parse(await readFile("public/posts.json", "utf8"));
	const manifest = JSON.parse(await readFile(".next/routes-manifest.json", "utf8"));
	for (const post of posts) {
		const redirect = manifest.redirects.find((entry) => entry.source === `/blog/${post.id}`);
		assert.equal(redirect?.destination, `/blog/${post.slug}`);
		assert.equal(redirect?.statusCode, 308);
	}
});
