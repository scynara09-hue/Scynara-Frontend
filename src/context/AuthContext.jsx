import { createContext, useContext, useEffect, useState } from "react";
import { getToken, setToken, removeToken } from "../utils/token";
import { jwtDecode } from "jwt-decode";

// 💡 Importamos la nueva función createEvaluationRequest
import {
  loginRequest,
  getProfileRequest,
  getUsersRequest,
  updateUserRequest,
  deleteUserRequest,
  createUserRequest,
  createEvaluationRequest
} from "../services/authService"; // Ajusta la ruta si tu archivo se llama diferente

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const isTokenValid = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

export const AuthProvider = ({ children }) => {
  // 💡 Corregido el pequeño error de tipeo aquí
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  // ─── VERIFICAR SESIÓN AL RECARGAR ───
  useEffect(() => {
    const checkLogin = async () => {
      const token = getToken();

      if (!token || !isTokenValid(token)) {
        removeToken();
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const res = await getProfileRequest();
        setUser({
          ...res.data,
          token
        });
        setIsAuthenticated(true);
      } catch (error) {
        removeToken();
        setIsAuthenticated(false);
        setUser(null);
      }
      setLoading(false);
    };

    checkLogin();
  }, []);

  // ─── INICIAR SESIÓN ───
  const login = async (data) => {
    try {
      setErrors([]);
      const res = await loginRequest(data);
      const token = res.data.token;
      setToken(token);

      const profileRes = await getProfileRequest();
      setUser({
        ...profileRes.data,
        token
      });

      setIsAuthenticated(true);
      return true;
    } catch (error) {
      setErrors([error.response?.data?.message || "Error en login"]);
      throw error;
    }
  };

  // ─── CERRAR SESIÓN ───
  const logout = () => {
    removeToken();
    setUser(null);
    setIsAuthenticated(false);
  };

  // ─── CRUD INTEGRADAS ───
  const createUser = async (data) => {
    try {
      setErrors([]);
      const res = await createUserRequest(data);
      return res.data;
    } catch (error) {
      setErrors([error.response?.data?.message || "Error al crear el usuario"]);
      throw error; 
    }
  };

  const getUsers = async () => {
    try {
      setErrors([]);
      const res = await getUsersRequest();
      return res.data; 
    } catch (error) {
      setErrors([error.response?.data?.message || "Error al obtener los usuarios"]);
      throw error; 
    }
  };

  const updateUser = async (id, data) => {
    try {
      setErrors([]);
      const res = await updateUserRequest(id, data);

      if (user && user.id_usuario === parseInt(id)) {
        setUser((prev) => ({
          ...prev,
          ...data,
          nombre: data.nombre || prev.nombre,
          correo: data.correo || prev.correo
        }));
      }

      return true;
    } catch (error) {
      setErrors([error.response?.data?.message || "Error al actualizar el usuario"]);
      throw error; 
    }
  };

  const deleteUser = async (id) => {
    try {
      setErrors([]);
      await deleteUserRequest(id);
      return true;
    } catch (error) {
      setErrors([error.response?.data?.message || "Error al eliminar el usuario"]);
      throw error; 
    }
  };

  // ─── NUEVA FUNCIÓN: ENVIAR EVALUACIÓN ───
  const sendEvaluation = async (data) => {
    try {
      setErrors([]);
      // data debe ser un objeto: { calificacion: 5, comentario: "..." }
      const res = await createEvaluationRequest(data);
      return res.data; 
    } catch (error) {
      // Manejamos los errores de Zod o del servidor
      const errMsg = error.response?.data?.message || "Error al enviar la evaluación";
      setErrors([errMsg]);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        getUsers,   
        updateUser,
        deleteUser,
        createUser,
        sendEvaluation, // 💡 Exponemos la nueva función al resto de la app
        errors,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};