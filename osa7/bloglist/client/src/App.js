import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import { setCurrentUser } from './reducers/currentUserReducer';
import { setBlogs } from './reducers/blogReducer';
import UserList from './components/UserList';

const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(({ currentUser }) => currentUser);
  const blogFormRef = useRef();

  // Initiate blogs and user here
  useEffect(() => {
    dispatch(setBlogs());
    const initUser = () => {
      const loggedUserJSON = window.localStorage.getItem('loggedUser');
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        dispatch(setCurrentUser(user));
      }
    };
    initUser();
  }, [dispatch]);


  // TODO:soon, I assume :)
  // const blogMatch = useRouteMatch('/blogs/:id');
  // const blog = blogMatch ? blogs.find((blog) => blog.id === Number(blogMatch.params.id)) : null;

  return (
    <div>
      {currentUser === null ? (
        <LoginForm />
      ) : (
        <div>
          <BlogList blogFormRef={blogFormRef} />
          <UserList />
          <Togglable buttonLabel='new blog'>
            <BlogForm ref={blogFormRef} />
          </Togglable>
        </div>
      )}
    </div>
  );
};

export default App;
