import { useQuery } from '@apollo/client';
import React from 'react';
import { ALL_BOOKS, CURRENT_USER } from '../queries';

const Recommendations = () => {
  const { loading, data: bookData } = useQuery(ALL_BOOKS);
  const { data: currentUserData } = useQuery(CURRENT_USER);

  if (loading) {
    return <div>loading...</div>;
  }

  const favoriteGenre = currentUserData.me.favoriteGenre;
  const filteredBooks = bookData.allBooks.filter((book) => book.genres.includes(favoriteGenre));

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <strong>{favoriteGenre}</strong>
      </p>

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
    </div>
  );
};

export default Recommendations;
