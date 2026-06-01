import api from "./api";


export const loginRequest = (data) => api.post("/auth/login", data);
export const registerRequest = (data) => api.post("/auth/register", data); 
export const getProfileRequest = () => api.get("/auth/me");


export const getUsersRequest = () => api.get("/auth/users");
export const createUserRequest = (data) => api.post("/auth/users", data);
export const updateUserRequest = (id, data) => api.put(`/auth/users/${id}`, data);
export const deleteUserRequest = (id) => api.delete(`/auth/users/${id}`);


export const createEvaluationRequest = (data) => api.post("/evaluaciones", data);
export const getPublicEvaluationsRequest = () => api.get("/evaluaciones/publicas");