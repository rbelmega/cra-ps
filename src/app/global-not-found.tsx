import { Document } from "../components/document/Document";
import { defaultMetadata } from "../domain/seo";
import NotFound from "./(en)/not-found";

export const metadata = {
	...defaultMetadata,
	robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
	return (
		<Document lang="en">
			<NotFound />
		</Document>
	);
}
