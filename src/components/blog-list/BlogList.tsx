import Link from "next/link";
import styles from "./BlogList.module.scss";
import { getPostHref, getPosts } from "../../domain/blog";

export async function BlogList() {
	const posts = await getPosts();

	if (posts.length === 0) {
		return (
			<div className={styles.blog}>
				<p className={styles.empty}>No blog posts available.</p>
			</div>
		);
	}

	return (
		<div className={styles.blog}>
			<div className={styles.postsGrid}>
				{posts.map((post, index) => (
					<Link
						key={post.file}
						href={getPostHref(post)}
						className={[
							styles.postCard,
							index === 0 ? styles.featuredCard : styles.secondaryCard,
						].join(" ")}
						aria-label={`Read ${post.name}`}
					>
						<div className={styles.postContent}>
							<div className={styles.postHeader}>
								<span className={styles.postMeta}>
									<span className={styles.topic}>{post.topic ?? "Insight"}</span>
									<span className={styles.metaDivider} aria-hidden="true">
										·
									</span>
									<span className={styles.date}>{post.date}</span>
								</span>
								<span className={styles.postArrow} aria-hidden="true">
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
							</div>
							<div className={styles.postBody}>
								<h3 className={styles.postTitle}>{post.name}</h3>
								{post.excerpt ? <p className={styles.postExcerpt}>{post.excerpt}</p> : null}
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
