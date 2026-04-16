import React from 'react';
import styles from './Header.module.scss';

export const Header: React.FC = () => (
  <header className={styles.header}>
    <div className={styles.inner}>
      <div className={styles.identity}>
        <h1 className={styles.name}>Rostyslav Belmeha</h1>
        <p className={styles.role}>Front-end Developer at SoftServe</p>
      </div>
      <p className={styles.meta}>11+ years · React / Next.js · Product-minded UI engineering</p>
    </div>
  </header>
);
