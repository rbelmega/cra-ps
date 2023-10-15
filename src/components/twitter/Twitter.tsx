'use client';

import React, { useEffect, useState } from 'react';

export const Twitter = () => {
  const [classLoaded, setClassLoaded] = useState(
    typeof window !== 'undefined' && window.twttr ? 'loaded' : ''
  );

  const getScript = () => {
    if (typeof window === 'undefined') {
      return;
    }

    window.twttr =
      window.twttr ||
      (function (d, s, id) {
        var js,
          fjs = d.getElementById('tweets'),
          t = window.twttr || {};
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = 'https://platform.twitter.com/widgets.js';
        fjs.parentNode.insertBefore(js, fjs);

        t._e = [];
        t.ready = function (f) {
          t._e.push(f);
        };

        return t;
      })(document, 'script', 'twitter-wjs');

    // / Wait for the asynchronous resources to load
    window.twttr?.ready(function () {
      window.twttr.events.bind('rendered', function () {
        setClassLoaded('loaded');
      });
    });
  };

  useEffect(() => {
    getScript();
  }, []);

  return (
    <div className="twitter">
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
        <a
          className="twitter-timeline"
          data-chrome="nofooter noheader noborder noscrollbar transparent"
          href="https://twitter.com/izzz0"
          data-theme="dark"
          data-link-color="#000"
          data-widget-id="694262144762822658"
        >
          Tweets by @izzz0
        </a>
        <div id="tweets" />
      </div>
    </div>
  );
};

export default Twitter;
