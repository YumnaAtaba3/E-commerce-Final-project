import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AuthServices from "../services/api";
import { userStorage } from "../storage/userStorage";

export function useIsLoggedIn() {
  const [accessToken, setAccessToken] = useState<string | null>(userStorage.get() ?? null);

  useEffect(() => {
    const handleStorageChange = () => {
      setAccessToken(userStorage.get() ?? null);
    };

    window.addEventListener("storage", handleStorageChange);

    const originalSetItem = localStorage.setItem;
    const originalRemoveItem = localStorage.removeItem;

    localStorage.setItem = function (key, value) {
      originalSetItem.apply(this, [key, value]);
      if (key === "token") handleStorageChange();
    };

    localStorage.removeItem = function (key) {
      originalRemoveItem.apply(this, [key]);
      if (key === "token") handleStorageChange();
    };

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      localStorage.setItem = originalSetItem;
      localStorage.removeItem = originalRemoveItem;
    };
  }, []);

  const { isLoading, isError } = useQuery({
    queryKey: ["userProfile", accessToken],
    queryFn: () => AuthServices.getProfile(accessToken!),
    enabled: !!accessToken,
    retry: false,
  });

  const isLoggedIn = Boolean(accessToken) && !isError;

  return { isLoggedIn, isLoading };
}
