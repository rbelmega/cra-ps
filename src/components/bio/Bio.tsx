import React from 'react';

export const Bio = ({ activities, bio }) => {
  return (
    <div className="bio">
      <section>
        <article
          style={{
            margin: '10px 0',
          }}
        >
          <h3
            style={{
              fontSize: 30,
              fontWeight: 'lighter',
              marginBottom: 20,
            }}
          >
            About
          </h3>

          {activities?.map((activity, index) => (
            <h3 key={index}>
              <i className={activity.iconClass} />
              {activity.text}
            </h3>
          ))}
        </article>
        <p
          className="bio-description"
          style={{
            margin: '50px 0  0',
          }}
        >
          {bio}
        </p>
      </section>
    </div>
  );
};
