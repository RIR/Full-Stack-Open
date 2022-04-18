import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { ALL_BOOKS, ALL_GENRES } from '../queries';

const Books = () => {
  const [chosenGenre, setChosenGenre] = useState('');

  const { loading: booksDataLoading, data: bookData, refetch } = useQuery(ALL_BOOKS);

  // Apollo seems to cache info a lot so this is not that bad
  const { loading: genreDataLoading, data: genreData } = useQuery(ALL_GENRES);

  useEffect(() => {
    refetch({ genre: chosenGenre });
    console.log('REFETCHED');
  }, [chosenGenre]); // eslint-disable-line

  /*
  ```js
   Seems like solution like
    const { loading: booksDataLoading, data: bookData } = useQuery(ALL_BOOKS, {
     variables: { genre: chosenGenre },
   });
   ```
   would work too, but there were some possible issues with loading when refreshing the page
   */

  if (booksDataLoading || genreDataLoading) {
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
