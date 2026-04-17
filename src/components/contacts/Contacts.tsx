import type { ReactNode } from "react";
import styles from "./Contacts.module.scss";
import { getContacts } from "../../domain/contacts";

const CONTACT_ORDER = ["LinkedIn", "GitHub", "Twitter"] as const;

const icons: Record<string, ReactNode> = {
	linkedin: (
		<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
			<path
				fill="currentColor"
				d="M4.5 9h2.8v9.9H4.5zM5.9 5.1a1.6 1.6 0 11-3.2 0 1.6 1.6 0 013.2 0z"
			/>
			<path
				fill="currentColor"
				d="M10 9h2.7v1.6h.1c.4-.9 1.6-1.9 3.2-1.9 3.4 0 4 2.2 4 5.1v5.1h-2.8v-4.6c0-1.1 0-2.6-1.6-2.6-1.6 0-1.8 1.2-1.8 2.5v4.7H10z"
			/>
		</svg>
	),
	twitter: (
		<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
			<path
				fill="currentColor"
				d="M21 5.5a6.6 6.6 0 01-1.9.5 3.3 3.3 0 001.5-1.8 6.6 6.6 0 01-2.1.8 3.3 3.3 0 00-5.7 3 9.3 9.3 0 01-6.8-3.4 3.3 3.3 0 001 4.4 3.3 3.3 0 01-1.5-.4v.1a3.3 3.3 0 002.6 3.2 3.3 3.3 0 01-1.5.1 3.3 3.3 0 003.1 2.3A6.7 6.7 0 013 17a9.4 9.4 0 005 1.5c6 0 9.3-5 9.3-9.3v-.4A6.6 6.6 0 0021 5.5z"
			/>
		</svg>
	),
	github: (
		<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
			<path
				fill="currentColor"
				d="M12 .9a11.1 11.1 0 00-3.5 21.7c.6.1.8-.3.8-.6v-2.1c-3.1.7-3.7-1.3-3.7-1.3-.6-1.2-1.4-1.6-1.4-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 .1.8 2.2 3.2 1.5.1-.6.4-1.1.7-1.4-2.5-.3-5.1-1.2-5.1-5.5 0-1.1.4-2.1 1.2-2.8-.1-.3-.5-1.4.1-3 0 0 .9-.3 3 1.1a10.2 10.2 0 015.5 0c2.1-1.4 3-1.1 3-1.1.6 1.6.2 2.7.1 3 .8.7 1.2 1.7 1.2 2.8 0 4.3-2.6 5.2-5.1 5.5.4.3.7 1 .7 2v3c0 .3.2.7.8.6A11.1 11.1 0 0012 .9z"
			/>
		</svg>
	),
};

export function Contacts() {
	const order = new Map<string, number>(CONTACT_ORDER.map((name, index) => [name, index]));
	const contacts = getContacts()
		.filter((contact) => order.has(contact.name))
		.sort(
			(a, b) =>
				(order.get(a.name) ?? Number.MAX_SAFE_INTEGER) -
				(order.get(b.name) ?? Number.MAX_SAFE_INTEGER),
		);

	return (
		<ul className={styles.contactList}>
			{contacts.map((contact) => (
				<li key={contact.name} className={styles.contactItem}>
					<a
						className={styles.contactLink}
						href={contact.link}
						target="_blank"
						rel="noreferrer noopener"
						aria-label={`Open ${contact.name} profile`}
					>
						<span className={styles.contactIcon} aria-hidden="true">
							{icons[contact.name.toLowerCase()] ?? (
								<span className={styles.contactLetter}>{contact.letter}</span>
							)}
						</span>
						<span className={styles.contactLabel}>{contact.name}</span>
						<span className={styles.contactArrow} aria-hidden="true">
							<svg viewBox="0 0 24 24" role="presentation">
								<path
									d="M5 12h12M13 6l6 6-6 6"
									fill="none"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</span>
					</a>
				</li>
			))}
		</ul>
	);
}
