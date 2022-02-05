import blogService from '../services/blogs';
import { setNotification } from './notificationReducer';

// Action creators
export const setBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'SET_BLOGS',
      data: blogs,
    });
  };
};

export const addBlog = (blog) => {
  return async (dispatch) => {
    try {
      const createdBlog = await blogService.create(blog);

      dispatch({
        type: 'ADD_BLOG',
        data: createdBlog,
      });
      dispatch(
        setNotification({
          type: 'success',
          content: `a new blog ${createdBlog.title} by ${createdBlog.author} added`,
        })
      );
    } catch (error) {
      dispatch(setNotification({ type: 'error', content: 'Adding failed' }));
    }
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    try {
      const likedBlog = await blogService.update(blog);
      dispatch({
        type: 'LIKE_BLOG',
        data: likedBlog,
      });
      dispatch(
        setNotification({
          type: 'success',
          content: `Blog ${likedBlog.title} was liked`,
        })
      );
    } catch (error) {
      dispatch(setNotification({ type: 'error', content: 'liking failed' }));
    }
  };
};

export const removeBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog);
      dispatch({
        type: 'REMOVE_BLOG',
        data: blog.id,
      });
      dispatch(
        setNotification({
          type: 'success',
          content: `Blog ${blog.title} was removed`,
        })
      );
    } catch (error) {
      dispatch(setNotification({ type: 'error', content: 'Removing failed' }));
    }
  };
};

// Reducer
const reducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      return action.data;
    case 'ADD_BLOG':
      return [...state, action.data];
    case 'LIKE_BLOG':
      return state.map((blog) => {
        if (blog.id === action.data.id) {
          return action.data;
        } else {
          return blog;
        }
      });
    case 'REMOVE_BLOG':
      return state.filter((blog) => blog.id !== action.data);
    default:
      return state;
  }
};

export default reducer;
