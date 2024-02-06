import React from "react";
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from "react-feather";

import VisuallyHidden from "../VisuallyHidden";

import styles from "./Toast.module.css";
import { useToastContext } from "../ToastProvider";

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

function Toast({ variant, size = 24, children, id }) {
  const toastContext = useToastContext();
  function hideToast(toastId) {
    toastContext.dispatch({
      type: "REMOVE_TOAST",
      toast: {
        id: toastId,
      },
    });
  }
  if (
    children == null ||
    children === "" ||
    toastContext.state.toasts.length === 0
  )
    return;
  if (ICONS_BY_VARIANT[variant] === undefined) {
    console.warn(`Unknown variant: ${variant}`);
  }

  return (
    <div className={`${styles.toast} ${styles[variant]}`}>
      <div className={styles.iconContainer}>
        <Info size={size} />
      </div>
      <p className={styles.content}>
        <VisuallyHidden>{variant} -</VisuallyHidden>
        {children}
      </p>
      <button
        className={styles.closeButton}
        onClick={() => hideToast(id)}
        aria-label="Dismiss Message"
        aria-live="off"
      >
        <X size={size} />
      </button>
    </div>
  );
}

export default Toast;
