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

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

function Toast({ variant, size = 24, message }) {
  const toastContext = useToastContext();
  function hideToast() {
    toastContext.setShowToast(false);
  }
  if (message == null || message === "" || !toastContext.showToast) return;
  if (ICONS_BY_VARIANT[variant] === undefined) {
    console.warn(`Unknown variant: ${variant}`);
  }

  return (
    <div className={`${styles.toast} ${styles[variant]}`}>
      <div className={styles.iconContainer}>
        <Info size={size} />
      </div>
      <p className={styles.content}>{message}</p>
      <button className={styles.closeButton} onClick={hideToast}>
        <X size={size} />
        <VisuallyHidden>Dismiss message</VisuallyHidden>
      </button>
    </div>
  );
}

export default Toast;

export const ToastContext = React.createContext({});

export function ToastProvider({ children }) {
  const [showToast, setShowToast] = React.useState(false);

  const value = React.useMemo(() => ({ showToast, setShowToast }), [showToast]);
  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export function useToastContext() {
  const context = React.useContext(ToastContext);
  if (context == null) {
    throw new Error("useToastContext must be used within a ToastProvider");
  }
  return context;
}
