import React from 'react';
import { useSelector } from 'react-redux';
import { Alert } from '@material-ui/lab';
import '../App.css';

const Notification = () => {
  const notification = useSelector(({ notification }) => notification);
  return notification ? (
    <div>{notification && <Alert severity={notification.type}>{notification.content}</Alert>}</div>
  ) : null;
};

export default Notification;
