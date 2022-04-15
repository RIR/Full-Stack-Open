import { useApolloClient } from '@apollo/client';
import React, { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import LoginForm from './components/LoginForm';
import NewBook from './components/NewBook';
import Recommendations from './components/Recommendations';
import Notify from './components/Notify';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('library-user-token'));
  const [page, setPage] = useState('authors');
  const [errorMessage, setErrorMessage] = useState(null);

  const client = useApolloClient();

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (!token) {
    return (
      <>
        <Notify errorMessage={errorMessage} />
        <LoginForm setToken={setToken} setError={notify} />
      </>
    );
  }

  return (
    <div>
      <div>
        <Notify errorMessage={errorMessage} />
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
        <button onClick={logout}>logout</button>
      </div>

      {/* This is used just for this assignment's purposes and
    in a real use case a proper routing should be used instead */}
      {page === 'authors' && <Authors setError={notify} />}
      {page === 'books' && <Books />}
      {page === 'add' && <NewBook setError={notify} />}
      {page === 'recommend' && <Recommendations />}
    </div>
  );
};

export default App;
