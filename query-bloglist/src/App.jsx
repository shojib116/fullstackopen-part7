import { useState, useEffect, useRef } from "react";
import loginService from "./services/login";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { useNotificationDispatch } from "./context/NotificationContext";
import BlogList from "./components/BlogList";
import notificationHandler from "./utils/notificationHandler";
import { useUserData, useUserDispatch } from "./context/UserContext";
import { clearUser, setUser } from "./reducers/userReducer";

const App = () => {
  const user = useUserData();
  const notificationDispatch = useNotificationDispatch();
  const userDispatch = useUserDispatch();

  const blogFormRef = useRef();

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("user");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      blogService.setToken(user.token);
      userDispatch(setUser(user));
    }
  }, []);

  const handleLogin = async (userObject) => {
    try {
      const user = await loginService.login(userObject);
      window.localStorage.setItem("user", JSON.stringify(user));
      blogService.setToken(user.token);
      userDispatch(setUser(user));
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

    userDispatch(clearUser());
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
        <NewBlogForm formRef={blogFormRef} />
      </Togglable>
      <BlogList />
    </div>
  );
};

export default App;
