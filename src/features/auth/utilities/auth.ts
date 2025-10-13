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
     
    window.location.href = `${fallbackUrl.replace(/^\//, "")}`;
  }
}

// import { appRoutes } from "../../../routes";
// import { userStorage } from "../storage/userStorage";

// export function logoutHelper(fallbackUrl = appRoutes.auth.signUp) {
//   try {
//     userStorage.remove();
//     localStorage.removeItem("refreshToken");
//     localStorage.removeItem("user");
//   } catch (error) {
//     console.error("Logout cleanup failed:", error);
//   }

//   if (typeof window !== "undefined") {
//     const base =
//       window.location.hostname.includes("github.io")
//         ? "/E-commerce-Final-project/"
//         : import.meta.env.BASE_URL || "/";

//     window.location.href = `${base}${fallbackUrl.replace(/^\//, "")}`;
//   }
// }
