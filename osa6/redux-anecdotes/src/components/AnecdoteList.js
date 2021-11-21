import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification, clearNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ anecdotes, filter }) =>
    // Used toLowerCase here in purpose for easier UX IMO
    anecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  );

  const vote = (id, content) => {
    console.log('vote', id);
    // Vote
    dispatch(voteAnecdote(id));

    // Notify which anecdote was voted
    dispatch(setNotification(`You voted "${content}"`));
    setTimeout(() => dispatch(clearNotification()), 5000);
  };

  const byVotes = (a, b) => b.votes - a.votes;

  return (
    <div>
      {anecdotes.sort(byVotes).map(({ id, content, votes }) => (
        <div key={id}>
          <div>{content}</div>
          <div>
            has {votes}
            <button onClick={() => vote(id, content)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
