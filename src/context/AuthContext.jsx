import { createContext, useContext, useEffect, useState } from "react";
import { getToken, setToken, removeToken } from "../utils/token";
import { jwtDecode } from "jwt-decode";
// Importamos las funciones que definimos en el servicio
import {
  loginRequest,
  getProfileRequest,
  getUsersRequest,
  updateUserRequest,
  deleteUserRequest,
  createUserRequest,
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
      throw error; // 🔴 Lanzamos el error hacia el componente (ej. Login.jsx)
    }
  };

  // ─── CERRAR SESIÓN ───
  const logout = () => {
    removeToken();
    setUser(null);
    setIsAuthenticated(false);
  };

  // ─── NUEVAS FUNCIONES DE RUTAS CRUD INTEGRADAS ───

const createUser = async (data) => {
    try {
      setErrors([]);
      const res = await createUserRequest(data);
      return res.data;
    } catch (error) {
      setErrors([error.response?.data?.message || "Error al crear el usuario"]);
      
      // Lanzamos el error hacia arriba
      throw error; 
    }
  };

  // Obtener la lista completa de empleados (Para la tabla del Administrador)
  const getUsers = async () => {
    try {
      setErrors([]);
      const res = await getUsersRequest();
      return res.data; // Retorna el arreglo de usuarios que viene de la DB
    } catch (error) {
      setErrors([error.response?.data?.message || "Error al obtener los usuarios"]);
      throw error; // 🔴 Lanzamos el error hacia Employees.jsx
    }
  };

  // Actualizar cualquier usuario por su ID
  const updateUser = async (id, data) => {
    try {
      setErrors([]);
      const res = await updateUserRequest(id, data);

      // Lógica reactiva: Si el usuario actualizado es el que está logueado actualmente,
      // actualizamos el estado global al instante para reflejar los cambios.
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
      throw error; // 🔴 Lanzamos el error hacia Employees.jsx / EmployeeModal.jsx
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
      throw error; // 🔴 Lanzamos el error para que la UI sepa que falló
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
        errors,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};