import { createContext, useContext, useEffect, useState } from "react";
import { getToken, setToken, removeToken } from "../utils/token";
import { jwtDecode } from "jwt-decode";
// Importamos las nuevas funciones que definimos en el servicio
import {
  loginRequest,
  getProfileRequest,
  getUsersRequest,
  updateUserRequest,
  deleteUserRequest
} from "../services/authService";

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
        console.error("Error validando el token de sesión", error);
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
      return false;
    }
  };

  // ─── CERRAR SESIÓN ───
  const logout = () => {
    removeToken();
    setUser(null);
    setIsAuthenticated(false);
  };

  // ─── NUEVAS FUNCIONES DE RUTAS CRUD INTEGRADAS ───

  // Obtener la lista completa de empleados (Para la tabla del Administrador)
  const getUsers = async () => {
    try {
      setErrors([]);
      const res = await getUsersRequest();
      return res.data; // Retorna el arreglo de usuarios que viene de la DB
    } catch (error) {
      setErrors([error.response?.data?.message || "Error al obtener los usuarios"]);
      return null;
    }
  };

  // Actualizar cualquier usuario por su ID
  const updateUser = async (id, data) => {
    try {
      setErrors([]);
      const res = await updateUserRequest(id, data);

      // Lógicareactiva: Si el usuario actualizado es el que está logueado actualmente,
      // actualizamos el estado global al instante para reflejar los cambios en la Sidebar/Navbar
      if (user && user.id_usuario === parseInt(id)) {
        setUser((prev) => ({
          ...prev,
          ...data,
          // Mantenemos propiedades calculadas o fijas que no mutan en el formulario
          nombre: data.nombre || prev.nombre,
          correo: data.correo || prev.correo
        }));
      }

      return true;
    } catch (error) {
      setErrors([error.response?.data?.message || "Error al actualizar el usuario"]);
      return false;
    }
  };

  // Eliminar un usuario por su ID
  const deleteUser = async (id) => {
    try {
      setErrors([]);
      await deleteUserRequest(id);
      return true;
    } catch (error) {
      setErrors([error.response?.data?.message || "Error al eliminar el usuario"]);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        getUsers,    // Exponemos los métodos para usarlos mediante destructuring
        updateUser,
        deleteUser,
        errors,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};