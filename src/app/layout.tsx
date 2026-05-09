import type { ReactNode } from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteAnalytics } from "../components/site-analytics/SiteAnalytics";

import "../index.scss";

interface RootLayoutProps {
	children: ReactNode;
}

export const metadata: Metadata = {
	title: "Rostyslav Belmeha",
	description: "Experienced Web Developer | Expertise in UI Frameworks and Business Intelligence",
};

const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_V4;
const isProduction = process.env.NODE_ENV === "production";
const hasValidGoogleAnalyticsId = /^G-[A-Z0-9]+$/i.test(googleAnalyticsId ?? "");
const enableVercelAnalytics = process.env.NEXT_PUBLIC_ENABLE_VERCEL_ANALYTICS === "true";
const enableVercelSpeedInsights = process.env.NEXT_PUBLIC_ENABLE_VERCEL_SPEED_INSIGHTS === "true";
const shouldLoadAnalytics =
	isProduction && (hasValidGoogleAnalyticsId || enableVercelAnalytics || enableVercelSpeedInsights);

const myriad = localFont({
	src: "../../public/assets/fonts/myriad-set-pro_thin.ttf",
	variable: "--font-myriad",
	display: "swap",
	fallback: ["Arial", "sans-serif"],
	adjustFontFallback: "Arial",
	preload: true,
	declarations: [
		{ prop: "ascent-override", value: "85%" },
		{ prop: "descent-override", value: "15%" },
		{ prop: "line-gap-override", value: "0%" },
	],
});

const myriadMedium = localFont({
	src: "../../public/assets/fonts/myriad-set-pro_medium.ttf",
	variable: "--font-myriad-md",
	display: "swap",
	fallback: ["Arial", "sans-serif"],
	adjustFontFallback: "Arial",
	preload: true,
	declarations: [
		{ prop: "ascent-override", value: "85%" },
		{ prop: "descent-override", value: "15%" },
		{ prop: "line-gap-override", value: "0%" },
	],
});

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en" className={`${myriad.variable} ${myriadMedium.variable}`}>
			<body>
				{children}
				{shouldLoadAnalytics ? (
					<SiteAnalytics
						googleAnalyticsId={hasValidGoogleAnalyticsId ? googleAnalyticsId : undefined}
						enableVercelAnalytics={enableVercelAnalytics}
						enableVercelSpeedInsights={enableVercelSpeedInsights}
					/>
				) : null}
			</body>
		</html>
	);
}
