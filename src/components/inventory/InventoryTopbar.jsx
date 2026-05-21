const IconPlus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" width="16" height="16">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

export default function InventoryTopbar({ onAdd }) {
  return (
    <div className="inv-topbar">
      <div className="inv-title">
        <h1>Inventario</h1>
        <p>Gestiona productos, stock y fechas de caducidad</p>
      </div>
      <button className="inv-add-btn" onClick={onAdd}>
        <IconPlus />
        <span>Agregar producto</span>
      </button>
    </div>
  );
}