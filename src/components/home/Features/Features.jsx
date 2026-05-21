import "./Features.css";


export default function Features() {
    const IconHome = () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    );

    const IconDollar = () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
    );

    const IconUsers = () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    );

    const IconTruck = () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="3" width="15" height="13" rx="2" />
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
            <circle cx="5.5" cy="18.5" r="2.5" />
            <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
    );

    const IconUser = () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="#f472b6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
            <path d="M12 11v4" />
            <path d="M10 13h4" />
        </svg>
    );

    const IconChart = () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
    );
    const features = [
        {
            icon: <IconHome />,
            iconClass: "icon-purple",
            title: "Inventario en tiempo real",
            desc: "Controla existencias, fechas de caducidad y alertas de stock bajo. Actualización automática con cada venta registrada.",
            tag: "Productos · Categorías",
            featured: true,
        },
        {
            icon: <IconDollar />,
            iconClass: "icon-green",
            title: "Registro de ventas",
            desc: "Registra transacciones con detalle: productos, cantidades, precios y cliente asociado. Con soporte para facturación con RFC.",
            tag: "Ventas · Detalle_Venta",
        },
        {
            icon: <IconUsers />,
            iconClass: "icon-blue",
            title: "Gestión de clientes",
            desc: "Registra datos de contacto, dirección y RFC opcional. Consulta el historial de compras de cada cliente de forma rápida.",
            tag: "Clientes · Facturación",
        },
        {
            icon: <IconTruck />,
            iconClass: "icon-amber",
            title: "Control de proveedores",
            desc: "Asocia proveedores a los productos que suministran. Rastrea tiempos de entrega y datos de contacto de cada empresa.",
            tag: "Proveedores · Productos",
        },
        {
            icon: <IconUser />,
            iconClass: "icon-pink",
            title: "Roles y accesos",
            desc: "Administradores y empleados con privilegios diferenciados. Control de horarios, estado activo/inactivo y autenticación segura.",
            tag: "Empleados · Administradores",
        },
        {
            icon: <IconChart />,
            iconClass: "icon-teal",
            title: "Reportes y consultas",
            desc: "Visualiza ventas por usuario, productos por categoría y niveles de inventario. Datos claros para tomar mejores decisiones.",
            tag: "Reportes · Análisis",
        },
    ];

    return (
        <section className="features">
            <div className="features-bg" />
            <div className="features-blob features-blob--1" />
            <div className="features-blob features-blob--2" />

            <div className="features-header">
                <div className="features-badge">
                    <span className="features-badge__dot" />
                    Todo en un solo lugar
                </div>
                <h2>Gestiona cada parte<br />de tu <span>negocio</span></h2>
                <p>Desde el inventario hasta las ventas, cada módulo fue diseñado para simplificar tu operación diaria.</p>
            </div>

            <div className="features-grid">
                {features.map((f, i) => (
                    <div key={i} className={`feature-card ${f.featured ? "feature-card--featured" : ""}`}>
                        <div className={`feature-icon ${f.iconClass}`}>{f.icon}</div>
                        <h3>{f.title}</h3>
                        <p>{f.desc}</p>
                        <span className="feature-tag">{f.tag}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}   