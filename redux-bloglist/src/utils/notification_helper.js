import {
  clearNotification,
  newNotification,
} from "../reducers/notificationReducer";
import store from "../store";

//setNotification when using redux
const setNotification = (message, status) => {
  store.dispatch(newNotification({ message, status }));
  setTimeout(() => {
    store.dispatch(clearNotification());
  }, 5000);
};

export default setNotification;
