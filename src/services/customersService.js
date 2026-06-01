import api from "./api"; 




export const getClientesRequest = () => api.get("/clientes");


export const getClienteRequest = (id) => api.get(`/clientes/${id}`);


export const createClienteRequest = (data) => api.post("/clientes", data);


export const updateClienteRequest = (id, data) => api.put(`/clientes/${id}`, data);


export const deleteClienteRequest = (id) => api.delete(`/clientes/${id}`);