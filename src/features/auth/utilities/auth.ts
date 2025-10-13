import { userStorage } from "../storage/userStorage";

export const REPO_NAME = "E-commerce-Final-project";

export function logoutHelper(fallbackUrl = "/login") {
  try {
    userStorage.remove();
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  } catch (error) {
    console.error("Logout cleanup failed:", error);
  }

  if (typeof window !== "undefined") {
    window.location.href = `/${REPO_NAME}${fallbackUrl}`;
  }
}
