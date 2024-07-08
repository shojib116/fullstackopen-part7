import { createContext, useContext, useReducer } from "react";
import userReducer, { initialState } from "../reducers/userReducer";

const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserData = () => {
  const [user, userDispatch] = useContext(UserContext);
  return user;
};

export const useUserDispatch = () => {
  const [user, userDispatch] = useContext(UserContext);
  return userDispatch;
};

export default UserContextProvider;
