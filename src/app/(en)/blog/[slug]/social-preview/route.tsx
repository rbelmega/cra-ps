import { ImageResponse } from "next/og";
import { getPostBySlug, getPosts } from "../../../../../domain/blog";
import { AUTHOR_NAME } from "../../../../../domain/seo";

export const dynamic = "force-static";

export async function generateStaticParams() {
	return (await getPosts()).map(({ slug }) => ({ slug }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const post = getPostBySlug(slug);
	if (!post) return new Response("Not found", { status: 404 });

	return new ImageResponse(
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				width: "100%",
				height: "100%",
				padding: "64px 72px",
				background: "#111111",
				color: "#f6f6f6",
				fontFamily: "sans serif",
			}}
		>
			<div style={{ fontSize: 32 }}>{AUTHOR_NAME}</div>
			<div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
				<div style={{ color: "#cfd79a", fontSize: 64, lineHeight: 1.1 }}>{post.name}</div>
				{post.excerpt ? (
					<div style={{ color: "#c4c4c4", fontSize: 28, lineHeight: 1.4 }}>{post.excerpt}</div>
				) : null}
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					paddingTop: 26,
					borderTop: "1px solid #383838",
					color: "#c4c4c4",
					fontSize: 26,
				}}
			>
				<span>{post.topic ?? "Writing"}</span>
				<span>belmeha.com</span>
			</div>
		</div>,
		{ width: 1200, height: 630 },
	);
}
