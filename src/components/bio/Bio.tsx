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

export const Bio: React.FC<BioProps> = ({ activities, bio }) => {
  const paragraphs = bio.split('\n');

  return (
    <div className={styles.container}>
      <section>
        <article className={styles.article}>
          <h3 className={styles.h3}>About</h3>

          {activities?.map((activity, index) => (
            <h3 key={index}>
              <i className={activity.iconClass} />
              {activity.text}
            </h3>
          ))}
        </article>
        <div className={styles.description}>
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>
    </div>
  );
};
