import { useSubscription, useApolloClient } from '@apollo/client';
import React, { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import LoginForm from './components/LoginForm';
import NewBook from './components/NewBook';
import Recommendations from './components/Recommendations';
import Notify from './components/Notify';
import { BOOK_ADDED } from './queries';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('library-user-token'));
  const [page, setPage] = useState('authors');
  const [notification, setNotification] = useState(null);

  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData);

      const { title, author } = subscriptionData.data.bookAdded;
      notify(`New book ${title} by ${author.name} added`, 'success');
    },
  });

  /*
Default type to error. Alternative would be to have
helper functions with set types to call this.
  */
  const notify = (message, type = 'error') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
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
        <Notify notification={notification} />
        <LoginForm setToken={setToken} setError={notify} />
      </>
    );
  }

  return (
    <div>
      <div>
        <Notify notification={notification} />
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
