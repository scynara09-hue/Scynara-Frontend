import api from "./api";

export const getVentasRequest = () => api.get("/ventas");

export const getVentaByIdRequest = (id) => api.get(`/ventas/${id}`);

export const createVentaRequest = (ventaData) => api.post("/ventas", ventaData);

export const cancelVentaRequest = (id) => api.patch(`/ventas/${id}/cancel`);