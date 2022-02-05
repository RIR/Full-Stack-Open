import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCurrentUser } from '../reducers/currentUserReducer';
import Blog from './Blog';
import Notification from './Notification';

const BlogList = ({ blogFormRef }) => {
  const dispatch = useDispatch();

  const currentUser = useSelector(({ currentUser }) => currentUser);

  const byLikes = (a, b) => b.likes - a.likes;
  const blogs = useSelector(({ blogs }) => blogs.sort(byLikes));

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    dispatch(clearCurrentUser());
    blogFormRef.current.resetBlogForm();
  };

  /*
    Having the log out button here feels dumb
    Also would get rid ot the ref with different
    composition, but using now what was given
    in assignment.
  */
  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {currentUser.name} logged in{' '}
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