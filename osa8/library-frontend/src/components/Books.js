import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { ALL_BOOKS } from '../queries';

const Books = () => {
  const { loading, data } = useQuery(ALL_BOOKS);
  const [chosenGenre, setChosenGenre] = useState('');

  if (loading) {
    return <div>loading...</div>;
  }

  const books = data.allBooks;
  const filteredBooks = chosenGenre === '' ? books : books.filter((book) => book.genres.includes(chosenGenre));
  const genres = books.flatMap((book) => book.genres);

  return (
    <div>
      <h2>books</h2>
      {chosenGenre && <p>in genre <strong>{chosenGenre}</strong></p>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((genre) => (
          <button key={genre} onClick={() => setChosenGenre(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => setChosenGenre('')}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
