  import axios from "axios";
  import { getToken } from "../utils/token";

  const baseURL = import.meta.env.VITE_API_URL || "https://scynara-backend-production.up.railway.app";

  const api = axios.create({
    baseURL,
  });

  api.interceptors.request.use(
    (config) => {
      const token = getToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  export default api;