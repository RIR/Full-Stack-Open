import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BlogForm, Togglable } from '.';
import { setBlogs } from '../reducers/blogReducer';

const BlogList = () => {
  const dispatch = useDispatch();

  const byLikes = (a, b) => b.likes - a.likes;
  const blogs = useSelector(({ blogs }) => blogs.sort(byLikes));

  // Initiate blogs
  useEffect(() => {
    dispatch(setBlogs());
  }, [dispatch]);

  return (
    <div>
      <Togglable buttonLabel='new blog'>
        <BlogForm />
      </Togglable>
      <TableContainer component={Paper}>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align='right'>Author</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.map((blog, i) => (
              <TableRow key={blog.id} hover={true}>
                <TableCell sortDirection='asc'>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </TableCell>
                <TableCell align='right'>{blog.author}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BlogList;
