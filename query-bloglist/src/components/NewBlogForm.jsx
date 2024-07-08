import { useState } from "react";
import PropTypes from "prop-types";

const NewBlogForm = ({ createNew }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreateNew = async (event) => {
    event.preventDefault();

    await createNew({ title, author, url });

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

NewBlogForm.propTypes = {
  createNew: PropTypes.func.isRequired,
};

export default NewBlogForm;
