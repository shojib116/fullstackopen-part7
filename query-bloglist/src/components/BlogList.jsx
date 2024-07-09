import { useQuery } from "@tanstack/react-query";
import blogService from "../services/blogs";
import { Link } from "react-router-dom";

const BlogList = () => {
  const {
    data: blogs,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  });

  if (isLoading) return <div>Loading Blogs...</div>;

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <>
      {isSuccess &&
        blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <div key={blog.id} style={blogStyle}>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title} - {blog.author}
              </Link>
            </div>
          ))}
    </>
  );
};

export default BlogList;
