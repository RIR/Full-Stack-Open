import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { commentBlog, likeBlog, removeBlog } from '../reducers/blogReducer';

const Blog = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const blog = useSelector(({ blogs }) => blogs.find((blog) => blog.id === id));
  const currentUser = useSelector(({ currentUser }) => currentUser);

  const [comment, setComment] = useState('');

  // Like control logic
  const handleLike = () => {
    const updatedBlog = { ...blog, user: blog.user.id, likes: (blog.likes += 1) };
    dispatch(likeBlog(updatedBlog));
  };

  // Remove control logic
  const handleRemove = () => {
    if (window.confirm(`Remove blog ${title} by ${author}?`)) {
      dispatch(removeBlog(blog));
    }
  };

  // Comment control logic
  const handleCommentChange = (event) => {
    const value = event.target.value;
    setComment(value);
  };

  const handleSubmitComment = (event) => {
    event.preventDefault();
    dispatch(commentBlog(blog.id, comment));
    setComment('');
  };

  // Buttons
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

  const { title, author, url, likes, user = { username: 'random' }, comments = [] } = blog;
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
      <h3>comments</h3>
      <form onSubmit={handleSubmitComment}>
        <div>
          <input type='text' value={comment} id='comment' name='comment' onChange={handleCommentChange} />
        </div>
        <button type='submit' id='create-blog-button'>
          add comment
        </button>
      </form>
      <ul>
        {comments.map((comment, i) => (
          <li key={i} id={i}>
            {comment}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
