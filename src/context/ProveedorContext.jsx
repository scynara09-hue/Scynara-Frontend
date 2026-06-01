import { createContext, useContext, useState } from "react";
import {
  getProveedoresRequest,
  getProveedorByIdRequest,
  createProveedorRequest,
  updateProveedorRequest,
  deleteProveedorRequest,
  getCategoriasRequest, 
} from "../services/proveedorService";

const ProveedorContext = createContext();

export const useProveedores = () => {
  const context = useContext(ProveedorContext);
  if (!context) throw new Error("useProveedores debe estar dentro de un ProveedorProvider");
  return context;
};

export function ProveedorProvider({ children }) {
  const [proveedores, setProveedores] = useState([]);
  const [categorias, setCategorias] = useState([]); 
  const [errors, setErrors] = useState([]);

  
  const getCategorias = async () => {
    try {
      const res = await getCategoriasRequest();
      setCategorias(res.data);
    } catch (error) {    }
  };

  const getProveedores = async () => {
    try {
      const res = await getProveedoresRequest();
      setProveedores(res.data);
    } catch (error) {    }
  };

 const createProveedor = async (proveedor) => {
    try {
      await createProveedorRequest(proveedor);
      await getProveedores(); 
    } catch (error) {
      setErrors([error.response?.data?.mensaje || "Error al crear proveedor"]);
      throw error.response?.data || error; 
    }
  };

  const deleteProveedor = async (id) => {
    try {
      await deleteProveedorRequest(id);
      setProveedores(proveedores.filter((p) => p.id_proveedor !== id));
    } catch (error) {    }
  };

  const getProveedor = async (id) => {
    try {
      const res = await getProveedorByIdRequest(id);
      return res.data;
    } catch (error) {    }
  };

  const updateProveedor = async (id, proveedor) => {
    try {
      await updateProveedorRequest(id, proveedor);
      setProveedores(
        proveedores.map((p) => (p.id_proveedor === id ? { ...p, ...proveedor } : p))
      );
    } catch (error) {
      setErrors([error.response?.data?.mensaje || "Error al actualizar proveedor"]);
      throw error.response?.data || error; 
    }
  };

  return (
    <ProveedorContext.Provider
      value={{
        proveedores,
        categorias, 
        getProveedores,
        getCategorias, 
        createProveedor,
        deleteProveedor,
        getProveedor,
        updateProveedor,
        errors,
      }}
    >
      {children}
    </ProveedorContext.Provider>
  );
}