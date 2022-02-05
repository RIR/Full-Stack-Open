import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likeBlog, removeBlog } from '../reducers/blogReducer';

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(({ currentUser }) => currentUser);

  const handleLike = () => {
    const updatedBlog = { ...blog, user: blog.user.id, likes: (blog.likes += 1) };
    dispatch(likeBlog(updatedBlog));
  };

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${title} by ${author}?`)) {
      dispatch(removeBlog(blog));
    }
  };

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

  if (!blog) {
    return null;
  }

  const { title, author, url, likes, user = { username: 'random' } } = blog;
  return (
    <div>
      <h2>{title}</h2>
      <div>
        <a href={url}>{url}</a>
        <p className='likes'>
          {likes} {likes === 1 ? 'like' : 'likes'} {likeButton}
        </p>
        <p>added by: {user && user.username}</p>
        {currentUser.username === user.username && removeButton}
      </div>
    </div>
  );
};

export default Blog;
