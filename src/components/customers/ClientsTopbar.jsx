const IconPlus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" width="15" height="15">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5"  y1="12" x2="19" y2="12"/>
  </svg>
);

export default function ClientsTopbar({ onAdd }) {
  return (
    <div className="clients-topbar">
      <div className="clients-title">
        <h1>Clientes</h1>
        <p>Gestiona tu base de clientes y su historial de compras</p>
      </div>
      <button className="clients-add-btn" onClick={onAdd}>
        <IconPlus />
        Agregar cliente
      </button>
    </div>
  );
}