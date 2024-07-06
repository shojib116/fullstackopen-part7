export const notificationHandler = (message, setNotification) => {
  setNotification(message);
  setTimeout(() => {
    setNotification(null);
  }, 5000);
};
