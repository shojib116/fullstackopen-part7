import { useState, useEffect, useRef } from "react";
import loginService from "./services/login";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { useNotificationDispatch } from "./NotificationContext";
import BlogList from "./components/BlogList";
import notificationHandler from "./utils/notificationHandler";

const App = () => {
  const [user, setUser] = useState(null);
  const notificationDispatch = useNotificationDispatch();

  const blogFormRef = useRef();

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("user");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

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
      notificationHandler(
        notificationDispatch,
        error.response.data.error,
        "error"
      );
    }
  };

  const deleteBlog = async (blogId) => {
    try {
      await blogService.deleteBlog(blogId);
      setBlogs(blogs.filter((blog) => blog.id !== blogId));
    } catch (error) {
      notificationHandler(
        notificationDispatch,
        error.response.data.error,
        "error"
      );
    }
  };

  const handleLogin = async (userObject) => {
    try {
      const user = await loginService.login(userObject);
      window.localStorage.setItem("user", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      notificationHandler(
        notificationDispatch,
        `logged in as ${user.name}`,
        "success"
      );
    } catch (error) {
      notificationHandler(
        notificationDispatch,
        error.response.data.error,
        "error"
      );
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
        <NewBlogForm formRef={blogFormRef} user={user} />
      </Togglable>
      <BlogList
        increaseLikes={increaseLikes}
        deleteBlog={deleteBlog}
        user={user}
      />
    </div>
  );
};

export default App;
