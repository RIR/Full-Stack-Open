const initialState = "";

// Action creators
export const setFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    filter: filter
  };
};


// Reducer
const reducer = (state = initialState, action) => {
  console.log('state now: ', state);
  console.log('action', action);

  switch (action.type) {
    case 'SET_FILTER':
      return action.filter;
    default:
      return initialState;
  }
};

export default reducer;
