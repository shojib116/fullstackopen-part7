import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlogs(state, action) {
      return [...state, action.payload];
    },
    updateBlogs(state, action) {
      const updatedBlog = action.payload;
      return state.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      );
    },
    filterBlogs(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
  },
});

export const { setBlogs, appendBlogs, updateBlogs, filterBlogs } =
  blogSlice.actions;

export const initializeBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll();
  dispatch(setBlogs(blogs));
};

export const createBlog = (blog, user) => async (dispatch) => {
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
    dispatch(appendBlogs(newBlog));
    dispatch(
      setNotification(
        `a new blog ${createdBlog.title} by ${createdBlog.author} added`,
        "success"
      )
    );
  } catch (error) {
    dispatch(setNotification(error.response.data.error, "error"));
  }
};

export const increaseLikes = (updatedBlog) => async (dispatch) => {
  try {
    const response = await blogService.updateLikes(updatedBlog);
    dispatch(updateBlogs(response));
  } catch (error) {
    dispatch(setNotification(error.response.data.error, "error"));
  }
};

export const deleteBlog = (id) => async (dispatch) => {
  try {
    await blogService.deleteBlog(id);
    dispatch(filterBlogs(id));
  } catch (error) {
    dispatch(setNotification(error.response.data.error, "error"));
  }
};

export default blogSlice.reducer;
