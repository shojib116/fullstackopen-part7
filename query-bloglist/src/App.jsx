import { useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
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
import { Box, Container } from "@mui/material";
import Menu from "./components/Menu";

const App = () => {
  const user = useUserData();
  const notificationDispatch = useNotificationDispatch();
  const userDispatch = useUserDispatch();
  const navigate = useNavigate();

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
      navigate("/");
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
      <>
        <Notification />
        <Container fixed maxWidth="xs" sx={{ textAlign: "center" }}>
          <Box
            sx={{
              padding: "0.5rem 2rem",
              borderRadius: "10px",
              maxWidth: "min-content",
              margin: "auto",
              boxShadow: "2px 2px 10px #220000",
            }}
          >
            <h2>log in to application</h2>
            <LoginForm handleLogin={handleLogin} />
          </Box>
        </Container>
      </>
    );
  }

  return (
    <div>
      <Notification />
      <div>
        <Menu user={user} handleLogout={handleLogout} />
      </div>
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
