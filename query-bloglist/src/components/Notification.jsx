import "../index.css";
import { useNotificationValue } from "../context/NotificationContext";
import { Alert } from "@mui/material";

const Notification = () => {
  const notification = useNotificationValue();

  if (notification.message === null) return null;

  return <Alert severity={notification.status}>{notification.message}</Alert>;
};

export default Notification;
