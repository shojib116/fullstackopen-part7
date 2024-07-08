import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import loginService from "./services/login";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { useNotificationDispatch } from "./NotificationContext";
import notificationHandler from "./utils/notificationHandler";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const dispatch = useNotificationDispatch();

  const blogFormRef = useRef();

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  }, []);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("user");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const createNew = async (blog) => {
    blogFormRef.current.toggleVisibility();

    try {
      const createdBlog = await blogService.create(blog);
      const createdBy = {
        username: user.username,
        name: user.name,
        id: createdBlog.user,
      };

      const newBlog = {
        ...createdBlog,
        user: createdBy,
      };
      setBlogs(blogs.concat(newBlog));
      notificationHandler(
        dispatch,
        `a new blog ${createdBlog.title} by ${createdBlog.author} added`,
        "success"
      );
    } catch (error) {
      notificationHandler(dispatch, error.response.data.error, "error");
    }
  };

  const increaseLikes = async (updatedBlog, blogId) => {
    try {
      const response = await blogService.updateLikes(updatedBlog, blogId);
      setBlogs(
        blogs.map((blog) => {
          if (blog.id === response.id)
            return { ...blog, likes: response.likes };
          return blog;
        })
      );
    } catch (error) {
      notificationHandler(dispatch, error.response.data.error, "error");
    }
  };

  const deleteBlog = async (blogId) => {
    try {
      await blogService.deleteBlog(blogId);
      setBlogs(blogs.filter((blog) => blog.id !== blogId));
    } catch (error) {
      notificationHandler(dispatch, error.response.data.error, "error");
    }
  };

  const handleLogin = async (userObject) => {
    try {
      const user = await loginService.login(userObject);
      window.localStorage.setItem("user", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      notificationHandler(dispatch, `logged in as ${user.name}`, "success");
    } catch (error) {
      notificationHandler(dispatch, error.response.data.error, "error");
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();

    setUser(null);
    window.localStorage.removeItem("user");
  };

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm handleLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name} logged in{" "}
        <input type="button" value="logout" onClick={handleLogout} />
      </p>
      <Togglable buttonLabel="create new" ref={blogFormRef}>
        <NewBlogForm createNew={createNew} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          increaseLikes={increaseLikes}
          deleteBlog={deleteBlog}
          username={user.username}
        />
      ))}
    </div>
  );
};

export default App;
