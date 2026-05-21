import "./Testimonials.css";

const Stars = () => (
  Array.from({ length: 5 }).map((_, i) => (
    <svg key={i} className="t-star" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ))
);

const testimonials = [
  {
    quote: <>Antes llevaba todo en Excel y siempre había errores en el inventario. Con Scynara sé exactamente cuánto tengo de cada producto y qué está por caducar. <strong>El cambio fue inmediato.</strong></>,
    name: "María Ramírez",
    business: "Abarrotes La Esperanza · CDMX",
    initials: "MR",
    avatarClass: "av-purple",
    featured: true,
  },
  {
    quote: <>Los proveedores ya no son un dolor de cabeza. Sé exactamente quién me surte cada producto y cuándo llega. <strong>El control de ventas por empleado también me ayudó mucho.</strong></>,
    name: "Jorge López",
    business: "Mini super Don Jorge · Monterrey",
    initials: "JL",
    avatarClass: "av-blue",
  },
  {
    quote: <>Mis empleados se adaptaron rápido. Cada quien tiene su acceso y yo como encargada puedo ver todo desde mi cuenta. <strong>La facturación con RFC ya no me toma más de un minuto.</strong></>,
    name: "Ana Gutiérrez",
    business: "Abarrotes El Triunfo · Guadalajara",
    initials: "AG",
    avatarClass: "av-green",
  },
  {
    quote: <>Tenía miedo de que fuera complicado pero la configuración inicial fue sencilla. En una tarde ya tenía todos mis productos cargados con sus categorías y proveedores. <strong>Muy intuitivo.</strong></>,
    name: "Roberto Mendoza",
    business: "Tienda San Isidro · Puebla",
    initials: "RM",
    avatarClass: "av-amber",
  },
  {
    quote: <>El reporte de ventas por empleado me permite saber quién atiende mejor y en qué turnos se vende más. <strong>Nunca imaginé tener esa visibilidad en mi tiendita.</strong></>,
    name: "Laura Vázquez",
    business: "Abarrotes La Paloma · León",
    initials: "LV",
    avatarClass: "av-pink",
  },
  {
    quote: <>Ya no pierdo dinero por productos caducados. La alerta me avisa con tiempo y puedo hacer promociones antes de que se venzan. <strong>Se pagó solo en el primer mes.</strong></>,
    name: "Carlos Flores",
    business: "Minisuper El Roble · Querétaro",
    initials: "CF",
    avatarClass: "av-teal",
  },
];

const stats = [
  { num: "+1,200", label: "Tiendas activas" },
  { num: "98%",   label: "Satisfacción" },
  { num: "24/7",  label: "Soporte incluido" },
];

export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="t-bg" />
      <div className="t-blob t-blob--1" />
      <div className="t-blob t-blob--2" />

      <div className="t-header">
        <div className="t-badge">
          <span className="t-badge__dot" />
          Casos reales
        </div>
        <h2>Lo que dicen nuestros<br /><span>clientes</span></h2>
        <p>Tiendas de abarrotes que ya dejaron las hojas de cálculo atrás y ahora operan con control total.</p>
      </div>

      <div className="t-grid">
        {testimonials.map((t, i) => (
          <div key={i} className={`t-card ${t.featured ? "t-card--featured" : ""}`}>
            <div className="t-stars"><Stars /></div>
            <p className="t-quote">{t.quote}</p>
            <div className="t-divider" />
            <div className="t-author">
              <div className={`t-avatar ${t.avatarClass}`}>{t.initials}</div>
              <div className="t-author-info">
                <p>{t.name}</p>
                <span>{t.business}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="t-stats">
        {stats.map((s, i) => (
          <div key={i} className="t-stat">
            <div className="t-stat__num">{s.num}</div>
            <div className="t-stat__label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}