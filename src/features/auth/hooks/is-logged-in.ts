import { useQuery } from "@tanstack/react-query";
import AuthServices from "../services/api";

export function useIsLoggedIn() {
  const accessToken = localStorage.getItem("token");

  const {  isLoading, isError } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => AuthServices.getProfile(accessToken!),
    enabled: !!accessToken,
    retry: false,
  });

  // ✅ immediate fallback: if we have a token, consider logged in
  const isLoggedIn = Boolean(accessToken) && !isError;

  return { isLoggedIn, isLoading };
}
