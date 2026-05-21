import ClientCard from "./ClientCard";

const IconEmpty = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.5" strokeLinecap="round" width="48" height="48">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
  </svg>
);

export default function ClientsGrid({ clients, selectedId, onSelect, onEdit }) {
  if (!clients.length) {
    return (
      <div className="clients-empty">
        <IconEmpty />
        <p>No se encontraron clientes</p>
      </div>
    );
  }

  return (
    <div className="clients-grid">
      {clients.map((client, i) => (
        <ClientCard
          key={client.id_C}
          client={client}
          index={i}
          selected={client.id_C === selectedId}
          onSelect={onSelect}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}