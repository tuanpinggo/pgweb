import { toast as toastify } from "react-toastify";
import Toast from "./Toast";

export const toast = ({
  type,
  message,
  toastId = null,
  autoClose = 3000,
  position = "top-right",
  ...otherProps
}) => {
  toastify.clearWaitingQueue();
  toastify.dismiss();
  setTimeout(() =>
    toastify(<Toast type={type} message={message} />, {
      toastId,
      autoClose,
      closeButton: false,
      closeOnClick: true,
      position,
      hideProgressBar: true,
      ...otherProps,
    })
  );
};

export const dismissToast = () => toastify.dismiss();
