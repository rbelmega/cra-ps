import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const modernBrowserPolyfill = "./src/polyfills/modern-browser-only.js";
const modernBrowserPolyfillAbsolute = path.join(
	projectRoot,
	"src/polyfills/modern-browser-only.js",
);

const nextConfig: NextConfig = {
	productionBrowserSourceMaps: false,
	experimental: {
		inlineCss: true,
	},
	turbopack: {
		resolveAlias: {
			"../build/polyfills/polyfill-module": modernBrowserPolyfill,
		},
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
	webpack(config, { isServer }) {
		if (!isServer) {
			config.resolve.alias = {
				...config.resolve.alias,
				"../build/polyfills/polyfill-module": modernBrowserPolyfillAbsolute,
			};
		}

		return config;
	},
};

export default nextConfig;
