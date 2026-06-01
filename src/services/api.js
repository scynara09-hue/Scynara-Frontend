  import axios from "axios";
  import { getToken, removeToken } from "../utils/token";

const baseURL = import.meta.env.VITE_API_URL;

if (!baseURL) {
  throw new Error('VITE_API_URL environment variable is not set');
}
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
      if (error.response?.status === 403 && error.response?.data?.code === 'REGISTRATION_CLOSED') {
        return Promise.reject(error);
      }
      
      if ((error.response?.status === 403 || error.response?.status === 401) && error.response?.data?.message?.includes('Token')) {
        removeToken();
        window.location.href = '/login';
        return Promise.reject(error);
      }
      
      if (error.response?.status === 401) {
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