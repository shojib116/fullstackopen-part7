import { useState, useEffect, useRef } from "react";
import { Routes, Route, useMatch } from "react-router-dom";
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
import UsersList from "./components/UsersList";
import User from "./components/User";
import { useQuery } from "@tanstack/react-query";
import userService from "./services/users";
import Blog from "./components/Blog";

const App = () => {
  const user = useUserData();
  const notificationDispatch = useNotificationDispatch();
  const userDispatch = useUserDispatch();
  const {
    data: users,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll,
  });

  const blogFormRef = useRef();

  const match = useMatch("/users/:id");
  const routedUser =
    match && isSuccess ? users.find((u) => u.id === match.params.id) : null;

  const blogMatch = useMatch("/blogs/:id");
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
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Togglable buttonLabel="create new" ref={blogFormRef}>
                <NewBlogForm formRef={blogFormRef} />
              </Togglable>
              <BlogList />
            </>
          }
        />
        <Route
          path="/users"
          element={
            <UsersList
              users={users}
              isLoading={isLoading}
              isSuccess={isSuccess}
            />
          }
        />
        <Route path="/users/:id" element={<User user={routedUser} />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </div>
  );
};

export default App;
