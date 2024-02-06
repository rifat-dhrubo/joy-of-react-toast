import React from "react";

import styles from "./ToastShelf.module.css";
import Toast from "../Toast";
import { useToastContext } from "../ToastProvider";

function ToastShelf() {
  const { state } = useToastContext();
  return (
    <ol
      className={styles.wrapper}
      role="region"
      aria-live="polite"
      aria-label="Notification"
    >
      {state?.toasts?.map((toast) => (
        <li className={styles.toastWrapper} key={toast.id}>
          <Toast variant={toast.variant} id={toast.id}>
            {toast.children}
          </Toast>
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
