import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

import { setUsers } from '../reducers/userReducer';

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector(({ users }) => users);
  const blogs = useSelector(({ blogs }) => blogs);

  // Initiate users
  useEffect(() => {
    dispatch(setUsers());
  }, [dispatch, blogs.length]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell align='right'>Blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, i) => (
              <TableRow key={user.id} id={i} hover={true}>
                <TableCell>
                  <Link to={user.id}>{user.name}</Link>
                </TableCell>
                <TableCell align='right'>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserList;
