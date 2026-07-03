import type { Metadata, Viewport } from "next";

import styles from "../../app-store-page.module.scss";

const canonicalUrl = "https://www.belmeha.com/idiomate/privacy-policy/";
const contactEmail = "belmega31@gmail.com";
const contactMailto = "mailto:belmega31@gmail.com";

export const metadata: Metadata = {
	title: "IdioMate Privacy Policy",
	description:
		"Privacy Policy for IdioMate, an iOS and Android app for English idioms and Ukrainian proverbs.",
	alternates: {
		canonical: canonicalUrl,
	},
	openGraph: {
		type: "website",
		title: "IdioMate Privacy Policy",
		description: "How IdioMate handles Favorites, local app data, and support requests.",
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
		body: "IdioMate does not require account registration or developer-operated profiles.",
	},
	{
		title: "Data stored on your device",
		body: "Favorites are stored locally on your device.",
	},
	{
		title: "No sale of data",
		body: "Rostyslav Belmeha does not sell, rent, or broker IdioMate app data.",
	},
	{
		title: "Data deletion",
		body: "Delete local data by deleting the app from your device.",
	},
];

const tocItems = [
	["#what-idiomate-processes", "What IdioMate processes"],
	["#how-data-is-used", "How data is used"],
	["#third-party-services", "Third-party services"],
	["#data-deletion", "Data deletion"],
	["#contact", "Contact"],
] as const;

export default function IdiomatePrivacyPolicyPage() {
	return (
		<div className={styles.page}>
			<a className={styles.skipLink} href="#main-content">
				Skip to main content
			</a>

			<header className={styles.siteHeader}>
				<p className={styles.appName}>IdioMate</p>
				<h1>Privacy Policy</h1>
				<p className={styles.lede}>
					IdioMate is an iOS and Android app that helps Ukrainian-speaking users discover,
					understand, and learn English idioms, sayings, common expressions, and Ukrainian proverbs.
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

				<section id="what-idiomate-processes">
					<h2>What IdioMate processes</h2>
					<p>
						IdioMate lets you browse English idioms, sayings, common expressions, and Ukrainian
						proverbs, view Ukrainian translations for English idioms, read usage examples, and save
						or remove items in Favorites. Favorites are stored on your device so they remain
						available across app launches.
					</p>
					<p>
						IdioMate does not require you to provide your name, email address, phone number,
						contacts, precise location, payment information, or account credentials to use the core
						app experience.
					</p>
				</section>

				<section id="how-data-is-used">
					<h2>How data is used</h2>
					<p>
						IdioMate uses local app data to remember your Favorites and show favorite status on
						idiom and proverb cards. This helps you save useful expressions and return to them later
						without creating an account.
					</p>
					<p>
						Data stored on your device is not sent to a developer-operated IdioMate account service,
						and Rostyslav Belmeha does not sell or share app data with third-party data brokers.
					</p>
				</section>

				<section id="third-party-services">
					<h2>Third-party services</h2>
					<p>
						The current policy page does not identify active advertising or analytics SDKs for
						IdioMate. If a future version adds diagnostics, analytics, or another third-party
						provider, this Privacy Policy will be updated to describe that provider and the data
						involved.
					</p>
				</section>

				<section id="data-deletion">
					<h2>Data deletion</h2>
					<p>
						You can delete locally stored IdioMate data by deleting the app from your device. If a
						future version adds account or cloud features, this page will describe the corresponding
						deletion controls.
					</p>
				</section>

				<section id="childrens-privacy">
					<h2>Children's Privacy</h2>
					<p>
						IdioMate is a general-purpose language learning app and does not knowingly collect
						personal information from children through account registration.
					</p>
				</section>

				<section id="changes">
					<h2>Changes</h2>
					<p>
						This Privacy Policy may be updated when IdioMate changes or when legal, platform, or App
						Store requirements change. The last updated date will change when updates are posted.
					</p>
				</section>

				<section id="contact">
					<h2>Contact</h2>
					<p>
						For questions about this Privacy Policy, contact Rostyslav Belmeha at{" "}
						<a href={contactMailto}>{contactEmail}</a>.
					</p>
				</section>
			</main>
		</div>
	);
}
