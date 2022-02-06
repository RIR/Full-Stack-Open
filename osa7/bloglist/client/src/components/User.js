import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const User = () => {
  const { id } = useParams();
  const user = useSelector(({ users }) => users.find((user) => user.id === id));

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      {user.blogs.map((blog, i) => (
        <li key={blog.id} id={i}>
          {blog.title}
        </li>
      ))}
    </div>
  );
};

export default User;
