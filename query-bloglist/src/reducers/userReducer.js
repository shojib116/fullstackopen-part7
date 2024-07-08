export const initialState = null;

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "CLEAR":
      return null;
    default:
      return state;
  }
};

export const setUser = (user) => {
  return {
    type: "SET",
    payload: user,
  };
};

export const clearUser = () => {
  return {
    type: "CLEAR",
  };
};

export default userReducer;
