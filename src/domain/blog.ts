import postsData from "../../public/posts.json";

export interface Post {
	file: string;
	id: string;
	name: string;
	date: string;
	topic?: string;
	excerpt?: string;
	slug: string;
}

const slugifyPostName = (value: string) =>
	value
		.toLowerCase()
		.replace(/['"]/g, "")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");

const postsCatalog: Post[] = (postsData as Post[]).map((post) => ({
	...post,
	slug: post.slug || slugifyPostName(post.name),
}));

export const getPosts = async (): Promise<Post[]> => postsCatalog;

export const getPostById = (id: string): Post | null =>
	postsCatalog.find((post) => post.id === id) ?? null;

export const getPostBySlug = (slug: string): Post | null =>
	postsCatalog.find((post) => post.slug === slug) ?? null;

export const getPostHref = (post: Pick<Post, "slug">): string => `/blog/${post.slug}`;
