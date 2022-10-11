import React, {  useState } from 'react';
import { BlogList } from '../blog-list';

export const Footer = () => {
  const [instagramData, setInstagramData] = useState([]);

  return (
    <div style={{}}>
      <div
        className="instagram-wrapper"
        style={{
          whiteSpace: 'nowrap',
          overflowY: 'auto',
        }}
      >
        {instagramData.map((img) => (
          <a key={img.link} href={img.link} target="_blank">
            <img src={img.images.thumbnail.url} />
          </a>
        ))}
      </div>
      <div
        style={{
          padding: 30,
        }}
      >
        <BlogList />
      </div>
    </div>
  );
};
