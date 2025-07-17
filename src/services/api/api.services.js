import axios from "axios";
import { getBaseUrl } from "../../Utils/integration.utils";

const onRequest = async (config) => {
  if (localStorage.getItem("token").length > 0) {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
  }
  return config;
};

const setupInterceptorsTo = (axiosInstance) => {
  axiosInstance.interceptors.request.use(onRequest);
  return axiosInstance;
};

const api = axios.create({
  baseURL: getBaseUrl("dev"),
  headers: {
    Accept: "application/json",
    "Content-Tye": "application/json",
  },
});

setupInterceptorsTo(api);
export default api;
