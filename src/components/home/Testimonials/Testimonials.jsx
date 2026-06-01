import { useState, useEffect } from "react";

import { getPublicEvaluationsRequest } from "../../../services/authService"; 
import "./Testimonials.css";

const Stars = ({ count }) => (
  Array.from({ length: 5 }).map((_, i) => (
    <svg 
      key={i} 
      className="t-star" 
      viewBox="0 0 24 24"
      fill={i < count ? "currentColor" : "none"} 
      style={{ color: i < count ? "#fbbf24" : "var(--color-text-tertiary)" }}
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ))
);

const BACKUP_TESTIMONIALS = [
  { comentario: "Antes llevaba todo en Excel y siempre había errores en el inventario. Con Scynara sé exactamente cuánto tengo de cada producto y qué está por caducar. El cambio fue inmediato.", autor: "María Ramírez", empresa: "Abarrotes La Esperanza · CDMX", iniciales: "MR" },
  { comentario: "Los proveedores ya no son un dolor de cabeza. Sé exactamente quién me surte cada producto y cuándo llega. El control de ventas por empleado también me ayudó mucho.", autor: "Jorge López", empresa: "Mini super Don Jorge · Monterrey", iniciales: "JL" },
  { comentario: "Mis empleados se adaptaron rápido. Cada quien tiene su acceso y yo como encargada puedo ver todo desde mi cuenta. La facturación con RFC ya no me toma más de un minuto.", autor: "Ana Gutiérrez", empresa: "Abarrotes El Triunfo · Guadalajara", iniciales: "AG" }
];

const AVATAR_COLORS = ["av-purple", "av-blue", "av-green", "av-amber", "av-pink", "av-teal"];

const stats = [
  { num: "+1,200", label: "Tiendas activas" },
  { num: "98%",   label: "Satisfacción" },
  { num: "24/7",  label: "Soporte incluido" },
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        
        const res = await getPublicEvaluationsRequest();
        
        
        const json = res.data; 

        if (json.success && json.data.length > 0) {
          setTestimonials(json.data);
        } else {
          setTestimonials(BACKUP_TESTIMONIALS);
        }
      } catch (error) {        setTestimonials(BACKUP_TESTIMONIALS);
      }
    };

    fetchTestimonials();
  }, []);

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
        {testimonials.map((t, i) => {
          const avatarColor = AVATAR_COLORS[i % AVATAR_COLORS.length];
          const isFeatured = i === 0;

          return (
            <div key={t.id_evaluacion || i} className={`t-card ${isFeatured ? "t-card--featured" : ""}`}>
              <div className="t-stars">
                <Stars count={t.calificacion || 5} />
              </div>
              <p className="t-quote">{t.comentario}</p>
              <div className="t-divider" />
              <div className="t-author">
                <div className={`t-avatar ${avatarColor}`}>{t.iniciales}</div>
                <div className="t-author-info">
                  <p>{t.autor}</p>
                  <span>{t.empresa}</span>
                </div>
              </div>
            </div>
          );
        })}
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