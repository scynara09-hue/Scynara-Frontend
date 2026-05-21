import { Plus, Truck } from "lucide-react";

export default function SuppliersTopbar({ onAdd }) {
  return (
    <div className="suppliers-topbar">
      <div className="suppliers-title">
        <h1>Proveedores</h1>
        <p>Gestiona tus proveedores y sus catálogos</p>
      </div>
      <button className="suppliers-add-btn" onClick={onAdd}>
        <Plus size={15} />
        Nuevo proveedor
      </button>
    </div>
  );
}