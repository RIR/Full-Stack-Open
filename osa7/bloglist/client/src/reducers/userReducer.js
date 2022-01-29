const initialState = null;

// Action creators
export const setUser = (user) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_USER',
      data: {
        content: user,
      },
    });
  };
};

export const clearUser = () => {
  return async (dispatch) => {
    dispatch({
      type: 'CLEAR_USER',
    });
  };
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data.content;
    case 'CLEAR_USER':
      return initialState;
    default:
      return state;
  }
};

export default reducer;
