import "../index.css";
import { useNotificationValue } from "../NotificationContext";

const Notification = ({ message, status }) => {
  const notification = useNotificationValue();

  if (notification.message === null) return null;

  return <div className={notification.status}>{notification.message}</div>;
};

export default Notification;
