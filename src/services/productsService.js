import api from "./api"; // Asumiendo que aquí tienes tu instancia de Axios con el interceptor del token

// ─── CRUD de Productos ───

// Obtener toda la lista de productos (incluye nombres de proveedores y categorías gracias al backend)
export const getProductsRequest = () => api.get("/products");

// Obtener un producto específico por su ID
export const getProductByIdRequest = (id) => api.get(`/products/${id}`);

// Crear un nuevo producto
export const createProductRequest = (data) => api.post("/products", data);

// Actualizar un producto existente
export const updateProductRequest = (id, data) => api.put(`/products/${id}`, data);

// Eliminar un producto
export const deleteProductRequest = (id) => api.delete(`/products/${id}`);