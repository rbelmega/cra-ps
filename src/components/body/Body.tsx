import React from 'react';
import Image from 'next/image';

import { BlogList } from '../blog-list';
import { Bio } from '../bio';
import { Contacts } from '../contacts';
import { Footer } from '../footer';
import { loadPublicJson } from '../../domain/public-content';
import './body.scss';

interface BioData {
  bio: string;
  activities?: Array<{
    iconClass: string;
    text: string;
  }>;
}

export const Body: React.FC = async () => {
  const data = await loadPublicJson<BioData>('bio.json', { bio: '' });

  return (
    <div className="body-container">
      <div className="wrapper body-wrapper">
        <BlogList />
        <Bio bio={data.bio} activities={data.activities} />
        <div className="me">
          <section className="profile-image-wrapper">
            <Image
              src="/assets/img/me2.png"
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
