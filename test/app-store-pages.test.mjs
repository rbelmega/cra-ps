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
		privacyTopics: [
			"Homa Privacy Policy",
			"tasks",
			"reminders",
			"zones",
			"SQLite",
			"photo attachments",
			"No analytics",
		],
		supportTopics: [
			"Homa Support",
			"tasks",
			"reminders",
			"photo attachments",
			"device model",
			"iOS or Android version",
		],
	},
	{
		app: "IdioMate",
		slug: "idiomate",
		privacyTopics: ["IdioMate Privacy Policy", "English idioms", "Ukrainian proverbs", "Favorites"],
		supportTopics: [
			"IdioMate Support",
			"English idioms",
			"Ukrainian translations",
			"Favorites",
			"device model",
			"iOS or Android version",
		],
	},
	{
		app: "Traffic Rules",
		slug: "traffic-rules",
		privacyTopics: [
			"Traffic Rules Privacy Policy",
			"Ukrainian traffic rules",
			"road signs",
			"road markings",
			"traffic controller signals",
			"No personal data collection",
		],
		supportTopics: [
			"Traffic Rules Support",
			"Ukrainian traffic rules",
			"road signs",
			"road markings",
			"traffic controller signals",
			"device model",
			"iOS or Android version",
		],
	},
];

test("app pages are React routes instead of markdown loaders", async () => {
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

test("app privacy pages include metadata and required topics", async () => {
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

test("app support pages include metadata and App Store support topics", async () => {
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

test("Homa pages match the current offline-first maintenance app", async () => {
	const privacyPage = await readFile("src/app/homa/privacy-policy/page.tsx", "utf8");
	const supportPage = await readFile("src/app/homa/support/page.tsx", "utf8");
	const combinedPages = `${privacyPage} ${supportPage}`.replace(/\s+/g, " ");
	const lowerCombinedPages = combinedPages.toLowerCase();

	for (const requiredText of [
		"iOS and Android",
		"offline-first",
		"SQLite",
		"tasks",
		"reminders",
		"zones",
		"devices",
		"task history",
		"photo attachments",
		"photo library",
		"camera",
		"language",
	]) {
		assert.ok(combinedPages.includes(requiredText), `Homa pages missing ${requiredText}`);
	}

	for (const inaccurateText of [
		"iOS home task and reminder app",
		"iOS app for home tasks",
		"iOS version",
		"does not collect names, usernames, email addresses, phone numbers, location data, contacts, photos, media files",
	]) {
		assert.equal(
			lowerCombinedPages.includes(inaccurateText.toLowerCase()),
			false,
			`Homa pages should not contain inaccurate text: ${inaccurateText}`,
		);
	}
});

test("Traffic Rules pages match the current local reference app", async () => {
	const privacyPage = await readFile("src/app/traffic-rules/privacy-policy/page.tsx", "utf8");
	const supportPage = await readFile("src/app/traffic-rules/support/page.tsx", "utf8");
	const combinedPages = `${privacyPage} ${supportPage}`.replace(/\s+/g, " ");
	const lowerCombinedPages = combinedPages.toLowerCase();

	for (const requiredText of [
		"iOS and Android",
		"ПДР 2026",
		"bundled reference content",
		"Ukrainian traffic rules",
		"road signs",
		"road markings",
		"traffic controller signals",
		"local search",
		"No accounts",
		"No analytics",
		"No personal data collection",
	]) {
		assert.ok(combinedPages.includes(requiredText), `Traffic Rules pages missing ${requiredText}`);
	}

	for (const inaccurateText of [
		"cloud sync",
		"location-based",
		"personalized recommendations",
		"ad personalization",
	]) {
		assert.equal(
			lowerCombinedPages.includes(inaccurateText.toLowerCase()),
			false,
			`Traffic Rules pages should not describe ${inaccurateText} as available`,
		);
	}
});

test("IdioMate pages match idiom learning product positioning", async () => {
	const privacyPage = await readFile("src/app/idiomate/privacy-policy/page.tsx", "utf8");
	const supportPage = await readFile("src/app/idiomate/support/page.tsx", "utf8");
	const combinedPages = `${privacyPage} ${supportPage}`.replace(/\s+/g, " ");

	for (const requiredText of [
		"iOS and Android",
		"Ukrainian-speaking users",
		"English idioms",
		"sayings",
		"common expressions",
		"Ukrainian translations",
		"usage examples",
		"Favorites",
		"Ukrainian proverbs",
	]) {
		assert.ok(combinedPages.includes(requiredText), `IdioMate pages missing ${requiredText}`);
	}

	for (const unavailableFeature of [
		"lessons",
		"quizzes",
		"flashcards",
		"curated collections",
		"recently viewed",
		"practice",
		"progress",
		"search",
		"daily idioms",
		"categories",
		"settings",
		"preferences",
	]) {
		assert.equal(
			combinedPages.toLowerCase().includes(unavailableFeature),
			false,
			`IdioMate pages should not describe ${unavailableFeature} as available`,
		);
	}
});
