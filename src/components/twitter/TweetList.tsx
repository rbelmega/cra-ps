import React from 'react';
import { Tweet } from 'react-tweet';
import { getTweets } from '../../domain/twitter';
import styles from './TweetList.module.css';

interface TweetData {
  id: string;
}

export const TweetList: React.FC = async () => {
  const tweets: TweetData[] = await getTweets();

  if (!tweets.length) {
    return (
      <div className={styles.errorMessage}>
        Unable to load tweets at the moment. Please try again later.
      </div>
    );
  }

  return (
    <div className={styles.twitter} data-theme="dark">
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} id={tweet.id} />
      ))}
    </div>
  );
};
