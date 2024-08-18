import { toast } from "react-toastify";


export const showSuccessMessage = (message) => {
  toast.success(message, {
    position: "bottom-right",
    autoClose: 10000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
  });
}

export const showErrorMessage = (message) => {
  toast.error(message || "Something went wrong, please try again later!", {
    position: "bottom-right",
    autoClose: 10000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
  });
}
