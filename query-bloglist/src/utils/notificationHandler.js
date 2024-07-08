import {
  clearNotification,
  setNotification,
} from "../reducers/notificationReducer";

const notificationHandler = (dispatch, message, status) => {
  clearTimeout(notificationHandler.timeout);
  dispatch(setNotification(message, status));
  notificationHandler.timeout = setTimeout(() => {
    dispatch(clearNotification());
  }, 5000);
};

notificationHandler.timeout = null;

export default notificationHandler;
