import { blogService } from "../services";

const initialState = null;

// Action creators
export const setCurrentUser = (user) => {
  /*
  Questionable. I'll go with this,
  but I guess an own reducer or a
  function that uses the state could
  be used in services.Basically this is
  the easy way now.
  */
  blogService.setToken(user.token);
  return async (dispatch) => {
    dispatch({
      type: 'SET_CURRENT_USER',
      data: user,
    });
  };
};

export const clearCurrentUser = () => {
  return async (dispatch) => {
    dispatch({
      type: 'CLEAR_CURRENT_USER',
    });
  };
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return action.data;
    case 'CLEAR_CURRENT_USER':
      return initialState;
    default:
      return state;
  }
};

export default reducer;
