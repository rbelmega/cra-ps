import React from 'react';
import styles from './Bio.module.scss';

interface Highlight {
  label: string;
  value: string;
}

interface BioProps {
  headline?: string;
  summary?: string;
  highlights?: Highlight[];
  stack?: string[];
  bio: string;
}

// Extract technologies from bio text
const extractTechnologies = (bio: string): string[] => {
  const techKeywords = ['Angular', 'React', 'Next.js', 'Node.js'];
  const found: string[] = [];
  techKeywords.forEach(tech => {
    if (bio.includes(tech)) {
      found.push(tech);
    }
  });
  return found;
};

export const Bio: React.FC<BioProps> = ({ headline, summary, highlights, stack, bio }) => {
  const paragraphs = bio.split('\n').filter(Boolean);
  const technologies = stack && stack.length > 0 ? stack : extractTechnologies(bio);

  return (
    <div className={styles.container}>
      {(headline || summary) && (
        <div className={styles.hero}>
          {headline ? <h1 className={styles.headline}>{headline}</h1> : null}
          {summary ? <p className={styles.summary}>{summary}</p> : null}
        </div>
      )}

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

      {technologies.length > 0 ? (
        <div className={styles.stack}>
          <div className={styles.stackLabel}>Stack</div>
          <div className={styles.techGrid}>
            {technologies.map((tech) => (
              <span key={tech} className={styles.techBadge}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      <div className={styles.description}>
        {paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className={[
              styles.paragraph,
              index === 0 && !summary ? styles.lead : '',
              index === paragraphs.length - 1 ? styles.secondary : '',
            ].filter(Boolean).join(' ')}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};
