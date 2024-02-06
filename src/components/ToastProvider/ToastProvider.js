import React from "react";

export const ToastContext = React.createContext({});

const INITIAL_STATE = {
  toasts: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TOAST":
      const id = crypto.randomUUID();
      const toast = { ...action.toast, id };

      return {
        ...state,
        toasts: [...state.toasts, toast],
      };
    case "REMOVE_TOAST":
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toast.id),
      };
    case "REMOVE_FIRST_TOAST":
      return {
        ...state,
        toasts: state.toasts.slice(1), // remove first element from array
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

function ToastProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);

  const value = React.useMemo(() => ({ state, dispatch }), [state]);

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

export default ToastProvider;
