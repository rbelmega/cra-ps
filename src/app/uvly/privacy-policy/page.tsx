import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import styles from "./page.module.scss";

const canonicalUrl = "https://www.belmeha.com/uvly/privacy-policy/";

export const metadata: Metadata = {
	title: "UVly Privacy Policy",
	description: "Privacy Policy for UVly, an iOS UV index and forecast app.",
	alternates: {
		canonical: canonicalUrl,
	},
	openGraph: {
		type: "website",
		title: "UVly Privacy Policy",
		description:
			"How UVly handles location, forecast data, widgets, and third-party weather requests.",
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
		title: "No accounts",
		body: "UVly does not ask you to sign in and does not create user profiles.",
	},
	{
		title: "Location is limited",
		body: "Location is requested only while using the app to fetch a local UV forecast.",
	},
	{
		title: "Forecasts are cached locally",
		body: "Recent forecast data is stored on your device and shared locally with widgets.",
	},
	{
		title: "Weather provider can change",
		body: "Forecast requests may use Open-Meteo directly or route through Cloudflare Worker.",
	},
];

const tocItems = [
	["#what-uvly-processes", "What UVly processes"],
	["#how-uvly-uses-data", "How UVly uses data"],
	["#third-party-service", "Third-party service"],
	["#retention-and-deletion", "Retention and deletion"],
	["#your-choices", "Your choices"],
	["#contact", "Contact"],
] as const;

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
	return (
		<a href={href} rel="noopener noreferrer" target="_blank">
			{children}
		</a>
	);
}

export default function UvlyPrivacyPolicyPage() {
	return (
		<div className={styles.page}>
			<a className={styles.skipLink} href="#main-content">
				Skip to main content
			</a>

			<header className={styles.siteHeader}>
				<p className={styles.appName}>UVly</p>
				<h1>Privacy Policy</h1>
				<p className={styles.lede}>
					UVly is a minimal iOS app for current UV index, hourly UV forecast, daily maximum UV, and
					home screen widgets. The app does not use accounts, advertising, or analytics SDKs.
				</p>
				<dl className={styles.policyMeta}>
					<div>
						<dt>Last updated</dt>
						<dd>July 3, 2026</dd>
					</div>
					<div>
						<dt>Developer</dt>
						<dd>Rostyslav Belmeha</dd>
					</div>
				</dl>
			</header>

			<main id="main-content">
				<section className={styles.privacySummary} aria-label="Quick privacy summary">
					{summaryItems.map((item) => (
						<article key={item.title}>
							<span>{item.title}</span>
							<p>{item.body}</p>
						</article>
					))}
				</section>

				<nav className={styles.toc} aria-label="Table of contents">
					{tocItems.map(([href, label]) => (
						<a href={href} key={href}>
							{label}
						</a>
					))}
				</nav>

				<section id="what-uvly-processes">
					<h2>What UVly processes</h2>
					<p>
						With your permission, UVly uses Apple's Core Location framework to access approximate
						latitude and longitude while you use the app. UVly does not request background location.
					</p>
					<p>
						UVly may process and locally store the latest UV forecast, location coordinates,
						location label, timezone, last refresh time, widget cache status, and derived values
						such as hourly UV, daily maximum UV, and the estimated time when UV drops below 3.
					</p>
					<p>
						UVly does not collect your name, email address, phone number, login credentials,
						location history, medical information, advertising identifiers, or analytics profiles
						through the app.
					</p>
				</section>

				<section id="how-uvly-uses-data">
					<h2>How UVly uses data</h2>
					<p>
						UVly uses location and forecast data only to show UV information in the app, refresh
						cached forecasts, support offline viewing, and update small and medium iOS widgets
						through an App Group container on your device.
					</p>
					<p>
						Rostyslav Belmeha does not operate a backend service for UVly user profiles and does not
						sell personal data. The current version of UVly does not include third-party advertising
						SDKs or third-party analytics SDKs.
					</p>
				</section>

				<section id="third-party-service">
					<h2>Third-party service</h2>
					<p>
						UVly retrieves forecast data either directly from Open-Meteo or through a Cloudflare
						Worker operated for UVly. The Worker may route forecast requests to Open-Meteo or
						WeatherAPI depending on the active provider configuration.
					</p>
					<p>
						Forecast requests may include latitude, longitude, timezone, and standard technical
						request information such as IP address. Cloudflare, Open-Meteo, and WeatherAPI process
						information under their own privacy practices.
					</p>
					<p>
						Review provider policies:{" "}
						<ExternalLink href="https://open-meteo.com/en/terms">Open-Meteo</ExternalLink>,{" "}
						<ExternalLink href="https://www.weatherapi.com/privacy.aspx">WeatherAPI</ExternalLink>,
						and{" "}
						<ExternalLink href="https://www.cloudflare.com/privacypolicy/">Cloudflare</ExternalLink>
						.
					</p>
				</section>

				<section id="retention-and-deletion">
					<h2>Retention and deletion</h2>
					<p>
						Forecast and location-related cache data remains on your device until it is replaced by
						a newer forecast, removed by iOS, or deleted when you delete the app. Widget data stored
						in the App Group container is removed when the app and its widget data are removed from
						your device.
					</p>
					<p>
						Rostyslav Belmeha does not keep a separate cloud copy of your UVly location or forecast
						history. Data sent to Cloudflare, Open-Meteo, or WeatherAPI is retained according to
						those providers' own practices.
					</p>
				</section>

				<section id="your-choices">
					<h2>Your choices</h2>
					<ul>
						<li>
							Allow, deny, or revoke location permission in iOS Settings &gt; Privacy &amp; Security
							&gt; Location Services &gt; UVly.
						</li>
						<li>
							Use UVly without fresh location-based forecasts if location permission is denied,
							depending on cached data.
						</li>
						<li>Remove UVly widgets from your home screen if you no longer want widgets.</li>
						<li>Delete the app from your device to delete locally stored forecast/cache data.</li>
						<li>Contact us with privacy questions or deletion requests using the email below.</li>
					</ul>
				</section>

				<section id="childrens-privacy">
					<h2>Children's Privacy</h2>
					<p>
						UVly is a general-purpose informational app and is not directed to children as a
						specialized children's service. UVly does not offer accounts or knowingly collect
						personal information from children through registration.
					</p>
				</section>

				<section id="changes">
					<h2>Changes</h2>
					<p>
						We may update this Privacy Policy when UVly changes or when legal, platform, or App
						Store requirements change. The "Last updated" date will be revised when changes are
						posted.
					</p>
				</section>

				<section id="contact">
					<h2>Contact</h2>
					<p>
						For questions about this Privacy Policy or UVly's privacy practices, contact Rostyslav
						Belmeha at <a href="mailto:belmega31@gmail.com">belmega31@gmail.com</a>.
					</p>
				</section>
			</main>
		</div>
	);
}
