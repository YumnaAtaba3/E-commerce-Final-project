import { appRoutes } from "../../../routes";
import { userStorage } from "../storage/userStorage";

export function logoutHelper(fallbackUrl = appRoutes.auth.login) {
  try {
    userStorage.remove();
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  } catch (error) {
    console.error("Logout cleanup failed:", error);
  }

  if (typeof window !== "undefined") {

    window.location.href = `/#${fallbackUrl}`;
  }
}
