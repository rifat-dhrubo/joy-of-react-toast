import React from "react";

import Button from "../Button";

import styles from "./ToastPlayground.module.css";
import Toast, { useToastContext } from "../Toast";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

const INITIAL_ARG = {
  message: "",
  variant: VARIANT_OPTIONS.at(0),
};

function reducer(state, action) {
  switch (action.type) {
    case "message":
      return { ...state, message: action.payload };
    case "variant":
      return { ...state, variant: action.payload };
    default:
      return state;
  }
}

function ToastPlayground() {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_ARG);
  const toastContext = useToastContext();

  function handleTextChange(event) {
    dispatch({ type: "message", payload: event.target.value });
  }

  function handleVariantChange(event) {
    dispatch({ type: "variant", payload: event.target.value });
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <Toast message={state.message} variant={state.variant} />

      <div className={styles.controlsWrapper}>
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
              value={state.message}
              onChange={handleTextChange}
              placeholder="Enter a message..."
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          {VARIANT_OPTIONS.map((variant) => (
            <div
              className={`${styles.inputWrapper} ${styles.radioWrapper}`}
              key={variant}
            >
              <label htmlFor={`variant-${variant}`}>
                <input
                  id={`variant-${variant}`}
                  type="radio"
                  name="variant"
                  value={variant}
                  checked={state.variant === variant}
                  onChange={handleVariantChange}
                />
                {variant}
              </label>
            </div>
          ))}
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button onClick={() => toastContext.setShowToast(true)}>
              Pop Toast!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToastPlayground;
