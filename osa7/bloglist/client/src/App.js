import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home, LoginForm } from './components';
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
    <Routes>
      <Route path='*' element={currentUser ? <Home /> : <Navigate to='/login' />} />
      <Route path='/login' element={<LoginForm />} />
    </Routes>
  );
};

export default App;
