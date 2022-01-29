import React from 'react';
import { useSelector } from 'react-redux';
import '../App.css';

const Notification = () => {
  const notification = useSelector(({ notification }) => notification);
  return notification ? <div className={notification.type}>{notification.content}</div> : null;
};

export default Notification;
