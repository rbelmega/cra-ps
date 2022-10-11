import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export const BlogList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('./posts.json')
      .then((resp) => resp.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);

  return (
    <div className="blog">
      {posts.map((post) => {
        return (
          <p key={post.file}>
            <i className="fa fa-list-alt" />
            <span className="date">{post.date}</span>
            <Link href={`/blog/${post.id}`}>
              <span className="post">{post.name}</span>
            </Link>
          </p>
        );
      })}
    </div>
  );
};
