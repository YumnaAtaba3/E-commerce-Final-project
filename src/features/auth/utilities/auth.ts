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
    const repoBase = "/E-commerce-Final-project";
    const baseUrl = window.location.origin + repoBase;
    const redirectPath = fallbackUrl.replace(/^\//, "");
    window.location.assign(`${baseUrl}/${redirectPath}`);
  }
}
