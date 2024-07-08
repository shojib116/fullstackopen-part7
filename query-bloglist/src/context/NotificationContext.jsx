import { createContext, useContext, useReducer } from "react";
import notificationReducer, {
  initialState,
} from "../reducers/notificationReducer";

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    initialState
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext);
  return notification;
};

export const useNotificationDispatch = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext);
  return notificationDispatch;
};
