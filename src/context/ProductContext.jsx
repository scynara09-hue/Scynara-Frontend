import { createContext, useContext, useState, useCallback } from "react";
import {
  getProductsRequest,
  createProductRequest,
  updateProductRequest,
  deleteProductRequest
} from "../services/productsService";

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts debe ser usado dentro de un ProductProvider");
  }
  return context;
};

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener productos
  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getProductsRequest();
      setProducts(res.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Error al cargar el inventario");
    } finally {
      setLoading(false);
    }
  }, []);

  // Crear producto
  const addProduct = async (data) => {
    try {
      await createProductRequest(data);
      await loadProducts();
      return true;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  // Actualizar producto
  const updateProduct = async (id, data) => {
    try {
      await updateProductRequest(id, data);
      await loadProducts();
      return true;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  // Eliminar producto
  const deleteProduct = async (id) => {
    try {
      await deleteProductRequest(id);
      setProducts((prev) => prev.filter((p) => p.id_producto !== id));
      return true;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return (
    <ProductContext.Provider value={{
      products,
      loading,
      error,
      loadProducts,
      addProduct,
      updateProduct,
      deleteProduct
    }}>
      {children}
    </ProductContext.Provider>
  );
}