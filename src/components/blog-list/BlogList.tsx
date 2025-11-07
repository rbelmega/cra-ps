import React from 'react';
import Link from 'next/link';
import styles from './BlogList.module.scss';
import { getPosts } from '../../domain/blog';

export const BlogList: React.FC = async () => {
  const posts = await getPosts();

  if (posts.length === 0) {
    return (
      <div className={styles.blog}>
        <p className={styles.empty}>No blog posts available.</p>
      </div>
    );
  }

  return (
    <div className={styles.blog}>
      <div className={styles.postsGrid}>
        {posts.map((post) => (
          <Link key={post.file} href={`/blog/${post.id}`} className={styles.postCard}>
            <div className={styles.postContent}>
              <div className={styles.postHeader}>
                <span className={styles.date}>{post.date}</span>
              </div>
              <h3 className={styles.postTitle}>{post.name}</h3>
              <div className={styles.postArrow}>
                <i className="fa fa-arrow-right" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
