'use client';

import React, { useState } from 'react';
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
  const paragraphs = bio.split('\n');
  const [hoveredActivity, setHoveredActivity] = useState<number | null>(null);
  const technologies = extractTechnologies(bio);

  return (
    <div className={styles.container}>
      <section>
        <article className={styles.article}>
          {activities?.map((activity, index) => (
            <h3
              key={index}
              className={styles.activity}
              onMouseEnter={() => setHoveredActivity(index)}
              onMouseLeave={() => setHoveredActivity(null)}
            >
              <i className={`${activity.iconClass} ${styles.activityIcon}`} />
              <span className={styles.activityText}>{activity.text}</span>
              {hoveredActivity === index && (
                <span className={styles.activityGlow}></span>
              )}
            </h3>
          ))}

          {technologies.length > 0 && (
            <div className={styles.techDiagram}>
              <div className={styles.techLabel}>Technologies</div>
              <div className={styles.techGrid}>
                {technologies.map((tech) => (
                  <div
                    key={tech}
                    className={styles.techBadge}
                  >
                    <span className={styles.techBadgeText}>{tech}</span>
                    <span className={styles.techBadgeGlow}></span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </article>
        <div className={styles.description}>
          {paragraphs.map((paragraph, index) => (
            <p key={index} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
};
