import type { Metadata, Viewport } from "next";

import styles from "../../app-store-page.module.scss";

const canonicalUrl = "https://www.belmeha.com/homa/privacy-policy/";
const contactEmail = "belmega31@gmail.com";
const contactMailto = "mailto:belmega31@gmail.com";

export const metadata: Metadata = {
	title: "Homa Privacy Policy",
	description: "Privacy Policy for Homa, an iOS and Android offline-first maintenance app.",
	alternates: {
		canonical: canonicalUrl,
	},
	openGraph: {
		type: "website",
		title: "Homa Privacy Policy",
		description:
			"How Homa handles tasks, reminders, zones, devices, task history, photo attachments, and local app data.",
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
		body: "Tasks, reminders, zones, devices, task history, notes, photo attachments, and language settings stay local.",
	},
	{
		title: "No analytics",
		body: "Homa does not use advertising SDKs, analytics SDKs, or third-party data brokers.",
	},
	{
		title: "Local permissions",
		body: "Photo library, camera, and notification permissions are used only for maintenance logs and reminders.",
	},
	{
		title: "Data deletion",
		body: "Delete app data in Homa or remove the app from your iOS or Android device.",
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
					Homa is an iOS and Android offline-first app for apartment maintenance tasks, reminders,
					zones, devices, notes, photo attachments, and local task history. It is designed to keep
					personal home data local and under your control.
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
						Homa stores information you create in the app in a local SQLite database, such as
						apartment name, tasks, reminders, zones or rooms, device details, task history, optional
						notes, and notification identifiers used to manage local reminders.
					</p>
					<p>
						If you add photos to maintenance logs, Homa copies the selected photo attachments to
						local app storage and stores local file references with the related task history. Homa
						also stores your selected language locally so the app can reopen in the same language.
					</p>
					<p>
						Homa does not require accounts, names, email addresses, phone numbers, contacts, precise
						location, payment information, or billing information to use the app.
					</p>
				</section>

				<section id="how-data-is-used">
					<h2>How data is used</h2>
					<p>
						Your data is used only to provide core app functionality: creating and managing tasks,
						scheduling local notifications for reminders, showing task history, displaying photo
						attachments, remembering language choice, and keeping the app usable and reliable.
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
						brokers. Homa uses platform libraries for local storage, SQLite, notifications, file
						storage, and photo selection. If a future version introduces a third-party service, this
						Privacy Policy will be updated before that use is described as active.
					</p>
				</section>

				<section id="data-deletion">
					<h2>Data deletion</h2>
					<p>
						You can delete Homa data by removing tasks, zones, devices, notes, and history in the
						app. Uninstalling Homa removes the local SQLite database, local photo attachments, and
						app settings from your device.
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
