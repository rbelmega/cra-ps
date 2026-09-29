import { getContacts } from "../../domain/contacts";
import styles from "./Footer.module.scss";

export function Footer() {
	const currentYear = new Date().getFullYear();
	const contacts = getContacts().filter((contact) =>
		["LinkedIn", "Twitter"].includes(contact.name),
	);

	return (
		<footer className={styles.footer}>
			<nav id="contact" aria-label="Contact" className={styles.contacts}>
				<ul className={styles.contactList}>
					<li className={styles.contactItem}>
						<a className={styles.contactLink} href="mailto:belmega31@gmail.com">
							belmega31@gmail.com
						</a>
					</li>
					{contacts.map((contact) => (
						<li key={contact.name} className={styles.contactItem}>
							<span className={styles.separator} aria-hidden="true">
								·
							</span>
							<a
								className={styles.contactLink}
								href={contact.link}
								target="_blank"
								rel="noreferrer noopener"
							>
								{contact.name}
							</a>
						</li>
					))}
				</ul>
			</nav>
			<p className={styles.copyright}>© {currentYear} Rostyslav Belmeha. All rights reserved.</p>
		</footer>
	);
}
