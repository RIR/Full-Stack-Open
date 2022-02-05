import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useMatch } from 'react-router-dom';

import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import { clearCurrentUser, setCurrentUser } from './reducers/currentUserReducer';
import { setBlogs } from './reducers/blogReducer';
import UserList from './components/UserList';
import Blog from './components/Blog';
import { setUsers } from './reducers/userReducer';
import User from './components/User';
import Notification from './components/Notification';

const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(({ currentUser }) => currentUser);
  const users = useSelector(({ users }) => users);
  const blogs = useSelector(({ blogs }) => blogs);

  const blogFormRef = useRef();

  // Initiate blogs
  useEffect(() => {
    dispatch(setBlogs());
  }, [dispatch]);

  // Initiate users
  useEffect(() => {
    dispatch(setUsers());
  }, [blogs.length]);

  // Initiate currentUser
  useEffect(() => {
    const initUser = () => {
      const loggedUserJSON = window.localStorage.getItem('loggedUser');
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        dispatch(setCurrentUser(user));
      }
    };
    initUser();
  }, [dispatch]);

  // Log out logic, consider separating from here.
  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    dispatch(clearCurrentUser());
    blogFormRef.current.resetBlogForm();
  };

  const logOutInfoAndButton = () => (
    <p>
      {currentUser.name} logged in{' '}
      <button onClick={handleLogout} id='log-out-button'>
        log out
      </button>
    </p>
  );

  const blogMatch = useMatch('blogs/:id');
  const blog = blogMatch ? blogs.find((blog) => blog.id === blogMatch.params.id) : null;

  const userMatch = useMatch('users/:id');
  const user = userMatch ? users.find((user) => user.id === userMatch.params.id) : null;

  return (
    <div>
      {currentUser === null ? (
        <LoginForm />
      ) : (
        <div>
          <h1>Blog App</h1>
          {logOutInfoAndButton()}
          <Togglable buttonLabel='new blog'>
            <BlogForm ref={blogFormRef} />
          </Togglable>
          <Notification />
          <Routes>
            <Route path='blogs/' element={<BlogList blogs={blogs} />} />
            <Route path='blogs/:id' element={<Blog blog={blog} />} />
            <Route path='users/' element={<UserList users={users} />} />
            <Route path='users/:id' element={<User user={user} />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
