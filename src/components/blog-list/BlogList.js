import React from 'react';
import { Link } from 'react-router-dom';

export const BlogList = ({ posts = [] }) => (
  <div className="blog">
    {posts.map(post => {
      return (
        <p key={post.file}>
          <i className="fa fa-list-alt" />
          <span className="date">{post.date}</span>
          <Link to={`/blog/${post.id}`}>
            <span className="post">{post.name}</span>
          </Link>
        </p>
      );
    })}
  </div>
);

export default BlogList;
