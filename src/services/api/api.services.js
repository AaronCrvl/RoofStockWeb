import axios from "axios";

const onRequest = async (config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
};

const setupInterceptorsTo = (axiosInstance) => {
  axiosInstance.interceptors.request.use(onRequest);
  return axiosInstance;
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://localhost:7237",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

setupInterceptorsTo(api);
export default api;
