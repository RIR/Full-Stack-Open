import React from 'react';
import PropTypes from 'prop-types';
import Blog from './Blog';
import Notification from './Notification';

const BlogList = ({ blogs, user, message, likeBlog, removeBlog, handleLogout }) => {
  const sortBylikes = (a, b) => b.likes - a.likes;

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <p>
        {user.name} logged in <button onClick={handleLogout} id='log-out-button'>log out</button>
      </p>
      <ul>
        {blogs.sort(sortBylikes).map((blog, i) => (
          <li key={blog.id} id={i}>
            <Blog blog={blog} like={likeBlog} remove={removeBlog} user={user} />
          </li>
        ))}
      </ul>
    </div>
  );
};

BlogList.propTypes = {
  message: PropTypes.exact({
    type: PropTypes.string,
    content: PropTypes.string,
  }),
};

export default BlogList;