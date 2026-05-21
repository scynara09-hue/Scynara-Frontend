import { createContext, useContext, useState } from "react";
import {
  getProveedoresRequest,
  getProveedorByIdRequest,
  createProveedorRequest,
  updateProveedorRequest,
  deleteProveedorRequest,
} from "../services/proveedorService";

const ProveedorContext = createContext();

export const useProveedores = () => {
  const context = useContext(ProveedorContext);
  if (!context) throw new Error("useProveedores debe estar dentro de un ProveedorProvider");
  return context;
};

export function ProveedorProvider({ children }) {
  const [proveedores, setProveedores] = useState([]);
  const [errors, setErrors] = useState([]);

  const getProveedores = async () => {
    try {
      const res = await getProveedoresRequest();
      setProveedores(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createProveedor = async (proveedor) => {
    try {
      const res = await createProveedorRequest(proveedor);
      setProveedores([...proveedores, res.data]);
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };

  const deleteProveedor = async (id) => {
    try {
      await deleteProveedorRequest(id);
      setProveedores(proveedores.filter((p) => p.id_proveedor !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const getProveedor = async (id) => {
    try {
      const res = await getProveedorByIdRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateProveedor = async (id, proveedor) => {
    try {
      await updateProveedorRequest(id, proveedor);
      // Actualizamos el estado local después de una edición exitosa
      setProveedores(
        proveedores.map((p) => (p.id_proveedor === id ? { ...p, ...proveedor } : p))
      );
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };

  return (
    <ProveedorContext.Provider
      value={{
        proveedores,
        getProveedores,
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