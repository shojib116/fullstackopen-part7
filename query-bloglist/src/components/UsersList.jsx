const UsersList = ({ users, isLoading, isSuccess }) => {
  return (
    <div>
      <h2>Users</h2>
      {isLoading && <div>Loading users...</div>}
      {isSuccess && (
        <table>
          <thead>
            <tr>
              <th></th>
              <th>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.blogs.length}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsersList;
