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
  },
});

export const { setBlogs, appendBlogs } = blogSlice.actions;

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

export default blogSlice.reducer;
