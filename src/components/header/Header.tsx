import styles from "./Header.module.scss";

export function Header() {
	return (
		<header className={styles.header}>
			<div className={styles.inner}>
				<div className={styles.identity}>
					<p className={styles.name}>Rostyslav Belmeha</p>
				</div>
				<a className={styles.writingLink} href="#writing">
					Writing <span aria-hidden="true">↗</span>
				</a>
			</div>
		</header>
	);
}
