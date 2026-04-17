import { MarkdownPage } from "../../components/markdown-page/MarkdownPage";
import { loadPublicText } from "../../domain/public-content";

export default async function Page() {
	const data = await loadPublicText("support.md");

	return <MarkdownPage content={data} />;
}
