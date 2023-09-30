import React, { useEffect, useState } from 'react';
import { BlogList } from '../blog-list';
import styles from './Footer.module.scss';

export const Footer = () => {
  const [instagramData, setInstagramData] = useState([]);

  useEffect(() => {
    fetch('/api/instagram')
      .then((response) => response.json())
      .then(setInstagramData);
  }, []);

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
      <div
        style={{
          padding: 30,
        }}
      >
        <BlogList />
      </div>
    </div>
  );
};
