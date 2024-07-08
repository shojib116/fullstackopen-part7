import { useQuery } from "@tanstack/react-query";
import Blog from "./Blog";
import blogService from "../services/blogs";

const BlogList = ({ increaseLikes, deleteBlog, user }) => {
  const {
    data: blogs,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  });

  if (isLoading) return <div>Loading Blogs...</div>;

  return (
    <>
      {isSuccess &&
        blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              increaseLikes={increaseLikes}
              deleteBlog={deleteBlog}
              username={user.username}
            />
          ))}
    </>
  );
};

export default BlogList;
