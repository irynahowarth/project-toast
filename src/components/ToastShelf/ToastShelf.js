import React from "react";

import Toast from "../Toast";
import styles from "./ToastShelf.module.css";

function ToastShelf({ toasts }) {
  return (
    <ol className={styles.wrapper}>
      {toasts.map((toast) => {
        return (
          <li className={styles.toastWrapper} key={toast.id}>
            <Toast
              id={toast.id}
              variant={toast.variant}
              dismiss={toast.dismiss}
            >
              {toast.message}
            </Toast>
          </li>
        );
      })}
    </ol>
  );
}

export default ToastShelf;
