import { createContext, useContext, useState } from "react";
import { createVentaRequest, getVentasRequest, getVentaByIdRequest } from "../services/ventasService";

const VentaContext = createContext();

export const useVentas = () => {
  const context = useContext(VentaContext);
  if (!context) throw new Error("useVentas debe estar dentro de un VentaProvider");
  return context;
};

export function VentaProvider({ children }) {
  const [ventas, setVentas] = useState([]);
  const [carrito, setCarrito] = useState([]); // Array de productos seleccionados

  // Obtener historial
  const getVentas = async () => {
    try {
      const res = await getVentasRequest();
      setVentas(res.data);
    } catch (error) {
      console.error("Error al obtener ventas:", error);
    }
  };

  // ── Lógica del Carrito ──
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
        precio_unitario_venta: producto.precio_unitario
      }];
    });
  };

  const quitarDelCarrito = (id_producto) => {
    setCarrito(prev => prev.filter(item => item.id_producto !== id_producto));
  };

  const limpiarCarrito = () => setCarrito([]);

  // Procesar venta final
  const procesarVenta = async (ventaData) => {
    try {
      const res = await createVentaRequest(ventaData);
      setCarrito([]); // Limpiamos tras éxito
      return res.data;
    } catch (error) {
      throw error; // El controlador capturará el error de stock/validación
    }
  };

  return (
    <VentaContext.Provider value={{
      ventas, carrito,
      getVentas, agregarAlCarrito, quitarDelCarrito, limpiarCarrito, procesarVenta
    }}>
      {children}
    </VentaContext.Provider>
  );
}