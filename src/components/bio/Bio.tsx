import type { ReactNode } from "react";
import { certifications } from "../../domain/certifications";
import { Contacts } from "../contacts";
import styles from "./Bio.module.scss";

interface Highlight {
	label: string;
	value: string;
}

interface BioProps {
	portrait?: ReactNode;
	eyebrow?: string;
	headline?: string;
	summary?: string;
	highlights?: Highlight[];
	stack?: string[];
	bio: string;
}

// Extract technologies from bio text
const extractTechnologies = (bio: string): string[] => {
	const techKeywords = ["Angular", "React", "Next.js", "Node.js", "NestJS"];
	const found: string[] = [];
	techKeywords.forEach((tech) => {
		if (bio.includes(tech)) {
			found.push(tech);
		}
	});
	return found;
};

const renderHeadline = (headline: string) => {
	const trimmed = headline.trim();
	const lastSpace = trimmed.lastIndexOf(" ");

	if (lastSpace === -1) {
		return trimmed;
	}

	const leading = trimmed.slice(0, lastSpace);
	const accent = trimmed.slice(lastSpace + 1);

	return (
		<>
			{leading} <span className={styles.headlineAccent}>{accent}</span>
		</>
	);
};

export function Bio({ portrait, eyebrow, headline, summary, highlights, stack, bio }: BioProps) {
	const paragraphs = bio.split("\n").filter(Boolean);
	const technologies = stack && stack.length > 0 ? stack : extractTechnologies(bio);

	return (
		<div className={styles.container}>
			{(headline || summary) && (
				<div className={styles.hero}>
					{eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
					{headline ? <h1 className={styles.headline}>{renderHeadline(headline)}</h1> : null}
					{portrait ? <div className={styles.portrait}>{portrait}</div> : null}
					{summary ? <p className={styles.summary}>{summary}</p> : null}
					{highlights && highlights.length > 0 ? (
						<dl className={styles.highlights}>
							{highlights.map((highlight) => (
								<div key={`${highlight.label}-${highlight.value}`} className={styles.highlight}>
									<dt className={styles.highlightLabel}>{highlight.label}</dt>
									<dd className={styles.highlightValue}>{highlight.value}</dd>
								</div>
							))}
						</dl>
					) : null}
					<div className={styles.contacts}>
						<Contacts />
					</div>
					{technologies.length > 0 ? (
						<div className={styles.techGrid}>
							{technologies.map((tech) => (
								<span key={tech} className={styles.techBadge}>
									{tech}
								</span>
							))}
						</div>
					) : null}
					<div className={styles.certifications}>
						{certifications.map((certification) => (
							<a
								key={certification.url}
								className={styles.certification}
								href={certification.url}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={`View ${certification.name} on Credly`}
							>
								<span>{certification.name}</span>
								<span className={styles.certificationArrow} aria-hidden="true">
									↗
								</span>
							</a>
						))}
					</div>
				</div>
			)}

			{paragraphs.length > 0 ? (
				<div className={styles.description}>
					{paragraphs.map((paragraph, index) => (
						<p
							key={paragraph}
							className={[
								styles.paragraph,
								index === 0 ? styles.lead : "",
								index === paragraphs.length - 1 ? styles.secondary : "",
							]
								.filter(Boolean)
								.join(" ")}
						>
							{paragraph}
						</p>
					))}
				</div>
			) : null}
		</div>
	);
}
