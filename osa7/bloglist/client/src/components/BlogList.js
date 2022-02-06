import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setBlogs } from '../reducers/blogReducer';

const BlogList = () => {
  const blogItemStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const dispatch = useDispatch();

  const byLikes = (a, b) => b.likes - a.likes;
  const blogs = useSelector(({ blogs }) => blogs.sort(byLikes));

  // Initiate blogs
  useEffect(() => {
    dispatch(setBlogs());
  }, [dispatch]);

  return (
    <div>
      <h2>blogs</h2>
      <ul>
        {blogs.map((blog, i) => (
          <li key={blog.id} id={i} style={blogItemStyle}>
            <Link to={blog.id}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
