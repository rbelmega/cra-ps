import type { Metadata, Viewport } from "next";

import styles from "../../app-store-page.module.scss";

const canonicalUrl = "https://www.belmeha.com/traffic-rules/support/";
const supportEmail = "belmega31@gmail.com";
const supportMailto = "mailto:belmega31@gmail.com?subject=Traffic%20Rules%20Support";

export const metadata: Metadata = {
	title: "Traffic Rules Support",
	description:
		"Support page for Traffic Rules, an iOS and Android reference app for Ukrainian traffic rules.",
	alternates: {
		canonical: canonicalUrl,
	},
	openGraph: {
		type: "website",
		title: "Traffic Rules Support",
		description:
			"Get help with Traffic Rules topics, road signs, road markings, traffic controller signals, local search, and privacy.",
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
		body: "Send Traffic Rules questions, issue reports, and privacy requests by email.",
	},
	{
		title: "Reference content",
		body: "Get help with Ukrainian traffic rules, road signs, road markings, and traffic controller signals.",
	},
	{
		title: "Local search",
		body: "Report issues with searching bundled reference content or opening detail screens.",
	},
	{
		title: "Privacy details",
		body: "Traffic Rules has a separate Privacy Policy for data handling.",
	},
];

const tocItems = [
	["#contact-support", "Contact support"],
	["#before-contacting", "Before contacting"],
	["#troubleshooting", "Troubleshooting"],
	["#privacy", "Privacy"],
] as const;

export default function TrafficRulesSupportPage() {
	return (
		<div className={styles.page}>
			<a className={styles.skipLink} href="#main-content">
				Skip to main content
			</a>

			<header className={styles.siteHeader}>
				<p className={styles.appName}>Traffic Rules / ПДР 2026</p>
				<h1>Support</h1>
				<p className={styles.lede}>
					Help for Traffic Rules, an iOS and Android reference app for Ukrainian traffic rules, road
					signs, road markings, traffic controller signals, and local search across bundled
					reference content.
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
						For Traffic Rules support, email <a href={supportMailto}>{supportEmail}</a>. Use this
						address for app questions, issue reports, App Store support requests, and privacy
						questions.
					</p>
				</section>

				<section id="before-contacting">
					<h2>Before contacting</h2>
					<p>
						Include your device model, iOS or Android version, Traffic Rules app version, the
						approximate time the issue happened, and whether the issue affects Ukrainian traffic
						rules, road signs, road markings, traffic controller signals, local search, or detail
						screens.
					</p>
				</section>

				<section id="troubleshooting">
					<h2>Troubleshooting</h2>
					<ul>
						<li>
							Restart Traffic Rules if a topic, sign, marking, or signal screen does not open.
						</li>
						<li>Check that your device has enough free storage for local app data.</li>
						<li>
							If local search does not find expected bundled reference content, include the exact
							search query and affected section in your email.
						</li>
						<li>
							If content looks incorrect, include the affected ПДР 2026 topic, road sign, road
							marking, or traffic controller signal.
						</li>
						<li>
							If reinstalling the app, remember that local app data may be removed when the app is
							deleted.
						</li>
					</ul>
				</section>

				<section id="privacy">
					<h2>Privacy</h2>
					<p>
						Traffic Rules support emails are used only to understand and respond to your request.
						For details about app data, review the{" "}
						<a href="/traffic-rules/privacy-policy/">Privacy Policy</a>.
					</p>
				</section>
			</main>
		</div>
	);
}
