import userService from '../services/users';

// Action creators
export const setUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch({
      type: 'SET_USERS',
      data: users,
    });
  };
};

// Reducer
const reducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_USERS':
      return action.data;
    default:
      return state;
  }
};

export default reducer;
