import { List, ListItem, ListSubheader } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

const User = () => {
  const { id } = useParams();
  const user = useSelector(({ users }) => users.find((user) => user.id === id));

  return (
    <div>
      <h2>{user.name}</h2>
      <List
        subheader={
          <ListSubheader component='div' id='nested-list-subheader'>
            Added Blogs
          </ListSubheader>
        }>
        {user.blogs.map((blog, i) => (
          <ListItem disablePadding key={blog.id} id={i}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default User;
