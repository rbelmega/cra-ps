import styles from "./Header.module.scss";

export function Header() {
	return (
		<header className={styles.header}>
			<div className={styles.inner}>
				<div className={styles.identity}>
					<p className={styles.name}>Rostyslav Belmeha</p>
				</div>
				<nav className={styles.navigation} aria-label="Main navigation">
					<a className={styles.writingLink} href="#writing">
						Writing
					</a>
					<a className={styles.writingLink} href="#contact">
						Contact
					</a>
				</nav>
			</div>
		</header>
	);
}
