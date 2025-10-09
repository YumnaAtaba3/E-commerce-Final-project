import { userStorage } from "../storage/userStorage";

export function logoutHelper(fallbackUrl = "/login") {
  try {

    userStorage.remove();


    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    console.log(" Tokens and user data cleared successfully");
  } catch (error) {
    console.error(" Logout cleanup failed:", error);
  }

  
  if (typeof window !== "undefined") {
    window.location.href = fallbackUrl;
  }
}
