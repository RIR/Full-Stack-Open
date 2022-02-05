import React, { useEffect } from 'react';
import { Routes, Route, Link, useMatch } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { setUsers } from '../reducers/userReducer';
import User from './User';

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector(({ users }) => users);
  const blogs = useSelector(({ blogs }) => blogs);

  // Initiate users here
  useEffect(() => {
    dispatch(setUsers());
  }, [dispatch, blogs.length]);

  const userMatch = useMatch('/users/:id');
  const user = userMatch ? users.find((user) => user.id === userMatch.params.id) : null;

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={user.id} id={i}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Routes>
        <Route path='/users/:id' element={<User user={user} />} />
      </Routes>
    </div>
  );
};

export default UserList;
