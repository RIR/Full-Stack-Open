import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likeBlog, removeBlog } from '../reducers/blogReducer';

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const { title, author, url, likes, user = { username: 'random' } } = blog;

  const [displayFull, setDisplayFull] = useState(false);

  const dispatch = useDispatch();
  const currentUser = useSelector(({ currentUser }) => currentUser);

  const toggleView = () => setDisplayFull(!displayFull);

  const handleLike = () => {
    console.log('TYKÄTTY BLOGI:', { ...blog });
    const updatedBlog = { ...blog, user: blog.user.id, likes: (blog.likes += 1) };
    dispatch(likeBlog(updatedBlog));
  };

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${title} by ${author}?`)) {
      dispatch(removeBlog(blog));
    }
  };

  const displayButton = (
    <button onClick={toggleView} className='blog-view-button'>
      {displayFull ? 'hide' : 'view'}
    </button>
  );

  const likeButton = (
    <button onClick={handleLike} className='blog-like-button'>
      like
    </button>
  );

  const removeButton = (
    <button style={{ background: '#34c0eb' }} onClick={handleRemove} className='blog-remove-button'>
      remove
    </button>
  );

  return (
    <div style={blogStyle}>
      <div>
        {title} {author} {displayButton}
      </div>
      {displayFull && (
        <div>
          <p>{url}</p>
          <p className='likes'>
            {likes} {likeButton}
          </p>
          <p>{user && user.username}</p>
          {currentUser.username === user.username && removeButton}
        </div>
      )}
    </div>
  );
};

export default Blog;
