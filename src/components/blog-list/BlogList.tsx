import React from 'react';
import Link from 'next/link';
import styles from './BlogList.module.scss';
import { getPosts } from '../../domain/blog';

export const BlogList: React.FC = async () => {
  const posts = await getPosts();

  return (
    <div className={styles.blog}>
      {posts.map((post) => (
        <p key={post.file} className={styles.post}>
          <i className={`fa fa-list-alt ${styles.icon}`} />
          <span className={styles.date}>{post.date}</span>
          <Link href={`/blog/${post.id}`} className={styles.link}>
            {post.name}
          </Link>
        </p>
      ))}
    </div>
  );
};
