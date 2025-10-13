import { appRoutes } from "../../../routes";
import { userStorage } from "../storage/userStorage";

export function logoutHelper(fallbackUrl = appRoutes.auth.signUp) {
  try {
    userStorage.remove();
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  } catch (error) {
    console.error("Logout cleanup failed:", error);
  }

  if (typeof window !== "undefined") {

    const base =document.querySelector("base")?.getAttribute("href") || "/";
    window.location.href = `${base}${fallbackUrl.replace(/^\//, "")}`;
  }
}
