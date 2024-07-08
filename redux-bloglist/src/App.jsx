import { useState, useEffect, useRef } from "react";
import loginService from "./services/login";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
// import setNotification from "./utils/notification_helper";
import { setNotification } from "./reducers/notificationReducer";
import { useDispatch, useSelector } from "react-redux";
import { createBlog, initializeBlogs } from "./reducers/blogReducer";
import BlogList from "./components/BlogList";

const App = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
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
    dispatch(createBlog(blog, user));
  };

  const handleLogin = async (userObject) => {
    try {
      const user = await loginService.login(userObject);
      window.localStorage.setItem("user", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      dispatch(setNotification(`logged in as ${user.name}`, "success"));
    } catch (error) {
      dispatch(setNotification(error.response.data.error, "error"));
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
      <BlogList user={user} />
    </div>
  );
};

export default App;
