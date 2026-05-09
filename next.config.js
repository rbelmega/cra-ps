/** @type {import('next').NextConfig} */
const nextConfig = {
	productionBrowserSourceMaps: false,
	experimental: {
		inlineCss: true,
	},
	compiler: {
		// Remove console logs in production
		removeConsole:
			process.env.NODE_ENV === "production"
				? {
						exclude: ["error", "warn"],
					}
				: false,
	},
	images: {
		deviceSizes: [320, 480, 640, 750, 828, 1080, 1200, 1920],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "pbs.twimg.com",
			},
			{
				protocol: "https",
				hostname: "abs.twimg.com",
			},
		],
	},
	async headers() {
		return [
			{
				source: "/assets/:path*",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
				],
			},
		];
	},
};

module.exports = nextConfig;
