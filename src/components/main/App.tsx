import localFont from "next/font/local";
import { Header } from "../header";
import { Body } from "../body";

const bodyFont = localFont({
	src: "../../../public/assets/fonts/myriad-set-pro_text.ttf",
	display: "swap",
	weight: "400",
	fallback: ["Arial", "sans-serif"],
	adjustFontFallback: "Arial",
});

export function App() {
	return (
		<div className={`main-app ${bodyFont.className}`}>
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
