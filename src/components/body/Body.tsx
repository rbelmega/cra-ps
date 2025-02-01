import React from 'react';
import Image from 'next/image';

import { Twitter } from '../twitter';
import { Bio } from '../bio';
import { Contacts } from '../contacts';
import { Footer } from '../footer';
import './body.scss';

export const Body = async () => {
  const response = await fetch('https://www.belmeha.com/bio.json');
  const data = response.ok ? await response.json() : {};

  return (
    <div className="body-container">
      <div className="wrapper body-wrapper">
        <Twitter />
        <Bio bio={data.bio} activities={data.activities} />
        <div className="me">
          <section className="profile-image-wrapper">
            <Image
              src="/assets/img/me.webp"
              alt="profile image"
              width={255}
              height={255}
              fetchPriority="high"
            ></Image>
          </section>
          {/*<p><i className='fa fa-map-marker'></i>Ivano-Frankivsk, Ukraine</p>*/}
          <Contacts />
        </div>
      </div>
      <Footer />
    </div>
  );
};
