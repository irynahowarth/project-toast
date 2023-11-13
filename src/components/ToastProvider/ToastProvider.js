import React from "react";
import useKeydown from "../../hooks/useKeydown";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toastArr, setToastArr] = React.useState([]);

  function createToast(message, variant) {
    setToastArr((prev) => {
      return [
        ...prev,
        {
          message,
          variant,
          id: crypto.randomUUID(),
        },
      ];
    });
  }

  function dismissToast(id) {
    setToastArr((prev) =>
      prev.filter((toast) => {
        return toast.id !== id;
      })
    );
    return;
  }

  const dismissAllToasts = React.useCallback(() => {
    setToastArr([]);
  }, []);

  useKeydown("Escape", dismissAllToasts);

  return (
    <ToastContext.Provider
      value={{ toasts: toastArr, createToast, dismissToast }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
