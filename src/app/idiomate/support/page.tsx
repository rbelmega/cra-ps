import type { Metadata, Viewport } from "next";

import styles from "../../app-store-page.module.scss";

const canonicalUrl = "https://www.belmeha.com/idiomate/support/";
const supportEmail = "belmega31@gmail.com";
const supportMailto = "mailto:belmega31@gmail.com?subject=IdioMate%20Support";

export const metadata: Metadata = {
	title: "IdioMate Support",
	description: "Support page for IdioMate, an iOS language learning app.",
	alternates: {
		canonical: canonicalUrl,
	},
	openGraph: {
		type: "website",
		title: "IdioMate Support",
		description: "Get help with IdioMate learning, practice, progress, and privacy.",
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
		body: "Send IdioMate questions, issue reports, and privacy requests by email.",
	},
	{
		title: "Learning help",
		body: "Get help with lessons, practice state, progress, favorites, and preferences.",
	},
	{
		title: "Local app data",
		body: "IdioMate support can help diagnose issues with local learning progress.",
	},
	{
		title: "Privacy details",
		body: "IdioMate has a separate Privacy Policy for data handling.",
	},
];

const tocItems = [
	["#contact-support", "Contact support"],
	["#before-contacting", "Before contacting"],
	["#troubleshooting", "Troubleshooting"],
	["#privacy", "Privacy"],
] as const;

export default function IdiomateSupportPage() {
	return (
		<div className={styles.page}>
			<a className={styles.skipLink} href="#main-content">
				Skip to main content
			</a>

			<header className={styles.siteHeader}>
				<p className={styles.appName}>IdioMate</p>
				<h1>Support</h1>
				<p className={styles.lede}>
					Help for IdioMate, an iOS language learning app for practice, progress, and preferences.
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
						For IdioMate support, email <a href={supportMailto}>{supportEmail}</a>. Use this address
						for app questions, issue reports, App Store support requests, and privacy questions.
					</p>
				</section>

				<section id="before-contacting">
					<h2>Before contacting</h2>
					<p>
						Include your device model, iOS version, IdioMate app version, the approximate time the
						issue happened, and whether the issue affects learning content, practice, progress,
						favorites, settings, or local data.
					</p>
				</section>

				<section id="troubleshooting">
					<h2>Troubleshooting</h2>
					<ul>
						<li>Restart IdioMate if practice progress does not appear immediately.</li>
						<li>Check that your device has enough free storage for local app data.</li>
						<li>
							If learning or practice state looks incorrect, include the affected screen and steps
							to reproduce the issue in your email.
						</li>
						<li>
							If reinstalling the app, remember that locally stored progress may be removed when the
							app is deleted.
						</li>
					</ul>
				</section>

				<section id="privacy">
					<h2>Privacy</h2>
					<p>
						IdioMate support emails are used only to understand and respond to your request. For
						details about local learning data, review the{" "}
						<a href="/idiomate/privacy-policy/">Privacy Policy</a>.
					</p>
				</section>
			</main>
		</div>
	);
}
