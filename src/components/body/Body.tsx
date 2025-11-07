import React from 'react';
import Image from 'next/image';

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
  const response = await fetch('https://www.belmeha.com/bio.json');
  const data: BioData = response.ok ? await response.json() : { bio: '' };

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
