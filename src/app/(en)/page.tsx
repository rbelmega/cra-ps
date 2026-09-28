import type { Metadata } from "next";
import { App } from "../../components";
import { certifications } from "../../domain/certifications";
import { getContacts } from "../../domain/contacts";
import {
	absoluteUrl,
	AUTHOR_NAME,
	HOME_DESCRIPTION,
	HOME_TITLE,
	socialImage,
} from "../../domain/seo";

export const metadata: Metadata = {
	title: HOME_TITLE,
	description: HOME_DESCRIPTION,
	alternates: { canonical: absoluteUrl("/") },
	openGraph: {
		type: "profile",
		title: HOME_TITLE,
		description: HOME_DESCRIPTION,
		url: absoluteUrl("/"),
		siteName: AUTHOR_NAME,
		locale: "en_US",
		images: [socialImage],
	},
	twitter: {
		card: "summary_large_image",
		title: HOME_TITLE,
		description: HOME_DESCRIPTION,
		images: [socialImage],
	},
};

export default function Index() {
	const profile = {
		"@context": "https://schema.org",
		"@type": "ProfilePage",
		"@id": absoluteUrl("/#profile"),
		url: absoluteUrl("/"),
		mainEntity: {
			"@type": "Person",
			"@id": absoluteUrl("/#person"),
			name: AUTHOR_NAME,
			url: absoluteUrl("/"),
			jobTitle: "Front-end Engineer",
			description: HOME_DESCRIPTION,
			image: absoluteUrl("/assets/img/me2.jpg"),
			sameAs: getContacts().map((contact) => contact.link),
			hasCredential: certifications.map((certification) => ({
				"@type": "EducationalOccupationalCredential",
				name: certification.name,
				credentialCategory: "Certification",
				url: certification.url,
				expires: certification.expires,
				recognizedBy: {
					"@type": "Organization",
					name: certification.issuer,
					url: certification.issuerUrl,
				},
			})),
		},
	};

	return (
		<>
			<script type="application/ld+json">{JSON.stringify(profile).replace(/</g, "\\u003c")}</script>
			<App />
		</>
	);
}
