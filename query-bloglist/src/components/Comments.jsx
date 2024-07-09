const Comments = ({ comments }) => {
  return (
    <div>
      <h3>comments</h3>
      {comments.length === 0 ? (
        <div>No comments yet</div>
      ) : (
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Comments;
