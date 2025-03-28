import React from 'react';
import { TweetList } from './TweetList';
import styles from './TweetList.module.css';

export const Twitter: React.FC = () => {
  return (
    <div className={styles.twitter}>
      <div className={styles.container}>
        <TweetList />
      </div>
    </div>
  );
};

export default Twitter;
