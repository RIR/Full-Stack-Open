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

  const logOutInfoAndButton = (
    <p>
      {currentUser.name} logged in{' '}
      <button onClick={handleLogout} id='log-out-button'>
        log out
      </button>
    </p>
  );

  return (
    <div style={{ backgroundColor: 'lightgrey', height: 'auto', padding: 0, margin: 0 }}>
      <ul className='navBar'>
        <li>
          <Link to='/blogs'>Blogs</Link>
        </li>
        <li>
          <Link to='/users'>Users</Link>
        </li>
        <li>{logOutInfoAndButton}</li>
      </ul>
    </div>
  );
};
export default NavBar;
