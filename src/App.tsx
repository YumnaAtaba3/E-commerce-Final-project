import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppRouterProvider } from "./routes/provider";
import "./index.css";

function App() {
  
  return (
    <>
      <AppRouterProvider />


      <ToastContainer
        position="top-right"
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  );
}

export default App;
