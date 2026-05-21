import api from "./api"; // Tu instancia de axios configurada

// ─── Operaciones de Ventas ───

// Obtener el historial de ventas de la sucursal (filtrado por backend)
export const getVentasRequest = () => api.get("/ventas");

// Obtener el detalle de una venta específica
export const getVentaByIdRequest = (id) => api.get(`/ventas/${id}`);

// Crear una nueva venta (esto descuenta stock automáticamente en el backend)
// El payload debe contener: { id_cliente, total, detalles: [{id_producto, cantidad, precio_unitario_venta}, ...] }
export const createVentaRequest = (ventaData) => api.post("/ventas", ventaData);