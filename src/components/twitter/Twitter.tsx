'use client';

import React, { useState } from 'react';
import { Timeline } from 'react-twitter-widgets';

export const Twitter = () => {
  const [classLoaded, setClassLoaded] = useState('');

  return (
    <div className={classLoaded ? 'twitter loaded' : 'twitter'}>
      {!classLoaded && (
        <div className="sk-cube-grid">
          <div className="sk-cube sk-cube1" />
          <div className="sk-cube sk-cube2" />
          <div className="sk-cube sk-cube3" />
          <div className="sk-cube sk-cube4" />
          <div className="sk-cube sk-cube5" />
          <div className="sk-cube sk-cube6" />
          <div className="sk-cube sk-cube7" />
          <div className="sk-cube sk-cube8" />
          <div className="sk-cube sk-cube9" />
        </div>
      )}
      <div className={classLoaded}>
        <Timeline
          dataSource={{
            sourceType: 'profile',
            screenName: 'izzz0',
          }}
          options={{
            theme: 'dark',
          }}
          onLoad={() => setClassLoaded('loaded')}
        />
      </div>
    </div>
  );
};

export default Twitter;
