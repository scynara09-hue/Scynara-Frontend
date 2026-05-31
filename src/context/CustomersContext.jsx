import { createContext, useContext, useState } from "react";
import {
  getClientesRequest,
  createClienteRequest,
  updateClienteRequest,
  deleteClienteRequest
} from "../services/customersService";

const CustomersContext = createContext();

// Hook personalizado para consumir el contexto de forma sencilla
export const useCustomers = () => {
  const context = useContext(CustomersContext);
  if (!context) {
    throw new Error("useCustomers debe ser utilizado dentro de un CustomersProvider");
  }
  return context;
};

export const CustomersProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  // ─── OBTENER CLIENTES ───
  const getCustomers = async () => {
    setLoading(true);
    try {
      setErrors([]);
      const res = await getClientesRequest();
      
      // Formateamos los datos directamente en el contexto para mantener limpia la UI
      const formattedData = (res.data || []).map(cli => ({
        ...cli,
        numero: `C-${String(cli.id_cliente).padStart(5, '0')}`,
        compras: cli.compras || [] // Previene errores de lectura de arrays en el panel de detalles
      }));
      
      setCustomers(formattedData);
      return formattedData;
    } catch (error) {
      setErrors([error.response?.data?.message || "Error al obtener los clientes"]);
      throw error; // Transmitimos el error por si la página necesita manejar el catch
    } finally {
      setLoading(false);
    }
  };

  // ─── CREAR CLIENTE ───
  const createCustomer = async (data) => {
    try {
      setErrors([]);
      const res = await createClienteRequest(data);
      return res.data;
    } catch (error) {
      setErrors([error.response?.data?.message || "Error al registrar el cliente"]);
      throw error; // 🔴 CRÍTICO: Permite que el modal intercepte los errores de campo de Zod
    }
  };

  // ─── ACTUALIZAR CLIENTE ───
  const updateCustomer = async (id, data) => {
    try {
      setErrors([]);
      const res = await updateClienteRequest(id, data);
      return res.data;
    } catch (error) {
      setErrors([error.response?.data?.message || "Error al actualizar el cliente"]);
      throw error; // 🔴 CRÍTICO: Permite que el modal mantenga los datos y se pinte de rojo
    }
  };

  // ─── ELIMINAR CLIENTE ───
  const deleteCustomer = async (id) => {
    try {
      setErrors([]);
      await deleteClienteRequest(id);
      return true;
    } catch (error) {
      setErrors([error.response?.data?.message || "Error al eliminar el cliente"]);
      throw error;
    }
  };

  return (
    <CustomersContext.Provider
      value={{
        customers,
        errors,
        loading,
        getCustomers,
        createCustomer,
        updateCustomer,
        deleteCustomer,
        setCustomers // Útil por si necesitas limpiar el estado local al desloguearse
      }}
    >
      {children}
    </CustomersContext.Provider>
  );
};