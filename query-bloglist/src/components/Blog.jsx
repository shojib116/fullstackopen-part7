import { useState } from "react";
// import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";
import { useUserData } from "../context/UserContext";

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);
  const user = useUserData();

  const queryClient = useQueryClient();
  const likesMutation = useMutation({
    mutationFn: blogService.updateLikes,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(
        ["blogs"],
        blogs.map((blog) =>
          blog.id !== updatedBlog.id
            ? blog
            : { ...blog, likes: updatedBlog.likes }
        )
      );
    },
  });
  const handleLikes = async () => {
    const updatedBlog = {
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      id: blog.id,
    };
    likesMutation.mutate(updatedBlog);
  };

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
  });

  const handleDeletion = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlogMutation.mutate(blog.id);
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle}>
      <div className="blogSummary">
        {blog.title} - {blog.author}{" "}
        <input
          type="button"
          value={showDetails ? "hide" : "view"}
          onClick={() => setShowDetails(!showDetails)}
        />
      </div>
      {showDetails && (
        <div className="blogDetails">
          <span>{blog.url}</span>
          <br />
          <span>
            likes {blog.likes}{" "}
            <input type="button" value="like" onClick={handleLikes} />
          </span>
          <br />
          <span>{blog.user.name}</span>
          <br />
          {user.username === blog.user.username && (
            <input type="button" value="remove" onClick={handleDeletion} />
          )}
        </div>
      )}
    </div>
  );
};

// Blog.propTypes = {
//   blog: PropTypes.object.isRequired,
//   increaseLikes: PropTypes.func.isRequired,
//   deleteBlog: PropTypes.func.isRequired,
//   username: PropTypes.string.isRequired,
// };

export default Blog;
