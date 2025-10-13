import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppRouterProvider } from "./routes/provider";
import "./index.css";
import GlobalKeyboardListener from "./shared/components/Global-keyboard-listener";
import SearchDialog from "./shared/components/Search-dialog";
import { useSearchStore } from "./store/searchStore";
import FixedButton from "./shared/components/Fixed-button";

function App() {
  const open = useSearchStore((state) => state.open);

  return (
    <>
      <GlobalKeyboardListener />

      {/* AppRouterProvider wraps all routes and layouts */}
      <AppRouterProvider>{open ? <SearchDialog /> : null}</AppRouterProvider>

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
