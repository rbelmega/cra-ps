import React from 'react';
import Image from 'next/image';
import { BlogList } from '../blog-list';
import styles from './Footer.module.scss';

interface InstagramMedia {
  media_type: 'IMAGE' | 'VIDEO';
  media_url: string;
  caption?: string;
}

export const Footer: React.FC = async () => {
  // Temporarily disabled Instagram API call
  const instagramData: InstagramMedia[] = [];

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
              <video autoPlay={true} muted={true} src={media.media_url} />
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
