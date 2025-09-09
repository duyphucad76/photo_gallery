// axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_BACKEND_BASEURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    
    const token = localStorage.getItem("accessToken");
    const clientId = localStorage.getItem("clientId");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    if (clientId) {
      config.headers["x-client-id"] = clientId;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
