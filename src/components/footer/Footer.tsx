import React from 'react';
import { BlogList } from '../blog-list';
import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <div className={styles.bloglistWrapper}>
      <BlogList />
    </div>
  );
};
