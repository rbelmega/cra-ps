import React from 'react';
import styles from './Bio.module.scss';

interface Activity {
  iconClass: string;
  text: string;
}

interface BioProps {
  activities?: Activity[];
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

export const Bio: React.FC<BioProps> = ({ activities, bio }) => {
  const paragraphs = bio.split('\n').filter(Boolean);
  const technologies = extractTechnologies(bio);

  return (
    <div className={styles.container}>
      {activities && activities.length > 0 ? (
        <ul className={styles.activityList}>
          {activities.map((activity) => (
            <li key={activity.text} className={styles.activity}>
              <i className={`${activity.iconClass} ${styles.activityIcon}`} />
              <span className={styles.activityText}>{activity.text}</span>
            </li>
          ))}
        </ul>
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
              index === 0 ? styles.lead : '',
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
