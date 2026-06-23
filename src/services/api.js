import axios from "axios";
import { getToken, removeToken } from "../utils/token";

const PRODUCTION_API_URL = "https://web-production-8bf2b.up.railway.app";
const LEGACY_API_URLS = new Set([
  "https://scynara-backend-production.up.railway.app",
]);

const normalizeUrl = (url = "") => url.trim().replace(/\/+$/, "");
const configuredUrl = normalizeUrl(import.meta.env.VITE_API_URL);

// Evita que una variable antigua de Vercel siga enviando las solicitudes
// al despliegue anterior de Railway.
const baseURL =
  import.meta.env.PROD && (!configuredUrl || LEGACY_API_URLS.has(configuredUrl))
    ? PRODUCTION_API_URL
    : configuredUrl || "http://localhost:3000";

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

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const originalRequest = error.config;
      const isAuthRequest = originalRequest?.url?.includes('/auth/login') || originalRequest?.url?.includes('/auth/register');

      if (error.response?.status === 403 && error.response?.data?.code === 'REGISTRATION_CLOSED') {
        return Promise.reject(error);
      }
      
      if ((error.response?.status === 403 || error.response?.status === 401) && error.response?.data?.message?.includes('Token')) {
        removeToken();
        window.location.href = '/login';
        return Promise.reject(error);
      }
      
      if (error.response?.status === 401 && !isAuthRequest) {
        removeToken();
        window.location.href = '/login';
        return Promise.reject(error);
      }
      
      if (error.response?.status === 429) {
        error.message = 'Demasiadas solicitudes. Intenta más tarde.';
      }
      
      return Promise.reject(error);
    }
  );

  export default api;
