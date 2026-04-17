import Link from "next/link";
import styles from "./not-found.module.scss";

export default function NotFound() {
	const currentYear = new Date().getFullYear();

	return (
		<div className={styles.page}>
			<div className={styles.chrome}>
				<Link href="/" className={styles.brand}>
					Rostyslav Belmeha
				</Link>
			</div>

			<main className={styles.hero}>
				<div className={styles.content}>
					<p className={styles.kicker}>404</p>
					<h1 className={styles.title}>Page not found.</h1>
					<p className={styles.description}>
						The page you tried to open may have moved, expired, or never existed.
					</p>
					<div className={styles.actions}>
						<Link href="/" className={styles.primaryAction}>
							Back Home
						</Link>
					</div>
					<p className={styles.note}>Check the address or start again from the homepage.</p>
				</div>

				<div className={styles.mark} aria-hidden="true">
					404
				</div>
			</main>

			<footer className={styles.footer}>© {currentYear} Rostyslav Belmeha</footer>
		</div>
	);
}
