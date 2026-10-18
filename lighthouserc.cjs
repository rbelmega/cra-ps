const { existsSync, readFileSync } = require("node:fs");
const path = require("node:path");

const browserConfigPath = path.join(__dirname, ".lighthouse-browser.json");
const browserConfig = existsSync(browserConfigPath)
	? JSON.parse(readFileSync(browserConfigPath, "utf8"))
	: {};

module.exports = {
	ci: {
		collect: {
			chromePath: process.env.CHROME_PATH || browserConfig.chromePath,
			startServerCommand: "npm start -- --hostname 127.0.0.1 --port 3001",
			startServerReadyPattern: "Ready in",
			startServerReadyTimeout: 30000,
			url: [
				"http://127.0.0.1:3001/",
				"http://127.0.0.1:3001/blog/cracking-the-pagespeed-code",
				"http://127.0.0.1:3001/traffic-rules",
			],
			numberOfRuns: 3,
			settings: {
				chromeFlags: "--headless",
			},
		},
		assert: {
			assertions: {
				"categories:performance": ["warn", { minScore: 0.9, aggregationMethod: "median" }],
			},
		},
		upload: {
			target: "filesystem",
			outputDir: "./lighthouse-reports/mobile",
			reportFilenamePattern: "%%DATETIME%%-%%PATHNAME%%.report.%%EXTENSION%%",
		},
	},
};
