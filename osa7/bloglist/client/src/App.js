import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import { setUser } from './reducers/userReducer';
import { initBlogs } from './reducers/blogReducer';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user);

  const togglableRef = useRef();
  const blogFormRef = useRef();

  const initUser = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  };

  // Initiate blogs and users here
  useEffect(() => {
    dispatch(initBlogs());
    initUser();
  }, [dispatch]);

  return (
    <div>
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
            <BlogList blogFormRef={blogFormRef} />
            {/* // TODO: Possible get rid of these refs */}
          <Togglable buttonLabel='new blog' ref={togglableRef}>
            <BlogForm togglableRef={togglableRef} ref={blogFormRef} />
          </Togglable>
        </div>
      )}
    </div>
  );
};

export default App;
