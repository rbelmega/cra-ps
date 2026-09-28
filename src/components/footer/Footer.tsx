import { getContacts } from "../../domain/contacts";
import { Contacts } from "../contacts";
import styles from "./Footer.module.scss";

export function Footer() {
	const currentYear = new Date().getFullYear();
	const twitter = getContacts().find((contact) => contact.name === "Twitter");

	return (
		<footer className={styles.footer}>
			<section id="contact" aria-labelledby="contact-title" className={styles.contactSection}>
				<div className={styles.contactCopy}>
					<h2 id="contact-title" className={styles.contactTitle}>
						Let’s connect
					</h2>
					<p className={styles.contactDescription}>Continue the conversation on LinkedIn.</p>
				</div>
				<Contacts />
			</section>
			<div className={styles.footerContent}>
				<div className={styles.footerSection}>
					<p className={styles.copyright}>
						© {currentYear} Rostyslav Belmeha. All rights reserved.
					</p>
				</div>
				{twitter ? (
					<a
						className={styles.footerLink}
						href={twitter.link}
						target="_blank"
						rel="noreferrer noopener"
					>
						Twitter <span aria-hidden="true">↗</span>
					</a>
				) : null}
			</div>
		</footer>
	);
}
