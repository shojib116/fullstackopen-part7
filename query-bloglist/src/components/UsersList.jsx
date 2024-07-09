import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import userService from "../services/users";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll,
  });
  return (
    <Container>
      <h2>Users</h2>
      {isLoading && <div>Loading users...</div>}
      {isSuccess && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="center">blogs created</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => {
                return (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Link to={`/users/${user.id}`}>{user.name}</Link>
                    </TableCell>
                    <TableCell align="center">{user.blogs.length}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default UsersList;
