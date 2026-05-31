import api from "./api"; 
// Obtener la lista de categorías globales
export const getCategoriasRequest = () => api.get("/proveedores/categorias");
// Obtener la lista de proveedores de la tienda (el backend filtra automáticamente por tienda)
export const getProveedoresRequest = () => api.get("/proveedores");
// Obtener un proveedor específico
export const getProveedorByIdRequest = (id) => api.get(`/proveedores/${id}`);
// Crear un nuevo proveedor
export const createProveedorRequest = (data) => api.post("/proveedores", data);
// Actualizar un proveedor
export const updateProveedorRequest = (id, data) => api.put(`/proveedores/${id}`, data);
// Eliminar un proveedor
export const deleteProveedorRequest = (id) => api.delete(`/proveedores/${id}`);