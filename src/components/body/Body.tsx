import React from 'react';
import Image from 'next/image';
import { readFile } from 'fs/promises';
import { join } from 'path';

import { BlogList } from '../blog-list';
import { Bio } from '../bio';
import { Contacts } from '../contacts';
import { Footer } from '../footer';
import './body.scss';

interface BioData {
  bio: string;
  activities?: Array<{
    iconClass: string;
    text: string;
  }>;
}

export const Body: React.FC = async () => {
  let data: BioData = { bio: '' };

  // Try to read from local file first
  try {
    const filePath = join(process.cwd(), 'public', 'bio.json');
    const fileContents = await readFile(filePath, 'utf8');
    data = JSON.parse(fileContents);
  } catch (localError) {
    // Fallback to remote if local file doesn't exist
    try {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.belmeha.com';
      const response = await fetch(`${baseUrl}/bio.json`, {
        cache: 'no-store'
      });
      if (response.ok) {
        data = await response.json();
      }
    } catch (fetchError) {
      console.error('Error loading bio.json:', fetchError);
    }
  }

  return (
    <div className="body-container">
      <div className="wrapper body-wrapper">
        <BlogList />
        <Bio bio={data.bio} activities={data.activities} />
        <div className="me">
          <section className="profile-image-wrapper">
            <Image
              src="/assets/img/me.webp"
              alt="profile image"
              width={255}
              height={255}
              fetchPriority="high"
              loading="eager"
            />
          </section>
          {/*<p><i className='fa fa-map-marker'></i>Ivano-Frankivsk, Ukraine</p>*/}
          <Contacts />
        </div>
      </div>
      <Footer />
    </div>
  );
};
