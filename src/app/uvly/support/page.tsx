import type { Metadata, Viewport } from "next";

import styles from "../privacy-policy/page.module.scss";

const canonicalUrl = "https://www.belmeha.com/uvly/support/";
const supportEmail = "belmega31@gmail.com";
const supportMailto = "mailto:belmega31@gmail.com?subject=UVly%20Support";

export const metadata: Metadata = {
	title: "UVly Support",
	description: "Support page for UVly, an iOS UV index and forecast app.",
	alternates: {
		canonical: canonicalUrl,
	},
	openGraph: {
		type: "website",
		title: "UVly Support",
		description: "Get help with UVly forecasts, location permission, widgets, and privacy.",
		url: canonicalUrl,
	},
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#f7f7f8" },
		{ media: "(prefers-color-scheme: dark)", color: "#111315" },
	],
};

const summaryItems = [
	{
		title: "Email support",
		body: "Send UVly questions, issue reports, and privacy requests by email.",
	},
	{
		title: "Location help",
		body: "Most forecast issues are related to iOS Location Services or network access.",
	},
	{
		title: "Widget support",
		body: "UVly widgets use locally cached forecast data from the app.",
	},
	{
		title: "Privacy details",
		body: "UVly has a separate Privacy Policy for data handling and providers.",
	},
];

const tocItems = [
	["#contact-support", "Contact support"],
	["#before-contacting", "Before contacting"],
	["#troubleshooting", "Troubleshooting"],
	["#privacy", "Privacy"],
] as const;

export default function UvlySupportPage() {
	return (
		<div className={styles.page}>
			<a className={styles.skipLink} href="#main-content">
				Skip to main content
			</a>

			<header className={styles.siteHeader}>
				<p className={styles.appName}>UVly</p>
				<h1>Support</h1>
				<p className={styles.lede}>
					Help for UVly, an iOS app for current UV index, hourly UV forecast, daily maximum UV, and
					home screen widgets.
				</p>
				<dl className={styles.policyMeta}>
					<div>
						<dt>Last updated</dt>
						<dd>July 3, 2026</dd>
					</div>
					<div>
						<dt>Contact</dt>
						<dd>
							<a href={supportMailto}>{supportEmail}</a>
						</dd>
					</div>
				</dl>
			</header>

			<main id="main-content">
				<section className={styles.privacySummary} aria-label="Support summary">
					{summaryItems.map((item) => (
						<article key={item.title}>
							<span>{item.title}</span>
							<p>{item.body}</p>
						</article>
					))}
				</section>

				<nav className={styles.toc} aria-label="Support topics">
					{tocItems.map(([href, label]) => (
						<a href={href} key={href}>
							{label}
						</a>
					))}
				</nav>

				<section id="contact-support">
					<h2>Contact support</h2>
					<p>
						For UVly support, email <a href={supportMailto}>{supportEmail}</a>. Use this address for
						app questions, issue reports, App Store support requests, and privacy questions.
					</p>
				</section>

				<section id="before-contacting">
					<h2>Before contacting</h2>
					<p>
						To help reproduce a problem, include your device model, iOS version, UVly app version,
						the approximate time the issue happened, and whether the issue affects forecast data,
						widgets, or location permission.
					</p>
				</section>

				<section id="troubleshooting">
					<h2>Troubleshooting</h2>
					<ul>
						<li>
							Check iOS Settings &gt; Privacy &amp; Security &gt; Location Services &gt; UVly if the
							forecast is not local to your area.
						</li>
						<li>Open UVly on a stable network and refresh the forecast.</li>
						<li>
							If widgets look stale, open the app once, then remove and add the widget again if iOS
							does not refresh it.
						</li>
						<li>
							If forecast data looks unavailable, try again later because weather providers may
							temporarily reject or delay requests.
						</li>
					</ul>
				</section>

				<section id="privacy">
					<h2>Privacy</h2>
					<p>
						UVly support emails are used only to understand and respond to your request. For details
						about location, forecast requests, WeatherAPI, Open-Meteo, Cloudflare, and local widget
						cache data, review the <a href="/uvly/privacy-policy/">Privacy Policy</a>.
					</p>
				</section>
			</main>
		</div>
	);
}
