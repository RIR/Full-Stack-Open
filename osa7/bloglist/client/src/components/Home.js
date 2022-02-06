import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Container from '@material-ui/core/Container';

import { Blog, BlogList, NavBar, Notification, User, UserList } from '.';

const Home = () => {
  return (
    <Container>
      <div>
        <NavBar />
        <h1>Blog App</h1>
        <Notification />
        <Routes>
          <Route path='/' element={<BlogList />} />
          <Route path='blogs/:id' element={<Blog />} />
          <Route path='users/' element={<UserList />} />
          <Route path='users/:id' element={<User />} />
        </Routes>
      </div>
    </Container>
  );
};

export default Home;
