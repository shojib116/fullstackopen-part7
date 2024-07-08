import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import loginService from "./services/login";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({
    message: null,
    status: null,
  });

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

  const discardNotification = () => {
    setTimeout(() => {
      setNotification({ message: null, status: null });
    }, 5000);
  };

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
      setNotification({
        message: `a new blog ${createdBlog.title} by ${createdBlog.author} added`,
        status: "success",
      });
      discardNotification();
    } catch (error) {
      setNotification({
        message: error.response.data.error,
        status: "error",
      });
      discardNotification();
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
      setNotification({
        message: error.response.data.error,
        status: "error",
      });
      discardNotification();
    }
  };

  const deleteBlog = async (blogId) => {
    try {
      await blogService.deleteBlog(blogId);
      setBlogs(blogs.filter((blog) => blog.id !== blogId));
    } catch (error) {
      setNotification({
        message: error.response.data.error,
        status: "error",
      });
      discardNotification();
    }
  };

  const handleLogin = async (userObject) => {
    try {
      const user = await loginService.login(userObject);
      window.localStorage.setItem("user", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setNotification({
        message: `logged in as ${user.name}`,
        status: "success",
      });
      discardNotification();
    } catch (error) {
      setNotification({
        message: error.response.data.error,
        status: "error",
      });
      discardNotification();
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
        {notification.message && (
          <Notification
            message={notification.message}
            status={notification.status}
          />
        )}
        <LoginForm handleLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      {notification.message && (
        <Notification
          message={notification.message}
          status={notification.status}
        />
      )}
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
