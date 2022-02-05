import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import { setUser } from './reducers/userReducer';
import { setBlogs } from './reducers/blogReducer';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user);

  const blogFormRef = useRef();

  // Initiate blogs and users here
  useEffect(() => {
    dispatch(setBlogs());
    const initUser = () => {
      const loggedUserJSON = window.localStorage.getItem('loggedUser');
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        dispatch(setUser(user));
        blogService.setToken(user.token);
      }
    };
    initUser();
  }, [dispatch]);

  return (
    <div>
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <BlogList blogFormRef={blogFormRef} />
          <Togglable buttonLabel='new blog'>
            <BlogForm ref={blogFormRef} />
          </Togglable>
        </div>
      )}
    </div>
  );
};

export default App;
