import React from "react";

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

  function dismissAllToasts() {
    setToastArr([]);
  }

  React.useEffect(() => {
    function handlerKeyPress(event) {
      if (event.key === "Escape") {
        dismissAllToasts();
      }
    }
    window.addEventListener("keydown", handlerKeyPress);

    return () => {
      window.removeEventListener("keydown", handlerKeyPress);
    };
  }, []);

  return (
    <ToastContext.Provider
      value={{ toasts: toastArr, createToast, dismissToast }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
