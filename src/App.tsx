import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppRouterProvider } from "./routes/provider";
import "./index.css";
import GlobalKeyboardListener from "./shared/components/Global-keyboard-listener";
import FixedButton from "./shared/components/Fixed-button";

function App() {
  return (
    <>
      <GlobalKeyboardListener />

      
      <AppRouterProvider />

      <FixedButton />
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
