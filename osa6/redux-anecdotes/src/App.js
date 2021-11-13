import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote, addAnecdote } from './reducers/anecdoteReducer';

const App = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state);

  const vote = (id) => {
    console.log('vote', id);
    dispatch(voteAnecdote(id));
  };

  const add = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    dispatch(addAnecdote(content));
  };

  const byVotes = (a, b) => b.votes - a.votes;

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort(byVotes).map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={add}>
        <div>
          <input name='anecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default App;
