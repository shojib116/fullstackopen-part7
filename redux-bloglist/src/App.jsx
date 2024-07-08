import { useEffect, useRef } from "react";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { useDispatch, useSelector } from "react-redux";
import { createBlog, initializeBlogs } from "./reducers/blogReducer";
import BlogList from "./components/BlogList";
import { initializeUser, logoutUser } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeUser());
    dispatch(initializeBlogs());
  }, []);

  const createNew = async (blog) => {
    blogFormRef.current.toggleVisibility();
    dispatch(createBlog(blog, user));
  };

  const handleLogout = (event) => {
    event.preventDefault();

    dispatch(logoutUser());
  };

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm />
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
      <BlogList />
    </div>
  );
};

export default App;
