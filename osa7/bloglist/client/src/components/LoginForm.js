import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { setUser } from '../reducers/userReducer';
import Notification from './Notification';
import { loginService } from '../services';

const LoginForm = () => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const dispatch = useDispatch();

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

      dispatch(setUser(user));
      clearForm();

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
          username
          <input
            type='text'
            value={username}
            id='username'
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            id='password'
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit' id='login-button'>
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
