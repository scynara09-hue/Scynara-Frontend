const IconSearch   = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" width="14" height="14">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const IconFilter   = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" width="14" height="14">
    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
    <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
    <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
  </svg>
);
const IconCalendar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" width="14" height="14">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8"  y1="2" x2="8"  y2="6"/>
    <line x1="3"  y1="10" x2="21" y2="10"/>
  </svg>
);

export default function SalesToolbar({ search, onSearch, status, onStatus, dateRange, onDateRange }) {
  return (
    <div className="sales-toolbar">
      <div className="s-search">
        <span className="s-search-icon"><IconSearch /></span>
        <input
          type="text"
          placeholder="Buscar por cliente, ID o empleado..."
          value={search}
          onChange={e => onSearch(e.target.value)}
        />
      </div>

      <div className="s-filter">
        <IconFilter />
        <select value={status} onChange={e => onStatus(e.target.value)}>
          <option value="all">Todos los estados</option>
          <option value="completada">Completadas</option>
          <option value="cancelada">Canceladas</option>
          <option value="pendiente">Pendientes</option>
        </select>
      </div>

      <div className="s-filter">
        <IconCalendar />
        <select value={dateRange} onChange={e => onDateRange(e.target.value)}>
          <option value="today">Hoy</option>
          <option value="week">Esta semana</option>
          <option value="month">Este mes</option>
          <option value="all">Todo</option>
        </select>
      </div>
    </div>
  );
}