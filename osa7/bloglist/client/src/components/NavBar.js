import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearCurrentUser } from '../reducers/currentUserReducer';

const NavBar = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(({ currentUser }) => currentUser);

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    dispatch(clearCurrentUser());
  };

  return (
    <AppBar position='static'>
      <Toolbar>
        <Button color='inherit' component={Link} to='/'>
          Blogs
        </Button>
        <Button color='inherit' component={Link} to='/users'>
          Users
        </Button>
        <Typography>{currentUser.name} logged in </Typography>
        <Button color='inherit' onClick={handleLogout} id='log-out-button' sx={{ alignSelf: 'end' }}>
          log out
        </Button>
      </Toolbar>
    </AppBar>
  );
};
export default NavBar;
