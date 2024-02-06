import React from "react";

export const useEscapeKey = (callback) => {
  React.useEffect(() => {
    function handleEscape(e) {
      if (e.key === "Escape") {
        callback();
      }
    }
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [callback]);
};
