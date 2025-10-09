
import { useEffect } from "react";
import { useSearchStore } from "../../../store/searchStore";

const GlobalKeyboardListener: React.FC = () => {
  const setOpen = useSearchStore((state) => state.setOpen);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "/") {
        e.preventDefault();
        setOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setOpen]);

  return null;
};

export default GlobalKeyboardListener;
