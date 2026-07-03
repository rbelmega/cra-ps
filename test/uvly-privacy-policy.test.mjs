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

test("UVLY privacy policy is rendered by Next.js instead of static HTML", async () => {
	assert.equal(await pathExists("src/app/uvly/privacy-policy/page.tsx"), true);
	assert.equal(await pathExists("src/app/uvly/privacy-policy/page.module.scss"), true);
	assert.equal(await pathExists("src/app/uvly/privacy-policy/route.ts"), false);
	assert.equal(await pathExists("public/uvly/privacy-policy/index.html"), false);
	assert.equal(await pathExists("public/uvly/privacy-policy/styles.css"), false);
});

test("UVLY privacy policy includes route metadata", async () => {
	const page = await readFile("src/app/uvly/privacy-policy/page.tsx", "utf8");

	assert.ok(page.includes("export const metadata"));
	assert.ok(page.includes("UVly Privacy Policy"));
	assert.ok(page.includes("https://www.belmeha.com/uvly/privacy-policy/"));
	assert.ok(page.includes("export const viewport"));
});

test("UVLY privacy policy stays compact", async () => {
	const page = await readFile("src/app/uvly/privacy-policy/page.tsx", "utf8");
	const css = await readFile("src/app/uvly/privacy-policy/page.module.scss", "utf8");

	assert.ok(page.split("\n").length <= 260, "privacy policy component should stay concise");
	assert.ok(css.split("\n").length <= 280, "privacy policy CSS module should stay concise");
	assert.ok(page.includes("styles.privacySummary"), "summary grid should be present");
});

test("UVLY privacy policy includes Apple-required privacy topics", async () => {
	const page = await readFile("src/app/uvly/privacy-policy/page.tsx", "utf8");
	const normalizedPage = page.replace(/\s+/g, " ");
	const lowercasePage = normalizedPage.toLowerCase();

	for (const requiredText of [
		"What UVly processes",
		"How UVly uses data",
		"Third-party service",
		"Retention and deletion",
		"Your choices",
		"Contact",
		"Open-Meteo",
		"WeatherAPI",
		"Cloudflare Worker",
		"Location Services",
		"https://www.weatherapi.com/privacy.aspx",
		"https://www.cloudflare.com/privacypolicy/",
		"mailto:belmega31@gmail.com",
	]) {
		assert.ok(
			normalizedPage.includes(requiredText),
			`Missing required policy topic: ${requiredText}`,
		);
	}

	assert.ok(lowercasePage.includes("delete the app"), "Missing delete the app wording");
});

test("UVLY privacy policy describes provider routing without exposing switch states", async () => {
	const page = await readFile("src/app/uvly/privacy-policy/page.tsx", "utf8");
	const normalizedPage = page.replace(/\s+/g, " ");

	assert.ok(normalizedPage.includes("directly from Open-Meteo"));
	assert.ok(normalizedPage.includes("through a Cloudflare Worker"));
	assert.ok(normalizedPage.includes("Open-Meteo or WeatherAPI"));
	assert.equal(page.includes("feature flag"), false);
	assert.equal(page.includes("3 states"), false);
});

test("UVLY support page is available as a Next.js route", async () => {
	assert.equal(await pathExists("src/app/uvly/support/page.tsx"), true);
});

test("UVLY support page includes route metadata", async () => {
	const page = await readFile("src/app/uvly/support/page.tsx", "utf8");

	assert.ok(page.includes("export const metadata"));
	assert.ok(page.includes("UVly Support"));
	assert.ok(page.includes("https://www.belmeha.com/uvly/support/"));
	assert.ok(page.includes("export const viewport"));
});

test("UVLY support page includes App Store support topics", async () => {
	const page = await readFile("src/app/uvly/support/page.tsx", "utf8");
	const normalizedPage = page.replace(/\s+/g, " ");

	for (const requiredText of [
		"Contact support",
		"mailto:belmega31@gmail.com",
		"Privacy Policy",
		"/uvly/privacy-policy/",
		"Location Services",
		"widgets",
		"device model",
		"iOS version",
		"forecast",
	]) {
		assert.ok(
			normalizedPage.includes(requiredText),
			`Missing required support topic: ${requiredText}`,
		);
	}
});
