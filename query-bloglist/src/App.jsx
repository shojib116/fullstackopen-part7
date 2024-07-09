import { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import loginService from "./services/login";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import { useNotificationDispatch } from "./context/NotificationContext";
import BlogList from "./components/BlogList";
import notificationHandler from "./utils/notificationHandler";
import { useUserData, useUserDispatch } from "./context/UserContext";
import { clearUser, setUser } from "./reducers/userReducer";
import UsersList from "./components/UsersList";
import User from "./components/User";
import Blog from "./components/Blog";

const Menu = () => {
  return (
    <>
      <Link to="/">blogs</Link> <Link to="/users">users</Link>
    </>
  );
};

const App = () => {
  const user = useUserData();
  const notificationDispatch = useNotificationDispatch();
  const userDispatch = useUserDispatch();

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
      <div>
        <Menu /> {user.name} logged in{" "}
        <input type="button" value="logout" onClick={handleLogout} />
      </div>
      <h2>blog app</h2>
      <Notification />
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </div>
  );
};

export default App;
