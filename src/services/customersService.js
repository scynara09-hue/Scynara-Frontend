import api from "./api"; // Asegúrate de que apunte a tu archivo de configuración de Axios

// ─── PETICIONES API DE CLIENTES ───

// Obtener todos los clientes de la sucursal actual
export const getClientesRequest = () => api.get("/clientes");

// Obtener los detalles completos de un cliente por su ID
export const getClienteRequest = (id) => api.get(`/clientes/${id}`);

// Registrar un nuevo cliente
export const createClienteRequest = (data) => api.post("/clientes", data);

// Actualizar la información de un cliente existente
export const updateClienteRequest = (id, data) => api.put(`/clientes/${id}`, data);

// Eliminar de forma permanente un cliente por su ID
export const deleteClienteRequest = (id) => api.delete(`/clientes/${id}`);