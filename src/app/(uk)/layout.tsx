import type { ReactNode } from "react";
import { Document } from "../../components/document/Document";

export { defaultMetadata as metadata } from "../../domain/seo";

export default function UkrainianLayout({ children }: { children: ReactNode }) {
	return <Document lang="uk">{children}</Document>;
}
