const initialState = '';

// Action creators
export const setNotification = (content) => {
  return {
    type: 'SET_NOTIFICATION',
    data: {
      content: content,
    },
  };
};

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  };
};

// Reducer
const reducer = (state = initialState, action) => {
  console.log('state now: ', state);
  console.log('action', action);

  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data.content;
    case 'CLEAR_NOTIFICATION':
      return initialState;
    default:
      return state;
  }
};

export default reducer;
