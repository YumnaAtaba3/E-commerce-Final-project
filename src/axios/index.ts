import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios";
// import { logoutHelper } from "../../features/auth/utilities/auth";
// import { userStorage } from "../../features/auth/storage";
import { toast } from "react-toastify";

// Define a type for our custom status configuration
interface StatusAction {
  message: string;
  action: () => void;
}

const statusesConfig: Record<number, StatusAction> = {
  401: {
    message: "You are not authorized to access this resource",
    action: function () {
      toast.error(this.message);
    //   logoutHelper();
      window.location.reload();
    },
  },
  403: {
    message: "You do not have permission to access this resource",
    action: function () {
      toast.error(this.message);
    },
  },
  404: {
    message: "The requested resource was not found",
    action: function () {
      toast.error(this.message);
    },
  },
  500: {
    message: "An internal server error occurred",
    action: function () {
      toast.error(this.message);
    },
  },
};

// Create axios instance
export const httpClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL as string,
});

// ✅ Request interceptor — attach token if available
httpClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = userStorage.get();
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// ✅ Response interceptor — handle status codes
httpClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    if (status && statusesConfig[status]) {
      statusesConfig[status].action();
    }
    return Promise.reject(error);
  }
);
