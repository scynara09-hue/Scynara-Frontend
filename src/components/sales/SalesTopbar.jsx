const IconPlus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" width="16" height="16">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

export default function SalesTopbar({ onNew }) {
  return (
    <div className="sales-topbar">
      <div className="sales-title">
        <h1>Ventas</h1>
        <p>Historial completo y registro de nuevas transacciones</p>
      </div>
      <button className="sales-add-btn" onClick={onNew}>
        <IconPlus />
        Nueva venta
      </button>
    </div>
  );
}