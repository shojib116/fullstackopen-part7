import { useQuery } from "@tanstack/react-query";
import userService from "../services/users";
import { useParams } from "react-router-dom";
import { Container } from "@mui/material";

const User = () => {
  const id = useParams().id;
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => userService.getById(id),
  });

  if (isLoading) return <div>Loading user...</div>;

  if (user === null) return <div>Could not find user...</div>;

  return (
    <Container>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </Container>
  );
};

export default User;
