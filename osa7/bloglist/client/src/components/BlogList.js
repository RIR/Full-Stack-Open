import React from 'react';
import { Link } from 'react-router-dom';

const BlogList = ({ blogs }) => {
  const blogItemStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const byLikes = (a, b) => b.likes - a.likes;
  const sortedBlogs = blogs.sort(byLikes);

  return (
    <div>
      <h2>blogs</h2>
      <ul>
        {sortedBlogs.map((blog, i) => (
          <li key={blog.id} id={i} style={blogItemStyle}>
            <Link to={blog.id}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
