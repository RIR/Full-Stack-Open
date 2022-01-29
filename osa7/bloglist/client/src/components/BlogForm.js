import React, { useState, useImperativeHandle } from 'react';
import { useDispatch } from 'react-redux';
import { addBlog } from '../reducers/blogReducer';

const initialBlogState = {
  title: '',
  author: '',
  url: '',
};

const BlogForm = React.forwardRef(({ togglableRef }, ref) => {
  const [newBlog, setNewBlog] = useState(initialBlogState);

  const dispatch = useDispatch();

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
    togglableRef.current.toggleVisibility();
    dispatch(addBlog(newBlog));
    resetBlogForm();
  };


  useImperativeHandle(ref, () => {
    return {
      resetBlogForm,
    };
  });

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title
          <input type='text' value={newBlog.title} id='title' name='title' onChange={handleChange} />
        </div>
        <div>
          author
          <input type='text' value={newBlog.author} id='author' name='author' onChange={handleChange} />
        </div>
        <div>
          url
          <input type='url' value={newBlog.url} id='url' name='url' onChange={handleChange} />
        </div>
        <button type='submit' id='create-blog-button'>
          Create
        </button>
      </form>
    </div>
  );
});

BlogForm.displayName = 'BlogForm';

export default BlogForm;
