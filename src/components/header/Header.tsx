import styles from "./Header.module.scss";

export function Header() {
	return (
		<header className={styles.header}>
			<div className={styles.inner}>
				<div className={styles.identity}>
					<p className={styles.name}>Rostyslav Belmeha</p>
					<p className={styles.role}>Front-end Engineer at SoftServe</p>
				</div>
				<p className={styles.meta}>React / Next.js · Design systems</p>
			</div>
		</header>
	);
}
