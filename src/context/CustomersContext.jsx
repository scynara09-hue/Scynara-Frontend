import { createContext, useContext, useState } from "react";
import {
  getClientesRequest,
  createClienteRequest,
  updateClienteRequest,
  deleteClienteRequest
} from "../services/customersService";

const CustomersContext = createContext();


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

  
  const getCustomers = async () => {
    setLoading(true);
    try {
      setErrors([]);
      const res = await getClientesRequest();
      
      
      const formattedData = (res.data || []).map(cli => ({
        ...cli,
        numero: `C-${String(cli.id_cliente).padStart(5, '0')}`,
        compras: cli.compras || [] 
      }));
      
      setCustomers(formattedData);
      return formattedData;
    } catch (error) {
      setErrors([error.response?.data?.message || "Error al obtener los clientes"]);
      throw error; 
    } finally {
      setLoading(false);
    }
  };

  
  const createCustomer = async (data) => {
    try {
      setErrors([]);
      const res = await createClienteRequest(data);
      return res.data;
    } catch (error) {
      setErrors([error.response?.data?.message || "Error al registrar el cliente"]);
      throw error; 
    }
  };

  
  const updateCustomer = async (id, data) => {
    try {
      setErrors([]);
      const res = await updateClienteRequest(id, data);
      return res.data;
    } catch (error) {
      setErrors([error.response?.data?.message || "Error al actualizar el cliente"]);
      throw error; 
    }
  };

  
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
        setCustomers 
      }}
    >
      {children}
    </CustomersContext.Provider>
  );
};