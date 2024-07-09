// import PropTypes from "prop-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";
import { useUserData } from "../context/UserContext";
import { useParams } from "react-router-dom";
import Comments from "./Comments";

const Blog = () => {
  const id = useParams().id;
  const { data: blog, isLoading } = useQuery({
    queryKey: ["blog"],
    queryFn: () => blogService.getById(id),
  });

  const user = useUserData();

  const queryClient = useQueryClient();
  const likesMutation = useMutation({
    mutationFn: blogService.updateLikes,
    onSuccess: (updatedBlog) => {
      const blog = queryClient.getQueryData(["blog"]);
      queryClient.setQueryData(["blog"], { ...blog, likes: updatedBlog.likes });
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

  // const deleteBlogMutation = useMutation({
  //   mutationFn: blogService.deleteBlog,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(["blogs"]);
  //   },
  // });

  // const handleDeletion = async () => {
  //   if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
  //     deleteBlogMutation.mutate(blog.id);
  //   }
  // };

  if (isLoading) return <div>Loading blog...</div>;

  if (blog === null) return <div>Could not find blog...</div>;

  return (
    <div>
      <h2>
        {blog.title} - {blog.author}
      </h2>

      <a href={blog.url}>{blog.url}</a>
      <br />
      <span>
        {blog.likes} likes{" "}
        <input type="button" value="like" onClick={handleLikes} />
      </span>
      <br />
      <span>added by {blog.user.name}</span>
      <br />
      <Comments comments={blog.comments} />
      {/* {user.username === blog.user.username && (
        <input type="button" value="remove" onClick={handleDeletion} />
      )} */}
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
