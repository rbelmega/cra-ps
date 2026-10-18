import localFont from "next/font/local";
import Script from "next/script";
import type { ReactNode } from "react";

import "../../index.scss";

interface RootLayoutProps {
	children: ReactNode;
	lang: "en" | "uk";
}

const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_V4;
const isProduction = process.env.NODE_ENV === "production";
const hasValidGoogleAnalyticsId = /^G-[A-Z0-9]+$/i.test(googleAnalyticsId ?? "");
const shouldLoadGoogleAnalytics = isProduction && hasValidGoogleAnalyticsId;
const googleAnalyticsScript = `
window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
gtag("js", new Date());
gtag("config", "${googleAnalyticsId}");
`;

const myriad = localFont({
	src: "../../../public/assets/fonts/myriad-set-pro_thin.woff2",
	variable: "--font-myriad",
	display: "swap",
	fallback: ["Arial", "sans-serif"],
	adjustFontFallback: "Arial",
	preload: false,
	declarations: [
		{ prop: "ascent-override", value: "85%" },
		{ prop: "descent-override", value: "15%" },
		{ prop: "line-gap-override", value: "0%" },
	],
});

const myriadMedium = localFont({
	src: "../../../public/assets/fonts/myriad-set-pro_medium.woff2",
	variable: "--font-myriad-md-full",
	display: "swap",
	fallback: ["Arial", "sans-serif"],
	adjustFontFallback: "Arial",
	preload: false,
	declarations: [
		{ prop: "ascent-override", value: "85%" },
		{ prop: "descent-override", value: "15%" },
		{ prop: "line-gap-override", value: "0%" },
	],
});

const myriadMediumLatin = localFont({
	src: "../../../public/assets/fonts/myriad-set-pro_medium-latin.woff2",
	variable: "--font-myriad-md-latin",
	display: "swap",
	adjustFontFallback: false,
	declarations: [
		{
			prop: "unicode-range",
			value: "U+0000-007F,U+00A0,U+00A9,U+00B7,U+2000-206F,U+20AC,U+2122,U+2212,U+FEFF,U+FFFD",
		},
		{ prop: "ascent-override", value: "85%" },
		{ prop: "descent-override", value: "15%" },
		{ prop: "line-gap-override", value: "0%" },
	],
});

export function Document({ children, lang }: RootLayoutProps) {
	return (
		<html
			lang={lang}
			className={`${myriad.variable} ${myriadMediumLatin.variable} ${myriadMedium.variable}`}
		>
			<body>{children}</body>
			{shouldLoadGoogleAnalytics ? (
				<>
					<Script
						id="google-analytics"
						src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
						strategy="lazyOnload"
					/>
					<Script id="google-analytics-init" strategy="afterInteractive">
						{googleAnalyticsScript}
					</Script>
				</>
			) : null}
		</html>
	);
}
