import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useIsLoggedIn } from "./is-logged-in";

export function useAuthGuard() {
  const { isLoggedIn, isLoading } = useIsLoggedIn();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      navigate("/login");
    }
  }, [isLoading, isLoggedIn, navigate]);
}
