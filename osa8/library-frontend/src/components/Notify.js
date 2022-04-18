// const Notify = ({ message, type }) => {
const Notify = ({ notification }) => {
  if (!notification) {
    return null;
  }

  return (
    <div style={notification.type === 'error' ? { color: 'red' } : { color: 'green' }}>{notification.message}</div>
  );
};

export default Notify;
