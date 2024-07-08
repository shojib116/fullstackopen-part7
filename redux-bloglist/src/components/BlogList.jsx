import { useSelector } from "react-redux";
import Blog from "./Blog";

const BlogList = ({ deleteBlog, user }) => {
  const blogs = useSelector((state) =>
    [...state.blogs].sort((a, b) => b.likes - a.likes)
  );

  return (
    <>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} username={user.username} />
      ))}
    </>
  );
};

export default BlogList;
