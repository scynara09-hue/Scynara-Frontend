import { useEffect } from "react";
import { getProductos } from "../services/productosService";
import QRScanner from "../components/QRScanner/QRScanner";

function Productos() {
  useEffect(() => {
    getProductos()
      .then(data => console.log(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Productos 📦</h1>
      <QRScanner />
    </div>
  );
}

export default Productos;