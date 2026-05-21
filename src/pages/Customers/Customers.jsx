import { useState, useMemo } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import ClientsTopbar from "../../components/customers/ClientsTopbar";
import ClientsStats from "../../components/customers/ClientsStats";
import ClientsToolbar from "../../components/customers/ClientsToolbar";
import ClientsGrid from "../../components/customers/ClientsGrid";
import ClientDetailPanel from "../../components/customers/ClientDetailPanel";
import ClientModal from "../../components/customers/ClientModal";
import Toast from "../../components/inventory/Toast";
import "./Customers.css";

// Datos de ejemplo — reemplaza con tu API
const INITIAL_CLIENTS = [
  {
    id_C: 1,
    nombre: "María",
    apellidos: "Ramírez López",
    correo: "maria@ejemplo.com",
    telefono: "55 1234 5678",
    RFC: "RAMM850101ABC",
    direccion: "Calle Roble 45, Col. Jardines, CDMX",
    compras: [
      {
        id_venta: "V-001",
        fecha: "2026-04-20",
        total: 342,
        estado: "completada",
        productos: "Leche, Coca-Cola, Doritos",
      },
      {
        id_venta: "V-004",
        fecha: "2026-03-15",
        total: 210,
        estado: "completada",
        productos: "Arroz, Frijol",
      },
      {
        id_venta: "V-010",
        fecha: "2026-02-28",
        total: 95,
        estado: "cancelada",
        productos: "Agua, Doritos",
      },
    ],
  },
  {
    id_C: 2,
    nombre: "Jorge",
    apellidos: "López Martínez",
    correo: "jorge@gmail.com",
    telefono: "55 8765 4321",
    RFC: "",
    direccion: "Av. Principal 12, Col. Centro, Monterrey",
    compras: [
      {
        id_venta: "V-002",
        fecha: "2026-04-20",
        total: 89,
        estado: "completada",
        productos: "Arroz, Detergente",
      },
      {
        id_venta: "V-007",
        fecha: "2026-03-01",
        total: 450,
        estado: "completada",
        productos: "Refresco, Botanas",
      },
    ],
  },
  {
    id_C: 3,
    nombre: "Ana",
    apellidos: "Gutiérrez Pérez",
    correo: "ana@hotmail.com",
    telefono: "33 9876 5432",
    RFC: "GUPA920310XYZ",
    direccion: "Calle Pino 88, Col. Bosques, Guadalajara",
    compras: [
      {
        id_venta: "V-004",
        fecha: "2026-04-20",
        total: 670,
        estado: "completada",
        productos: "Pedigree, Shampoo",
      },
      {
        id_venta: "V-011",
        fecha: "2026-04-01",
        total: 130,
        estado: "completada",
        productos: "Leche, Pan",
      },
    ],
  },
  {
    id_C: 4,
    nombre: "Roberto",
    apellidos: "Mendoza Soto",
    correo: "roberto@empresa.com",
    telefono: "222 345 6789",
    RFC: "MESR780820DEF",
    direccion: "Blvd. Hermanos 34, Puebla",
    compras: [
      {
        id_venta: "V-006",
        fecha: "2026-04-19",
        total: 55,
        estado: "completada",
        productos: "Detergente Ariel",
      },
    ],
  },
  {
    id_C: 5,
    nombre: "Laura",
    apellidos: "Vázquez Ríos",
    correo: "laura@gmail.com",
    telefono: "477 234 5678",
    RFC: "",
    direccion: "Col. La Paloma, León",
    compras: [
      {
        id_venta: "V-008",
        fecha: "2026-04-18",
        total: 320,
        estado: "completada",
        productos: "Varios",
      },
      {
        id_venta: "V-012",
        fecha: "2026-03-05",
        total: 180,
        estado: "completada",
        productos: "Bebidas y snacks",
      },
    ],
  },
  {
    id_C: 6,
    nombre: "Carlos",
    apellidos: "Flores Herrera",
    correo: "carlos@correo.com",
    telefono: "442 567 8901",
    RFC: "FLHC890415GHI",
    direccion: "Fracc. El Roble, Querétaro",
    compras: [
      {
        id_venta: "V-009",
        fecha: "2026-04-17",
        total: 420,
        estado: "completada",
        productos: "Alimento mascota",
      },
      {
        id_venta: "V-013",
        fecha: "2026-02-14",
        total: 95,
        estado: "cancelada",
        productos: "Botanas",
      },
    ],
  },
];

let counter = 7;

function totalCompras(client) {
  return client.compras
    .filter((c) => c.estado === "completada")
    .reduce((a, c) => a + c.total, 0);
}

export default function Customers() {
  const [clients, setClients] = useState(INITIAL_CLIENTS);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("nombre");
  const [selectedId, setSelectedId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Filtrado + ordenado
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    let list = clients.filter(
      (c) =>
        !q ||
        `${c.nombre} ${c.apellidos}`.toLowerCase().includes(q) ||
        c.correo.toLowerCase().includes(q) ||
        (c.RFC || "").toLowerCase().includes(q),
    );
    if (sort === "nombre")
      list = [...list].sort((a, b) =>
        `${a.nombre}${a.apellidos}`.localeCompare(`${b.nombre}${b.apellidos}`),
      );
    if (sort === "compras")
      list = [...list].sort((a, b) => b.compras.length - a.compras.length);
    if (sort === "total")
      list = [...list].sort((a, b) => totalCompras(b) - totalCompras(a));
    return list;
  }, [clients, search, sort]);

  const selectedClient = clients.find((c) => c.id_C === selectedId) || null;
  const selectedIndex = selectedClient ? clients.indexOf(selectedClient) : 0;

  const handleEdit = (id) => {
    setEditing(clients.find((c) => c.id_C === id));
    setModalOpen(true);
  };

  const handleSave = (data) => {
    if (data.id_C) {
      setClients((prev) =>
        prev.map((c) => (c.id_C === data.id_C ? { ...c, ...data } : c)),
      );
      setToast("Cliente actualizado");
      if (selectedId === data.id_C) setSelectedId(data.id_C);
    } else {
      const newClient = { ...data, id_C: counter++, compras: [] };
      setClients((prev) => [...prev, newClient]);
      setToast("Cliente agregado correctamente");
    }
    setModalOpen(false);
    setEditing(null);
  };

  const handleDelete = (id) => {
    setClients((prev) => prev.filter((c) => c.id_C !== id));
    if (selectedId === id) setSelectedId(null);
    setToast("Cliente eliminado");
  };

  return (
    <div className="dash">
      {sidebarOpen && (
        <div className="sb-overlay" onClick={() => setSidebarOpen(false)} />
      )}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="clients-main">
        <div className="clients-body">
          {/* Columna izquierda */}
          <div className="clients-left">
            <ClientsTopbar
              onAdd={() => {
                setEditing(null);
                setModalOpen(true);
              }}
            />
            <ClientsStats clients={clients} />
            <ClientsToolbar
              search={search}
              onSearch={(v) => setSearch(v)}
              sort={sort}
              onSort={(v) => setSort(v)}
              count={filtered.length}
            />
            <ClientsGrid
              clients={filtered}
              selectedId={selectedId}
              onSelect={setSelectedId}
              onEdit={handleEdit}
            />
          </div>

          {/* Panel lateral */}
          <ClientDetailPanel
            client={selectedClient}
            clientIndex={selectedIndex}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>

      <ClientModal
        open={modalOpen}
        client={editing}
        onClose={() => {
          setModalOpen(false);
          setEditing(null);
        }}
        onSave={handleSave}
      />

      <Toast message={toast} onHide={() => setToast("")} />
    </div>
  );
}
