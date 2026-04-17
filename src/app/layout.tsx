import type { ReactNode } from "react";
import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

import "../index.scss";

interface RootLayoutProps {
	children: ReactNode;
}

export const metadata: Metadata = {
	title: "Rostyslav Belmeha",
	description: "Experienced Web Developer | Expertise in UI Frameworks and Business Intelligence",
};

const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_V4;

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en">
			<head>
				{/* Preload critical fonts for better performance */}
				<link
					rel="preload"
					href="/assets/fonts/myriad-set-pro_thin.ttf"
					as="font"
					type="font/ttf"
					crossOrigin="anonymous"
				/>
				<link
					rel="preload"
					href="/assets/fonts/myriad-set-pro_medium.ttf"
					as="font"
					type="font/ttf"
					crossOrigin="anonymous"
				/>
			</head>
			<body>
				{children}
				{googleAnalyticsId ? <GoogleAnalytics gaId={googleAnalyticsId} /> : null}
				<SpeedInsights />
				<Analytics />
			</body>
		</html>
	);
}
