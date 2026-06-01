import { createContext, useContext, useState } from "react";
import { 
  createVentaRequest, 
  getVentasRequest, 
  getVentaByIdRequest,
  cancelVentaRequest
} from "../services/ventasService";

const VentaContext = createContext();

export const useVentas = () => {
  const context = useContext(VentaContext);
  if (!context) throw new Error("useVentas debe estar dentro de un VentaProvider");
  return context;
};

export function VentaProvider({ children }) {
  const [ventas, setVentas] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [errors, setErrors] = useState(null);

  const totalCarrito = carrito.reduce(
    (acc, item) => acc + (item.cantidad * item.precio_unitario_venta), 0
  );

  const getVentas = async () => {
    try {
      const res = await getVentasRequest();
      setVentas(res.data);
    } catch (error) {    }
  };

  const agregarAlCarrito = (producto, cantidad) => {
    setCarrito(prev => {
      const existente = prev.find(item => item.id_producto === producto.id_producto);
      
      if (existente) {
        return prev.map(item =>
          item.id_producto === producto.id_producto
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      }
      
      return [...prev, {
        id_producto: producto.id_producto,
        nombre: producto.nombre,
        cantidad,
        precio_unitario_venta: Number(producto.precio_unitario)
      }];
    });
  };

  const quitarDelCarrito = (id_producto) => {
    setCarrito(prev => prev.filter(item => item.id_producto !== id_producto));
  };

  const limpiarCarrito = () => {
    setCarrito([]);
    setErrors(null);
  };

  const procesarVenta = async (id_cliente, metodo_pago) => {
    try {
      setErrors(null);

      const payload = {
        id_cliente: Number(id_cliente),
        metodo_pago: metodo_pago,
        total: totalCarrito,
        detalles: carrito.map(item => ({
          id_producto: item.id_producto,
          cantidad: item.cantidad,
          precio_unitario_venta: item.precio_unitario_venta
        }))
      };

      const res = await createVentaRequest(payload);
      setCarrito([]);
      return res.data;

    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: error.response?.data?.message || "Error al procesar la venta" });
      }
      throw error;
    }
  };

  const cancelarVenta = async (id) => {
    try {
      const res = await cancelVentaRequest(id);
      await getVentas();
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  return (
    <VentaContext.Provider value={{
      ventas, 
      carrito, 
      totalCarrito,
      errors,
      getVentas, 
      agregarAlCarrito, 
      quitarDelCarrito, 
      limpiarCarrito, 
      procesarVenta,
      cancelarVenta,
      setErrors
    }}>
      {children}
    </VentaContext.Provider>
  );
}