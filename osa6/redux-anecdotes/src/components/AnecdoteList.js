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

  const vote = (id, content, votes) => {
    // Vote
    dispatch(voteAnecdote(id, votes));

    // Notify which anecdote was voted
    dispatch(setNotification(`You voted "${content}"`));
  };

  const byVotes = (a, b) => b.votes - a.votes;

  return (
    <div>
      {anecdotes.sort(byVotes).map(({ id, content, votes }) => (
        <div key={id}>
          <div>{content}</div>
          <div>
            has {votes}
            <button onClick={() => vote(id, content, votes)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
