import React from 'react';
import { Tweet } from 'react-tweet';
import { getTweets } from '../../domain/twitter';
import styles from './TweetList.module.css';

export const TweetList = async () => {
  const tweets = await getTweets();
  
  if (!tweets.length) {
    return (
      <div className={styles.errorMessage}>
        Unable to load tweets at the moment. Please try again later.
      </div>
    );
  }

  return (
    <div className={styles.twitter}>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} id={tweet.id} />
      ))}
    </div>
  );
}; 