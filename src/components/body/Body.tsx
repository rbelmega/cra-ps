import Image from "next/image";

import { BlogList } from "../blog-list";
import { Bio } from "../bio";
import { Footer } from "../footer";
import { loadPublicJson } from "../../domain/public-content";
import styles from "./Body.module.scss";

interface BioData {
	eyebrow?: string;
	headline?: string;
	summary?: string;
	bio: string;
	highlights?: Array<{
		label: string;
		value: string;
	}>;
	stack?: string[];
}

export async function Body() {
	const data = await loadPublicJson<BioData>("bio.json", { bio: "" });

	return (
		<div className={styles.page}>
			<section className={styles.intro}>
				<div className={styles.copy}>
					<Bio
						eyebrow={data.eyebrow}
						headline={data.headline}
						summary={data.summary}
						highlights={data.highlights}
						stack={data.stack}
						bio={data.bio}
					/>
				</div>

				<aside className={styles.sidebar}>
					<div className={styles.portrait}>
						<section className={styles.imageFrame}>
							<Image
								src="/assets/img/me2.jpg"
								alt="Rostyslav Belmeha"
								width={1024}
								height={1024}
								sizes="(max-width: 720px) min(320px, calc(100vw - 40px)), 320px"
								fetchPriority="high"
								loading="eager"
							/>
						</section>
					</div>
				</aside>
			</section>

			<section id="writing" aria-labelledby="writing-title" className={styles.writingSection}>
				<div className={styles.sectionHeader}>
					<h2 id="writing-title" className={styles.sectionTitle}>
						Writing
					</h2>
					<p className={styles.sectionDescription}>
						Notes on frontend, performance, and the details that matter.
					</p>
				</div>
				<BlogList />
			</section>

			<Footer />
		</div>
	);
}
