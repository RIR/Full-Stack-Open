import React from 'react';

const User = ({ user }) => {
  if (!user) {
    return null;
  }

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
