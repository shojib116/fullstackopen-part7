import { useState } from "react";
// import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { deleteBlog, increaseLikes } from "../reducers/blogReducer";

const Blog = ({ blog, username }) => {
  const disptach = useDispatch();
  const [showDetails, setShowDetails] = useState(false);

  const handleLikes = async () => {
    const updatedBlog = {
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      id: blog.id,
    };

    disptach(increaseLikes(updatedBlog));
  };

  const handleDeletion = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      disptach(deleteBlog(blog.id));
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
          {username === blog.user.username && (
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
