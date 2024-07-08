import PropTypes from "prop-types";
import "../index.css";

const Notification = ({ message, status }) => {
  return <div className={status}>{message}</div>;
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default Notification;
