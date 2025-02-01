import React from 'react';
import Link from 'next/link';

export const BlogList = async () => {
  const response = await fetch('https://www.belmeha.com/posts.json');
  const posts = response.ok ? await response.json() : [];

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
