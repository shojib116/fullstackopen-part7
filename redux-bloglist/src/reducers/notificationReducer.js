import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
  status: null,
};

// const notificationReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "SET":
//       return { message: action.payload.message, status: action.payload.status };
//     case "CLEAR":
//       return { message: null, status: null };
//     default:
//       return state;
//   }
// };

// export const setNotification = ({ message, status }) => {
//   return {
//     type: "SET",
//     payload: { message, status },
//   };
// };

// export const clearNotification = () => {
//   return {
//     type: "CLEAR",
//   };
// };

// export default notificationReducer;

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    newNotification(state, action) {
      return action.payload;
    },
    clearNotification(state, action) {
      return initialState;
    },
  },
});

export const { newNotification, clearNotification } = notificationSlice.actions;

export const setNotification = (message, status) => {
  clearTimeout(setNotification.timout);
  return async (dispatch) => {
    dispatch(newNotification({ message, status }));
    setNotification.timout = setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };
};

setNotification.timout = null;

export default notificationSlice.reducer;
