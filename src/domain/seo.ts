import type { Metadata } from "next";
import bio from "../../public/bio.json";

// Keep canonical URLs independent of preview/development host names.
export const SITE_URL = "https://www.belmeha.com";
export const AUTHOR_NAME = "Rostyslav Belmeha";
export const HOME_TITLE = `${AUTHOR_NAME} | ${bio.headline}`;
export const HOME_DESCRIPTION =
	"Front-end Engineer with 11+ years in frontend engineering for complex web applications and design systems, leveraging AI-assisted development workflows. React, Next.js, Angular, Node.js, NestJS.";

export const defaultMetadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: HOME_TITLE,
	description: HOME_DESCRIPTION,
	icons: {
		icon: {
			url: "/favicon.ico?v=olive-b",
			type: "image/x-icon",
			sizes: "16x16 24x24 32x32 48x48 64x64",
		},
	},
};

export const absoluteUrl = (path: string) => new URL(path, `${SITE_URL}/`).toString();

export const socialImage = {
	url: absoluteUrl("/social-preview"),
	width: 1200,
	height: 630,
	alt: HOME_TITLE,
};
