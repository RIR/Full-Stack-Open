import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { setCurrentUser } from '../reducers/currentUserReducer';
import Notification from './Notification';
import { loginService } from '../services';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';

const LoginForm = () => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const clearForm = () => {
    setUsername('');
    setPassword('');
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      // Persist user to localStorage
      window.localStorage.setItem('loggedUser', JSON.stringify(user));

      clearForm();
      dispatch(setCurrentUser(user));

      navigate('/');
      dispatch(setNotification({ type: 'success', content: `user ${user.username} logged in` }));
    } catch (exception) {
      dispatch(setNotification({ type: 'error', content: 'wrong username or password' }));
    }
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            value={username}
            id='username'
            label='username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div style={{marginBottom: '10px'}}>
          <TextField
            label='password'
            type='password'
            value={password}
            id='password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button variant='contained' color='primary' type='submit'>
          login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
