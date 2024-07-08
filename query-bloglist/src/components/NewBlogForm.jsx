import { useState } from "react";
// import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";
import notificationHandler from "../utils/notificationHandler";
import { useNotificationDispatch } from "../context/NotificationContext";
import { useUserData } from "../context/UserContext";

const NewBlogForm = ({ formRef }) => {
  const user = useUserData();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const notificationDispatch = useNotificationDispatch();

  const queryClient = useQueryClient();

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      const createdBy = {
        username: user.username,
        name: user.name,
        id: newBlog.user,
      };
      queryClient.setQueryData(
        ["blogs"],
        blogs.concat({ ...newBlog, user: createdBy })
      );
      notificationHandler(
        notificationDispatch,
        `a new blog ${newBlog.title} by ${newBlog.author} added`,
        "success"
      );
    },
    onError: (error) => {
      notificationHandler(
        notificationDispatch,
        error.response.data.error,
        "error"
      );
    },
  });

  const handleCreateNew = async (event) => {
    event.preventDefault();

    formRef.current.toggleVisibility();

    newBlogMutation.mutate({ title, author, url });

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleCreateNew}>
        <label htmlFor="title">title:</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <br />
        <label htmlFor="author">author:</label>
        <input
          type="text"
          name="author"
          id="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <br />
        <label htmlFor="url">url:</label>
        <input
          type="text"
          name="url"
          id="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        <br />
        <input type="submit" value="create" />
        <br />
      </form>
    </>
  );
};

// NewBlogForm.propTypes = {
//   createNew: PropTypes.func.isRequired,
// };

export default NewBlogForm;
