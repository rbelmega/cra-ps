import localFont from "next/font/local";
import { Body } from "../body";
import { Header } from "../header";

const bodyFont = localFont({
	src: "../../../public/assets/fonts/myriad-set-pro_text.woff2",
	variable: "--font-myriad-text-full",
	display: "swap",
	weight: "400",
	fallback: ["Arial", "sans-serif"],
	adjustFontFallback: "Arial",
	preload: false,
});

const bodyFontLatin = localFont({
	src: "../../../public/assets/fonts/myriad-set-pro_text-latin.woff2",
	variable: "--font-myriad-text-latin",
	display: "swap",
	weight: "400",
	adjustFontFallback: false,
	declarations: [
		{
			prop: "unicode-range",
			value: "U+0000-007F,U+00A0,U+00A9,U+00B7,U+2000-206F,U+20AC,U+2122,U+2212,U+FEFF,U+FFFD",
		},
	],
});

export function App() {
	return (
		<div className={`main-app ${bodyFontLatin.variable} ${bodyFont.variable}`}>
			<a className="skip-link" href="#main-content">
				Skip to content
			</a>
			<Header />
			<main id="main-content" tabIndex={-1}>
				<Body />
			</main>
		</div>
	);
}
