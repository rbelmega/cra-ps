import React from 'react';
import Image from 'next/image';

import { BlogList } from '../blog-list';
import { Bio } from '../bio';
import { Contacts } from '../contacts';
import { Footer } from '../footer';
import { loadPublicJson } from '../../domain/public-content';
import styles from './Body.module.scss';

interface BioData {
  headline?: string;
  summary?: string;
  bio: string;
  highlights?: Array<{
    label: string;
    value: string;
  }>;
  stack?: string[];
}

export const Body: React.FC = async () => {
  const data = await loadPublicJson<BioData>('bio.json', { bio: '' });

  return (
    <div className={styles.page}>
      <section className={styles.intro}>
        <div className={styles.eyebrow}>
          <p className={styles.kicker}>Product UI</p>
        </div>

        <div className={styles.copy}>
          <Bio
            headline={data.headline}
            summary={data.summary}
            highlights={data.highlights}
            stack={data.stack}
            bio={data.bio}
          />
        </div>

        <aside className={styles.sidebar}>
          <section className={styles.imageFrame}>
            <Image
              src="/assets/img/me2.png"
              alt="Rostyslav Belmeha"
              width={255}
              height={255}
              fetchPriority="high"
              loading="eager"
            />
          </section>
          <section className={styles.connectSection}>
            <p className={styles.connectLabel}>Connect</p>
            <Contacts />
          </section>
        </aside>
      </section>

      <section className={styles.writingSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Writing</h2>
        </div>
        <BlogList />
      </section>

      <Footer />
    </div>
  );
};
