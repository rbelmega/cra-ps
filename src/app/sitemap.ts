import type { MetadataRoute } from "next";
import { getPostHref, getPosts } from "../domain/blog";
import { absoluteUrl } from "../domain/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const posts = await getPosts();
	// Redirect-only app roots and legacy numeric article URLs are omitted.
	const pages = [
		"/",
		"/traffic-rules",
		"/traffic-rules/privacy-policy",
		"/traffic-rules/support",
		"/homa/privacy-policy",
		"/homa/support",
		"/idiomate/privacy-policy",
		"/idiomate/support",
		"/uvly/privacy-policy",
		"/uvly/support",
	];

	return [...pages, ...posts.map(getPostHref)].map((path) => ({ url: absoluteUrl(path) }));
}
