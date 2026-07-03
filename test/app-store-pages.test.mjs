import { access, readFile } from "node:fs/promises";
import { test } from "node:test";
import assert from "node:assert/strict";

async function pathExists(path) {
	try {
		await access(path);
		return true;
	} catch {
		return false;
	}
}

const appRoutes = [
	{
		app: "Homa",
		slug: "homa",
		privacyTopics: ["Homa Privacy Policy", "tasks", "reminders", "zones", "No analytics"],
		supportTopics: ["Homa Support", "tasks", "reminders", "device model", "iOS version"],
	},
	{
		app: "IdioMate",
		slug: "idiomate",
		privacyTopics: ["IdioMate Privacy Policy", "learning", "progress", "No accounts"],
		supportTopics: ["IdioMate Support", "learning", "practice", "device model", "iOS version"],
	},
];

test("Homa and IdioMate app pages are React routes instead of markdown loaders", async () => {
	for (const { slug } of appRoutes) {
		for (const route of ["", "/privacy-policy", "/support"]) {
			const filePath = `src/app/${slug}${route}/page.tsx`;
			const page = await readFile(filePath, "utf8");

			assert.equal(page.includes("MarkdownPage"), false, `${filePath} still renders MarkdownPage`);
			assert.equal(page.includes("loadPublicText"), false, `${filePath} still loads public text`);
			assert.equal(page.includes(".md"), false, `${filePath} still references markdown`);
		}
	}
});

test("Homa and IdioMate app-specific markdown sources are removed", async () => {
	for (const filePath of [
		"public/privacy_policy_homa.md",
		"public/support_homa.md",
		"public/privacy_policy_idiomate.md",
		"public/support_idiomate.md",
	]) {
		assert.equal(await pathExists(filePath), false, `${filePath} should not remain as a source`);
	}
});

test("Homa and IdioMate privacy pages include metadata and required topics", async () => {
	for (const { app, slug, privacyTopics } of appRoutes) {
		const page = await readFile(`src/app/${slug}/privacy-policy/page.tsx`, "utf8");
		const normalizedPage = page.replace(/\s+/g, " ");

		assert.ok(page.includes("export const metadata"));
		assert.ok(page.includes("export const viewport"));
		assert.ok(page.includes(`https://www.belmeha.com/${slug}/privacy-policy/`));

		for (const topic of [
			...privacyTopics,
			"Data stored on your device",
			"Data deletion",
			"mailto:belmega31@gmail.com",
		]) {
			assert.ok(normalizedPage.includes(topic), `${app} privacy page missing ${topic}`);
		}
	}
});

test("Homa and IdioMate support pages include metadata and App Store support topics", async () => {
	for (const { app, slug, supportTopics } of appRoutes) {
		const page = await readFile(`src/app/${slug}/support/page.tsx`, "utf8");
		const normalizedPage = page.replace(/\s+/g, " ");

		assert.ok(page.includes("export const metadata"));
		assert.ok(page.includes("export const viewport"));
		assert.ok(page.includes(`https://www.belmeha.com/${slug}/support/`));
		assert.ok(page.includes(`/${slug}/privacy-policy/`));

		for (const topic of [...supportTopics, "Contact support", "mailto:belmega31@gmail.com"]) {
			assert.ok(normalizedPage.includes(topic), `${app} support page missing ${topic}`);
		}
	}
});
