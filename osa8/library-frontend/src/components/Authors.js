import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';
import Select from 'react-select';

const Authors = ({ setError }) => {
  const { loading, data } = useQuery(ALL_AUTHORS);
  const [editAuthor, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data && !result.data.editAuthor) {
      setError('name not found');
    }
  }, [result.data]); // eslint-disable-line

  const [name, setName] = useState('');
  const [born, setBorn] = useState('');

  if (loading) {
    return <div>loading...</div>;
  }

  const authors = data.allAuthors;
  const authorsOptions = authors.map((author) => ({ value: author.name, label: author.name }));

  const submit = async (event) => {
    event.preventDefault();

    console.log('update author...');
    editAuthor({ variables: { name: name.value, setBornTo: parseInt(born) } });

    setName('');
    setBorn('');
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={submit}>
        <h2>Set birthyear</h2>
        <Select
          name='name'
          placeholder='name'
          defaultValue={name}
          value={name}
          onChange={setName}
          options={authorsOptions}
        />
        <div>
          born
          <input type='number' value={born} onChange={({ target }) => setBorn(target.value)} />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  );
};

export default Authors;
