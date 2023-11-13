import React from "react";

import Button from "../Button";
import Toast from "../Toast";
import ToastShelf from "../ToastShelf";

import styles from "./ToastPlayground.module.css";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const [message, setMessage] = React.useState("");
  const [variant, setVariant] = React.useState(VARIANT_OPTIONS[0] || "");
  const [toastArr, setToastArr] = React.useState([]);

  function dismissToast(id) {
    setToastArr((prev) =>
      prev.filter((toast) => {
        return toast.id !== id;
      })
    );
    return;
  }
  function popToast(event) {
    event.preventDefault();

    setToastArr((prev) => {
      return [
        ...prev,
        {
          message,
          variant,
          id: crypto.randomUUID(),
          dismiss: dismissToast,
        },
      ];
    });

    setMessage("");
    setVariant(VARIANT_OPTIONS[0]);
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>
      <ToastShelf toasts={toastArr} />
      <div className={styles.controlsWrapper}>
        <form onSubmit={(event) => popToast(event)}>
          <div className={styles.row}>
            <label
              htmlFor="message"
              className={styles.label}
              style={{ alignSelf: "baseline" }}
            >
              Message
            </label>
            <div className={styles.inputWrapper}>
              <textarea
                id="message"
                className={styles.messageInput}
                value={message}
                onChange={(event) => {
                  setMessage(event.target.value);
                }}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label}>Variant</div>
            <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
              {VARIANT_OPTIONS?.map((option) => {
                return (
                  <label
                    htmlFor={`variant-${option}`}
                    key={`variant-${option}`}
                  >
                    <input
                      id={`variant-${option}`}
                      type="radio"
                      name="variant"
                      value={option}
                      checked={variant === option}
                      onChange={(event) => setVariant(event.target.value)}
                    />
                    {option}
                  </label>
                );
              })}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label} />
            <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
              <Button>Pop Toast!</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ToastPlayground;
