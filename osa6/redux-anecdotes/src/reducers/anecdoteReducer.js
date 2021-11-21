import anecdoteService from '../services/anecdotes';

// Action creators
export const voteAnecdote = (id) => {
  return async (dispatch) => {
    dispatch({
      type: 'VOTE_ANECDOTE',
      data: id,
    });
  };
};

export const addAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({
      type: 'ADD_ANECDOTE',
      data: newAnecdote,
    });
  };
};

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    });
  };
};
// Reducer
const reducer = (state = [], action) => {
  console.log('state now: ', state);
  console.log('action', action);

  switch (action.type) {
    case 'VOTE_ANECDOTE':
      return state.map((anecdote) => {
        if (anecdote.id === action.data) {
          return { ...anecdote, votes: (anecdote.votes += 1) };
        } else {
          return anecdote;
        }
      });
    case 'ADD_ANECDOTE':
      return [...state, action.data];
    case 'INIT_ANECDOTES':
      return action.data;
    default:
      return state;
  }
};

export default reducer;
