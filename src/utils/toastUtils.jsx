import { toast } from 'react-toastify';

export const showToast = (type, message, options = {}) => {
  const baseOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    ...options,
  };

  switch (type) {
    case 'success':
      toast.success(message, baseOptions);
      break;
    case 'error':
      toast.error(message, baseOptions);
      break;
    case 'info':
      toast.info(message, baseOptions);
      break;
    case 'warn':
      toast.warn(message, baseOptions);
      break;
    default:
      toast(message, baseOptions);
  }
};