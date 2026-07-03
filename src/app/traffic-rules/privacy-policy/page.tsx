import type { Metadata, Viewport } from "next";

import styles from "../../app-store-page.module.scss";

const canonicalUrl = "https://www.belmeha.com/traffic-rules/privacy-policy/";
const contactEmail = "belmega31@gmail.com";
const contactMailto = "mailto:belmega31@gmail.com";

export const metadata: Metadata = {
	title: "Traffic Rules Privacy Policy",
	description:
		"Privacy Policy for Traffic Rules, an iOS and Android reference app for Ukrainian traffic rules.",
	alternates: {
		canonical: canonicalUrl,
	},
	openGraph: {
		type: "website",
		title: "Traffic Rules Privacy Policy",
		description:
			"How Traffic Rules handles bundled reference content, local search, and support requests.",
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
		body: "Traffic Rules does not ask you to sign in and does not create user profiles.",
	},
	{
		title: "Data stored on your device",
		body: "Ukrainian traffic rules, road signs, road markings, and traffic controller signals are included in the app.",
	},
	{
		title: "Local search",
		body: "Search works against bundled reference content on your device.",
	},
	{
		title: "No personal data collection",
		body: "Rostyslav Belmeha does not collect personal data through the current Traffic Rules app.",
	},
	{
		title: "No analytics",
		body: "Traffic Rules does not use advertising SDKs, analytics SDKs, or third-party data brokers.",
	},
	{
		title: "Data deletion",
		body: "Delete the app from your iOS or Android device to remove local app data.",
	},
];

const tocItems = [
	["#what-traffic-rules-processes", "What Traffic Rules processes"],
	["#how-data-is-used", "How data is used"],
	["#third-party-services", "Third-party services"],
	["#data-deletion", "Data deletion"],
	["#contact", "Contact"],
] as const;

export default function TrafficRulesPrivacyPolicyPage() {
	return (
		<div className={styles.page}>
			<a className={styles.skipLink} href="#main-content">
				Skip to main content
			</a>

			<header className={styles.siteHeader}>
				<p className={styles.appName}>Traffic Rules / ПДР 2026</p>
				<h1>Privacy Policy</h1>
				<p className={styles.lede}>
					Traffic Rules is an iOS and Android reference app for Ukrainian traffic rules, road signs,
					road markings, traffic controller signals, and local search across bundled reference
					content.
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

				<section id="what-traffic-rules-processes">
					<h2>What Traffic Rules processes</h2>
					<p>
						Traffic Rules lets you browse Ukrainian traffic rules, road signs, road markings, and
						traffic controller signals. The current app also provides local search across bundled
						reference content and detail screens for rule topics, signs, and markings.
					</p>
					<p>
						Traffic Rules does not require account registration, name, email address, phone number,
						contacts, precise location, payment information, login credentials, or a developer
						account to use the core app experience.
					</p>
				</section>

				<section id="how-data-is-used">
					<h2>How data is used</h2>
					<p>
						The app uses bundled reference content and local app state to display ПДР 2026 topics,
						road signs, road markings, traffic controller signals, search results, and selected
						detail screens.
					</p>
					<p>
						Rostyslav Belmeha does not operate a Traffic Rules account service and does not sell,
						rent, or broker Traffic Rules app data.
					</p>
				</section>

				<section id="third-party-services">
					<h2>Third-party services</h2>
					<p>
						The current Traffic Rules app does not use advertising SDKs, analytics SDKs, tracking
						tools, or third-party data brokers. If a future version adds diagnostics, analytics, or
						another third-party provider, this Privacy Policy will be updated to describe that
						provider and the data involved.
					</p>
				</section>

				<section id="data-deletion">
					<h2>Data deletion</h2>
					<p>
						You can delete local Traffic Rules app data by deleting the app from your iOS or Android
						device. Support emails are handled separately and are used only to understand and
						respond to your request.
					</p>
				</section>

				<section id="childrens-privacy">
					<h2>Children's Privacy</h2>
					<p>
						Traffic Rules is a general-purpose reference app and does not knowingly collect personal
						information from children through account registration.
					</p>
				</section>

				<section id="changes">
					<h2>Changes</h2>
					<p>
						This Privacy Policy may be updated when Traffic Rules changes or when legal, platform,
						or App Store requirements change. The last updated date will change when updates are
						posted.
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
