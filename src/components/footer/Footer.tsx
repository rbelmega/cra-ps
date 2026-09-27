import { getContacts } from "../../domain/contacts";
import styles from "./Footer.module.scss";

export function Footer() {
	const currentYear = new Date().getFullYear();
	const twitter = getContacts().find((contact) => contact.name === "Twitter");

	return (
		<footer className={styles.footer}>
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
