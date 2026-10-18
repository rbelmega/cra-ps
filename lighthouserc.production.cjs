const { ci } = require("./lighthouserc.cjs");

module.exports = {
	ci: {
		...ci,
		collect: {
			chromePath: ci.collect.chromePath,
			url: ["https://www.belmeha.com/"],
			numberOfRuns: ci.collect.numberOfRuns,
			settings: ci.collect.settings,
		},
		upload: {
			...ci.upload,
			outputDir: "./lighthouse-reports/production",
		},
	},
};
