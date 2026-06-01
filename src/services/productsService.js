import api from "./api"; 




export const getProductsRequest = () => api.get("/products");


export const getProductByIdRequest = (id) => api.get(`/products/${id}`);


export const createProductRequest = (data) => api.post("/products", data);


export const updateProductRequest = (id, data) => api.put(`/products/${id}`, data);


export const deleteProductRequest = (id) => api.delete(`/products/${id}`);