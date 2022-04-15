import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { ALL_BOOKS, ALL_GENRES } from '../queries';

const Books = () => {
  const [chosenGenre, setChosenGenre] = useState('');
  // Apparently this could be done for example with this or using refetch() inside useEffect
  const { loading, data: bookData } = useQuery(ALL_BOOKS, {
    variables: { genre: chosenGenre },
  });

  // Apollo seems to cache info a lot so this is not that bad
  const { data: genreData } = useQuery(ALL_GENRES);

  if (loading) {
    return <div>loading...</div>;
  }

  const books = bookData.allBooks;
  const genres = genreData.allGenres;

  return (
    <div>
      <h2>books</h2>
      {chosenGenre && (
        <p>
          in genre <strong>{chosenGenre}</strong>
        </p>
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((book) => (
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
