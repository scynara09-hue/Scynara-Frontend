import api from "./api";

// ─── Autenticación y Perfil ───
export const loginRequest = (data) => api.post("/auth/login", data);
export const registerRequest = (data) => api.post("/auth/register", data); 
export const getProfileRequest = () => api.get("/auth/me");

// ─── CRUD de Empleados/Usuarios ───
export const getUsersRequest = () => api.get("/auth/users");
export const createUserRequest = (data) => api.post("/auth/users", data);
export const updateUserRequest = (id, data) => api.put(`/auth/users/${id}`, data);
export const deleteUserRequest = (id) => api.delete(`/auth/users/${id}`);

// ─── Evaluaciones / Testimonios ───
export const createEvaluationRequest = (data) => api.post("/evaluaciones", data);
export const getPublicEvaluationsRequest = () => api.get("/evaluaciones/publicas");