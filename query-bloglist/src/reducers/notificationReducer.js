export const initialState = { message: null, status: null };
const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "CLEAR":
      return initialState;
    default:
      return state;
  }
};

export const setNotification = (message, status) => {
  return {
    type: "SET",
    payload: { message, status },
  };
};

export const clearNotification = () => {
  return { type: "CLEAR" };
};

export default notificationReducer;
