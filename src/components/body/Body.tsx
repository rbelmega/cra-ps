import React from 'react';
import { Twitter } from '../twitter';
import { Bio } from '../bio';
import { Contacts } from '../contacts';
import { Footer } from '../footer';
import './body.scss';

export const Body = async () => {
  const response = await fetch('https://belmeha.com/bio.json');
  const data = await response.json();

  return (
    <div className="body-container">
      <div className="wrapper body-wrapper">
        <Twitter />
        <Bio bio={data.bio} activities={data.activities} />
        <div className="me">
          <section className="profile-image-wrapper">
            <div className="profile-image" />
          </section>
          {/*<p><i className='fa fa-map-marker'></i>Ivano-Frankivsk, Ukraine</p>*/}
          <Contacts />
        </div>
      </div>
      <Footer />
    </div>
  );
};
