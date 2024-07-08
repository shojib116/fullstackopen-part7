import { useSelector } from "react-redux";
import "../index.css";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const { message, status } = notification;

  if (message === null) return null;

  return <div className={status}>{message}</div>;
};

export default Notification;
