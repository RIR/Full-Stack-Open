import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { Blog, BlogForm, BlogList, LoginForm, NavBar, Notification, User, UserList, Togglable } from './components';
import { setCurrentUser } from './reducers/currentUserReducer';

const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(({ currentUser }) => currentUser);

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

  return (
    <div>
      {currentUser === null ? (
        <LoginForm />
      ) : (
        <div>
          <NavBar />
          <h1>Blog App</h1>
          <Togglable buttonLabel='new blog'>
            <BlogForm />
          </Togglable>
          <Notification />
          <Routes>
            <Route path='blogs/' element={<BlogList />} />
            <Route path='blogs/:id' element={<Blog />} />
            <Route path='users/' element={<UserList />} />
            <Route path='users/:id' element={<User />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
