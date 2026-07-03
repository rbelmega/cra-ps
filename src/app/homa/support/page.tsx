import type { Metadata, Viewport } from "next";

import styles from "../../app-store-page.module.scss";

const canonicalUrl = "https://www.belmeha.com/homa/support/";
const supportEmail = "belmega31@gmail.com";
const supportMailto = "mailto:belmega31@gmail.com?subject=Homa%20Support";

export const metadata: Metadata = {
	title: "Homa Support",
	description: "Support page for Homa, an iOS home task and reminder app.",
	alternates: {
		canonical: canonicalUrl,
	},
	openGraph: {
		type: "website",
		title: "Homa Support",
		description: "Get help with Homa tasks, reminders, zones, equipment, and local app data.",
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
		body: "Send Homa questions, issue reports, and privacy requests by email.",
	},
	{
		title: "Tasks and reminders",
		body: "Get help with scheduling, notifications, recurring work, and task history.",
	},
	{
		title: "Zones and equipment",
		body: "Report issues with rooms, home areas, equipment details, or notes.",
	},
	{
		title: "Privacy details",
		body: "Homa has a separate Privacy Policy for local data handling.",
	},
];

const tocItems = [
	["#contact-support", "Contact support"],
	["#before-contacting", "Before contacting"],
	["#troubleshooting", "Troubleshooting"],
	["#privacy", "Privacy"],
] as const;

export default function HomaSupportPage() {
	return (
		<div className={styles.page}>
			<a className={styles.skipLink} href="#main-content">
				Skip to main content
			</a>

			<header className={styles.siteHeader}>
				<p className={styles.appName}>Homa</p>
				<h1>Support</h1>
				<p className={styles.lede}>
					Help for Homa, an iOS app for home tasks, reminders, zones, equipment, notes, and local
					task history.
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
						For Homa support, email <a href={supportMailto}>{supportEmail}</a>. Use this address for
						app questions, issue reports, App Store support requests, and privacy questions.
					</p>
				</section>

				<section id="before-contacting">
					<h2>Before contacting</h2>
					<p>
						Include your device model, iOS version, Homa app version, the approximate time the issue
						happened, and whether the issue affects tasks, reminders, zones, equipment,
						notifications, or local data.
					</p>
				</section>

				<section id="troubleshooting">
					<h2>Troubleshooting</h2>
					<ul>
						<li>Check iOS Settings &gt; Notifications &gt; Homa if reminders do not appear.</li>
						<li>Open Homa and confirm the task date, time, and recurrence settings.</li>
						<li>
							If local data looks out of date, close and reopen the app before editing the same task
							or zone again.
						</li>
						<li>
							If reinstalling the app, remember that Homa data is stored locally and may be removed
							when the app is deleted.
						</li>
					</ul>
				</section>

				<section id="privacy">
					<h2>Privacy</h2>
					<p>
						Homa support emails are used only to understand and respond to your request. For details
						about local app data, review the <a href="/homa/privacy-policy/">Privacy Policy</a>.
					</p>
				</section>
			</main>
		</div>
	);
}
