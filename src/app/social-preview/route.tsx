import { ImageResponse } from "next/og";
import { AUTHOR_NAME } from "../../domain/seo";

export const dynamic = "force-static";

export async function GET() {
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
			<div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
				<div style={{ color: "#cfd79a", fontSize: 88 }}>Front-end Engineer</div>
				<div style={{ color: "#c4c4c4", fontSize: 30 }}>
					Dashboards, enterprise software &amp; design systems.
				</div>
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
				<span>React · Next.js · Angular · Node.js · NestJS</span>
				<span>belmeha.com</span>
			</div>
		</div>,
		{
			width: 1200,
			height: 630,
		},
	);
}
