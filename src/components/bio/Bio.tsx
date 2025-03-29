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
        <p className={styles.description}>{bio}</p>
      </section>
    </div>
  );
};
