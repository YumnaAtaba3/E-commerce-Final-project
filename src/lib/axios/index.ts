
import axios, {
  AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
  AxiosHeaders,
} from "axios";
import { toast } from "react-toastify";
import { userStorage } from "../../features/auth/storage/userStorage";
import { logoutHelper } from "../../features/auth/utilities/auth";

interface StatusAction {
  message: string;
  action: () => void;
}

const statusesConfig: Record<number, StatusAction> = {
 401: {
  message: "You are not authorized to access this resource",
  action: function () {
    toast.error(this.message);
    logoutHelper("/login");
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

export const httpClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "https://api.escuelajs.co/api/v1",
  headers: new AxiosHeaders({ "Content-Type": "application/json" }),
  timeout: 15000,
});

httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = userStorage.get();
    if (token) {
      if (config.headers instanceof AxiosHeaders) {
        config.headers.set("Authorization", `Bearer ${token}`);
      } else {
        config.headers = new AxiosHeaders({
          
          Authorization: `Bearer ${token}`,
        });
      }
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

httpClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    if (status && statusesConfig[status]) {
      statusesConfig[status].action();
    } else if (!status) {
      toast.error("Network error. Please check your connection.",{ className: "toast-error"});
    }
    return Promise.reject(error);
  }
);
