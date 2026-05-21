const IconSearch = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" width="14" height="14">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const IconSort = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" width="14" height="14">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <polyline points="19 12 12 19 5 12"/>
  </svg>
);

export default function ClientsToolbar({ search, onSearch, sort, onSort, count }) {
  return (
    <div className="clients-toolbar">
      <div className="c-search">
        <span className="c-search-icon"><IconSearch /></span>
        <input
          type="text"
          placeholder="Buscar por nombre, email o RFC..."
          value={search}
          onChange={e => onSearch(e.target.value)}
        />
      </div>

      <div className="c-sort">
        <IconSort />
        <select value={sort} onChange={e => onSort(e.target.value)}>
          <option value="nombre">Nombre A-Z</option>
          <option value="compras">Más compras</option>
          <option value="total">Mayor gasto</option>
        </select>
      </div>

      <span className="c-count">{count} clientes</span>
    </div>
  );
}