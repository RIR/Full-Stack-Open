import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../reducers/userReducer';
import Blog from './Blog';
import Notification from './Notification';

const BlogList = ({ blogFormRef }) => {
  const dispatch = useDispatch();

  const user = useSelector(({ user }) => user);
  const byLikes = (a, b) => b.likes - a.likes;
  const blogs = useSelector(({ blogs }) => blogs.sort(byLikes));

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    dispatch(clearUser());
    blogFormRef.current.resetBlogForm();
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name} logged in{' '}
        <button onClick={handleLogout} id='log-out-button'>
          log out
        </button>
      </p>
      <ul>
        {blogs.map((blog, i) => (
          <li key={blog.id} id={i}>
            <Blog blog={blog} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
