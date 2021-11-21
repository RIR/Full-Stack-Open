import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getAnecdote = async (id) => {
  const url = `${baseUrl}/${id}`;
  const response = await axios.get(url);
  return response.data;
};

const createNew = async (content) => {
  const anecdote = { content, votes: 0 };
  const response = await axios.post(baseUrl, anecdote);
  return response.data;
};

const vote = async (id, votes) => {
  const url = `${baseUrl}/${id}`;

  const response = await axios.patch(url, { votes: (votes += 1) });
  return response.data;
};

export default { getAll, getAnecdote, createNew, vote };
