import { useSelector } from "react-redux";
import Blog from "./Blog";

const BlogList = ({ increaseLikes, deleteBlog, user }) => {
  const blogs = useSelector((state) =>
    [...state.blogs].sort((a, b) => b.likes - a.likes)
  );

  return (
    <>
      {blogs.map((blog) => (
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
