import { Button, TextField } from '@material-ui/core';
import React, { useState, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBlog } from '../reducers/blogReducer';
import { TogglableContext } from './Togglable';

const initialBlogState = {
  title: '',
  author: '',
  url: '',
};

const BlogForm = () => {
  const toggleVisibility = useContext(TogglableContext);

  const dispatch = useDispatch();
  const currentUser = useSelector(({ currentUser }) => currentUser);
  const [newBlog, setNewBlog] = useState(initialBlogState);

  useEffect(() => {
    if (currentUser == null) resetBlogForm();
  }, [currentUser]);

  const resetBlogForm = () => setNewBlog(initialBlogState);

  const handleChange = (event) => {
    const value = event.target.value;
    setNewBlog({
      ...newBlog,
      [event.target.name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    toggleVisibility();
    dispatch(addBlog(newBlog));
    resetBlogForm();
  };

  return (
    <div style={{ margin: '15px 0px' }}>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField label='title' type='text' value={newBlog.title} id='title' name='title' onChange={handleChange} />
        </div>
        <div>
          <TextField
            label='author'
            type='text'
            value={newBlog.author}
            id='author'
            name='author'
            onChange={handleChange}
          />
        </div>
        <div style={{marginBottom: '10px'}}>
          <TextField label='url' type='url' value={newBlog.url} id='url' name='url' onChange={handleChange} />
        </div>
        <Button variant='contained' color='primary' id='create-blog-button' type='submit'>
          Create
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;
