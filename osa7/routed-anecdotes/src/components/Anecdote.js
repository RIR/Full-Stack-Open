const Anecdote = ({ anecdote }) => {
  const margin = {
    marginBottom: 5,
  };

  const { content, author, info, votes } = anecdote;
  return (
    <div>
      <h2 style={margin}>
        {content} by {author}
      </h2>
      <div style={margin}>has {votes} votes</div>
      <div style={margin}>
        for more info see <a href={info}>{info}</a>
      </div>
    </div>
  );
};

export default Anecdote;
