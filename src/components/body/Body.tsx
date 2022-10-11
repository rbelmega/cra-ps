import React, { useEffect, useState } from 'react';
import { Twitter } from '../twitter';
import { Bio } from '../bio';
import { Contacts } from '../contacts';
import { Footer } from '../footer';

export const Body = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch('./bio.json')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    <div
      style={{
        margin: '0 5%',
        backgroundColor: '#252525',
        borderTop: '3px solid #00a3cd',
      }}
    >
      <div
        className="wrapper"
        style={{
          alignItems: 'stretch',
        }}
      >
        <Twitter />
        <Bio bio={data.bio} activities={data.activities} />

        <div className="me" style={{ padding: 20 }}>
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
