import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import loginService from "../services/login";
import { setNotification } from "./notificationReducer";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    clearUser(state, action) {
      return null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const initializeUser = () => async (dispatch) => {
  const loggedInUser = window.localStorage.getItem("user");
  if (loggedInUser) {
    const user = JSON.parse(loggedInUser);
    blogService.setToken(user.token);
    dispatch(setUser(user));
  }
};

export const loginUser = (userObject) => async (dispatch) => {
  try {
    const user = await loginService.login(userObject);
    window.localStorage.setItem("user", JSON.stringify(user));
    blogService.setToken(user.token);
    dispatch(setUser(user));
    dispatch(setNotification(`logged in as ${user.name}`, "success"));
  } catch (error) {
    dispatch(setNotification(error.response.data.error, "error"));
  }
};

export const logoutUser = () => async (dispatch) => {
  dispatch(clearUser());
  window.localStorage.removeItem("user");
};

export default userSlice.reducer;
