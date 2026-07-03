import type { Metadata, Viewport } from "next";

import styles from "../../app-store-page.module.scss";

const canonicalUrl = "https://www.belmeha.com/homa/privacy-policy/";
const contactEmail = "belmega31@gmail.com";
const contactMailto = "mailto:belmega31@gmail.com";

export const metadata: Metadata = {
	title: "Homa Privacy Policy",
	description: "Privacy Policy for Homa, an iOS home task and reminder app.",
	alternates: {
		canonical: canonicalUrl,
	},
	openGraph: {
		type: "website",
		title: "Homa Privacy Policy",
		description: "How Homa handles tasks, reminders, zones, equipment, and local app data.",
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
		body: "Homa does not ask you to sign in and does not create user profiles.",
	},
	{
		title: "Data stored on your device",
		body: "Tasks, reminders, zones, equipment, history, and settings stay local.",
	},
	{
		title: "No analytics",
		body: "Homa does not use advertising SDKs, analytics SDKs, or third-party data brokers.",
	},
	{
		title: "Data deletion",
		body: "Delete app data in Homa or remove the app from your device.",
	},
];

const tocItems = [
	["#what-homa-stores", "What Homa stores"],
	["#how-data-is-used", "How data is used"],
	["#third-party-services", "Third-party services"],
	["#data-deletion", "Data deletion"],
	["#contact", "Contact"],
] as const;

export default function HomaPrivacyPolicyPage() {
	return (
		<div className={styles.page}>
			<a className={styles.skipLink} href="#main-content">
				Skip to main content
			</a>

			<header className={styles.siteHeader}>
				<p className={styles.appName}>Homa</p>
				<h1>Privacy Policy</h1>
				<p className={styles.lede}>
					Homa helps you manage home tasks, reminders, zones, equipment, notes, and task history. It
					is designed to keep personal home data local and under your control.
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

				<section id="what-homa-stores">
					<h2>What Homa stores</h2>
					<p>
						Homa stores information you create in the app, such as tasks, reminders, zones or rooms,
						equipment details, task history, optional notes, app settings, and preferences.
					</p>
					<p>
						Homa does not collect names, usernames, email addresses, phone numbers, location data,
						contacts, photos, media files, payment information, or billing information.
					</p>
				</section>

				<section id="how-data-is-used">
					<h2>How data is used</h2>
					<p>
						Your data is used only to provide core app functionality: creating and managing tasks,
						scheduling reminders, showing task history, and keeping the app usable and reliable.
					</p>
					<p>
						Data stored on your device is not sent to a Homa server, and Rostyslav Belmeha does not
						sell, rent, or share Homa app data with third parties.
					</p>
				</section>

				<section id="third-party-services">
					<h2>Third-party services</h2>
					<p>
						Homa does not use advertising SDKs, analytics or tracking tools, or third-party data
						brokers. If a future version introduces a third-party service, this Privacy Policy will
						be updated before that use is described as active.
					</p>
				</section>

				<section id="data-deletion">
					<h2>Data deletion</h2>
					<p>
						You can delete Homa data by removing tasks, zones, equipment, or notes in the app.
						Uninstalling Homa removes locally stored app data from your device.
					</p>
				</section>

				<section id="childrens-privacy">
					<h2>Children's Privacy</h2>
					<p>
						Homa is a general-purpose home organization app and does not knowingly collect personal
						information from children through accounts or registration.
					</p>
				</section>

				<section id="changes">
					<h2>Changes</h2>
					<p>
						This Privacy Policy may be updated when Homa changes or when legal, platform, or App
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
