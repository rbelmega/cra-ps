import React from 'react';
import { BlogList } from '../blog-list';
import styles from './Footer.module.scss';

export const Footer = async () => {
  const response = await fetch('https://www.belmeha.com/api/instagram');
  const instagramData = await response.json();

  return (
    <div>
      <div className={styles.instagramWrapper}>
        {instagramData.map((media) =>
          media.media_type === 'IMAGE' ? (
            <a key={media.media_url} href={media.media_url} target="_blank">
              <img src={media.media_url} alt={media.caption} />
            </a>
          ) : (
            <a key={media.media_url} href={media.media_url} target="_blank">
              <video autoPlay={true} muted={true} src={media.media_url}></video>
            </a>
          )
        )}
      </div>
      <div className={styles.bloglistWrapper}>
        <BlogList />
      </div>
    </div>
  );
};
