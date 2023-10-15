import React from 'react';
import './bio.scss';

export const Bio = ({ activities, bio }) => {
  return (
    <div className="bio">
      <section>
        <article className="bio-article">
          <h3 className="bio-h3">About</h3>

          {activities?.map((activity, index) => (
            <h3 key={index}>
              <i className={activity.iconClass} />
              {activity.text}
            </h3>
          ))}
        </article>
        <p className="bio-description">{bio}</p>
      </section>
    </div>
  );
};
