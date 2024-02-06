import React from "react";

import ToastPlayground from "../ToastPlayground";
import Footer from "../Footer";
import { ToastProvider } from "../Toast";

function App() {
  return (
    <ToastProvider>
      <ToastPlayground />
      <Footer />
    </ToastProvider>
  );
}

export default App;
