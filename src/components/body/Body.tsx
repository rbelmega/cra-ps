import { loadPublicJson } from "../../domain/public-content";
import { Bio } from "../bio";
import { BlogList } from "../blog-list";
import { Footer } from "../footer";
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
						portrait={
							<div className={styles.imageFrame}>
								{/* biome-ignore lint/performance/noImgElement: These responsive WebP assets are already optimized. */}
								<img
									src="/assets/img/me2-320.webp"
									srcSet="/assets/img/me2-128.webp 128w, /assets/img/me2-320.webp 320w, /assets/img/me2-640.webp 640w, /assets/img/me2-1024.webp 1024w"
									alt="Rostyslav Belmeha"
									width={1024}
									height={1024}
									sizes="(max-width: 720px) 72px, (max-width: 1185px) 27vw, 320px"
									fetchPriority="high"
									loading="eager"
									decoding="async"
								/>
							</div>
						}
						eyebrow={data.eyebrow}
						headline={data.headline}
						summary={data.summary}
						highlights={data.highlights}
						stack={data.stack}
						bio={data.bio}
					/>
				</div>
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
