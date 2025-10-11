
// import axios, {
//   AxiosError,
//   type AxiosInstance,
//   type InternalAxiosRequestConfig,
//   type AxiosResponse,
//   AxiosHeaders,
// } from "axios";
// import { toast } from "react-toastify";
// import { userStorage } from "../../features/auth/storage/userStorage";
// import { logoutHelper } from "../../features/auth/utilities/auth";

// interface StatusAction {
//   message: string;
//   action: () => void;
// }

// const statusesConfig: Record<number, StatusAction> = {
//  401: {
//   message: "You are not authorized to access this resource",
//   action: function () {
//     toast.error(this.message);
//     logoutHelper("/login");
//   },
// },
//   403: {
//     message: "You do not have permission to access this resource",
//     action: function () {
//       toast.error(this.message);
//     },
//   },
//   404: {
//     message: "The requested resource was not found",
//     action: function () {
//       toast.error(this.message);
//     },
//   },
//   500: {
//     message: "An internal server error occurred",
//     action: function () {
//       toast.error(this.message);
//     },
//   },
// };

// export const httpClient: AxiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_BASE_URL || "https://api.escuelajs.co/api/v1",
//   headers: new AxiosHeaders({ "Content-Type": "application/json" }),
//   timeout: 15000,
// });

// httpClient.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     const token = userStorage.get();
//     if (token) {
//       if (config.headers instanceof AxiosHeaders) {
//         config.headers.set("Authorization", `Bearer ${token}`);
//       } else {
//         config.headers = new AxiosHeaders({
          
//           Authorization: `Bearer ${token}`,
//         });
//       }
//     }
//     return config;
//   },
//   (error: AxiosError) => Promise.reject(error)
// );

// httpClient.interceptors.response.use(
//   (response) => response,
//   (error: AxiosError) => {
//     console.log("Axios Error:", error);
//     const status = error.response?.status;
//     console.log("Response status:", status);
//     if (status && statusesConfig[status]) {
//       statusesConfig[status].action();
//     } else if (!status) {
//       toast.error("Network error. Please check your connection.");
//     }
//     return Promise.reject(error);
//   }
// );

import axios, {
  AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  AxiosHeaders,
} from "axios";
import { toast } from "react-toastify";
import { userStorage } from "../../features/auth/storage/userStorage";
import { logoutHelper } from "../../features/auth/utilities/auth";

const statusesConfig = {
  401: {
    message: "You are not authorized to access this resource",
    action() {
      toast.error(this.message);
      logoutHelper("/login");
    },
  },
  403: {
    message: "You do not have permission to access this resource",
    action() {
      toast.error(this.message);
    },
  },
  404: {
    message: "The requested resource was not found",
    action() {
      toast.error(this.message);
    },
  },
  500: {
    message: "An internal server error occurred",
    action() {
      toast.error(this.message);
    },
  },
};

const BASE_URL =
  import.meta.env.VITE_BASE_URL?.trim() ||
  "https://api.escuelajs.co/api/v1";

console.log("Axios Base URL:", BASE_URL);

export const httpClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: new AxiosHeaders({ "Content-Type": "application/json" }),
  timeout: 30000,
});

httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = userStorage.get();
    if (token && token.startsWith("ey")) {
      if (config.headers instanceof AxiosHeaders) {
        config.headers.set("Authorization", `Bearer ${token}`);
      } else {
        config.headers = new AxiosHeaders({
          ...config.headers,
          Authorization: `Bearer ${token}`,
        });
      }
    } else if (token) {
      console.warn("⚠️ Invalid token format detected:", token);
    }

    console.log("🚀 Request:", config.method?.toUpperCase(), config.baseURL + config.url);
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.code === "ECONNABORTED") {
      toast.error("Request timed out. Please try again later.");
      return Promise.reject(error);
    }

    const status = error.response?.status;
    console.error("Axios Error:", error);

    if (status && statusesConfig[status]) {
      statusesConfig[status].action();
    }
     else if (!status) {
      toast.error("Network error. Please check your connection or CORS settings.");
    }

    return Promise.reject(error);
  }
);
