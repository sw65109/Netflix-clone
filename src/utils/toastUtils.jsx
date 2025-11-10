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

  const toastMap = {
    success: toast.success,
    error: toast.error,
    info: toast.info,
    warn: toast.warn,
  };
   const toastFn = toastMap[type || toast];
   toastFn(message, baseOptions);
};