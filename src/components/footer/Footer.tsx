import React from 'react';
import styles from './Footer.module.scss';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <p className={styles.copyright}>
            © {currentYear} Rostyslav Belmeha. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};
