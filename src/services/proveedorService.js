import api from "./api"; 

export const getCategoriasRequest = () => api.get("/proveedores/categorias");

export const getProveedoresRequest = () => api.get("/proveedores");

export const getProveedorByIdRequest = (id) => api.get(`/proveedores/${id}`);

export const createProveedorRequest = (data) => api.post("/proveedores", data);

export const updateProveedorRequest = (id, data) => api.put(`/proveedores/${id}`, data);

export const deleteProveedorRequest = (id) => api.delete(`/proveedores/${id}`);