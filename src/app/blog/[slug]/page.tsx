import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import type { ComponentPropsWithoutRef } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { getPostById, getPostBySlug, getPostHref, getPosts } from "../../../domain/blog";
import { rewriteMarkdownHref } from "../../../domain/markdown-href";
import { loadPublicText } from "../../../domain/public-content";
import styles from "./page.module.scss";

type Params = Promise<{ slug: string }>;
type MarkdownLinkProps = ComponentPropsWithoutRef<"a"> & { node?: unknown };
type MarkdownTableProps = ComponentPropsWithoutRef<"table"> & { node?: unknown };

export async function generateStaticParams() {
	const posts = await getPosts();
	return posts.map((post) => ({ slug: post.slug }));
}

export default async function Blog({ params }: { params: Params }) {
	const { slug } = await params;
	const posts = await getPosts();
	const currentPost = getPostBySlug(slug);

	if (!currentPost) {
		const legacyPost = getPostById(slug);

		if (legacyPost) {
			permanentRedirect(getPostHref(legacyPost));
		}

		notFound();
	}

	const currentIndex = posts.findIndex((p) => p.id === currentPost.id);
	const post = posts[currentIndex];
	const previousPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
	const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
	const markdownFile = await loadPublicText(`posts/${post.file}`);

	const formatDate = (dateStr: string) => {
		const months: { [key: string]: string } = {
			Jan: "January",
			Feb: "February",
			Mar: "March",
			Apr: "April",
			May: "May",
			Jun: "June",
			Jul: "July",
			Aug: "August",
			Sep: "September",
			Oct: "October",
			Nov: "November",
			Dec: "December",
		};

		const parts = dateStr.split(" ");
		if (parts.length === 3) {
			return `${months[parts[1]] || parts[1]} ${parts[0]}, ${parts[2]}`;
		}

		return dateStr;
	};

	return (
		<main className={styles.page}>
			<div className={styles.inner}>
				<Link href="/" className={styles.homeLink}>
					Rostyslav Belmeha
				</Link>

				<article className={styles.shell}>
					<header className={styles.hero}>
						{post.date ? <p className={styles.meta}>{formatDate(post.date)}</p> : null}
						<h1 className={styles.title}>{post.name}</h1>
					</header>

					<div className={styles.article}>
						<ReactMarkdown
							remarkPlugins={[remarkGfm]}
							rehypePlugins={[
								[
									rehypeHighlight,
									{
										aliases: {
											html: "xml",
										},
									},
								],
							]}
							components={{
								a({ node: _node, href = "", children, ...props }: MarkdownLinkProps) {
									const rewrittenHref = rewriteMarkdownHref(href);
									const isExternalUrl = /^https?:\/\//i.test(rewrittenHref);

									if (/^(mailto:|tel:)/i.test(rewrittenHref) || isExternalUrl) {
										return (
											<a
												href={rewrittenHref}
												target={isExternalUrl ? "_blank" : undefined}
												rel={isExternalUrl ? "noreferrer noopener" : undefined}
												{...props}
											>
												{children}
											</a>
										);
									}

									return (
										<Link href={rewrittenHref} {...props}>
											{children}
										</Link>
									);
								},
								table({ node: _node, children, ...props }: MarkdownTableProps) {
									return (
										<div className={styles.tableWrap}>
											<table {...props}>{children}</table>
										</div>
									);
								},
							}}
						>
							{markdownFile}
						</ReactMarkdown>
					</div>

					{previousPost || nextPost ? (
						<nav className={styles.articleNav} aria-label="Article navigation">
							{previousPost ? (
								<Link href={getPostHref(previousPost)} className={styles.articleNavLink}>
									<span className={styles.articleNavLabel}>Previous Article</span>
									<span className={styles.articleNavTitle}>{previousPost.name}</span>
								</Link>
							) : null}

							{nextPost ? (
								<Link
									href={getPostHref(nextPost)}
									className={`${styles.articleNavLink} ${styles.articleNavLinkNext}`}
								>
									<span className={styles.articleNavLabel}>Next Article</span>
									<span className={styles.articleNavTitle}>{nextPost.name}</span>
								</Link>
							) : null}
						</nav>
					) : null}
				</article>
			</div>
		</main>
	);
}
