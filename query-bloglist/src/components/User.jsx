const User = ({ user }) => {
  if (user === null) return <div>Loading user...</div>;
  if (user === undefined) return <div>Could not find user...</div>;
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
