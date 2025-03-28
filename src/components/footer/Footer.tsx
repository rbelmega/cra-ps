import React from 'react';
import Image from 'next/image';
import { BlogList } from '../blog-list';
import styles from './Footer.module.scss';

export const Footer = async () => {
  // Temporarily disabled Instagram API call
  const instagramData = [];

  return (
    <div>
      <div className={styles.instagramWrapper}>
        {instagramData.map((media) =>
          media.media_type === 'IMAGE' ? (
            <a key={media.media_url} href={media.media_url} target="_blank">
              <Image
                width={140}
                height={140}
                src={media.media_url}
                alt={media.caption || ''}
              />
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
