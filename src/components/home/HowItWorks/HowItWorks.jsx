import "./HowItWorks.css";

const steps = [
  {
    num: "01",
    tag: "Configuración inicial",
    title: "Crea tu cuenta y configura tu tienda",
    desc: "Regístrate como administrador, define las categorías de tus productos (comestibles, bebidas, perecederos, etc.) y agrega a tus empleados con sus respectivos horarios y roles.",
    details: ["Administrador", "Empleados", "Categorías"],
  },
  {
    num: "02",
    tag: "Inventario",
    title: "Registra tus productos y proveedores",
    desc: "Da de alta cada producto con su precio unitario, precio por caja, cantidad en existencia y fecha de caducidad. Asocia cada producto a su proveedor para un control total del abastecimiento.",
    details: ["Productos", "Proveedores", "Stock inicial"],
  },
  {
    num: "03",
    tag: "Operación diaria",
    title: "Registra ventas y gestiona clientes",
    desc: "Cada venta queda registrada con su detalle de productos, el empleado que la atendió y el cliente asociado. El inventario se actualiza automáticamente y puedes generar facturas con RFC cuando se solicite.",
    details: ["Ventas", "Clientes", "Facturación RFC", "Auto-inventario"],
  },
  {
    num: "04",
    tag: "Control total",
    title: "Monitorea y toma decisiones con datos",
    desc: "Consulta reportes de ventas por empleado, productos próximos a caducar, niveles de stock crítico y el desempeño general de tu tienda. Todo desde un solo panel, en tiempo real.",
    details: ["Reportes", "Caducidades", "Stock crítico", "Rendimiento"],
  },
];

export default function HowItWorks() {
  return (
    <section className="how">
      <div className="how-bg" />
      <div className="how-blob how-blob--1" />

      <div className="how-header">
        <div className="how-badge">
          <span className="how-badge__dot" />
          Fácil de usar
        </div>
        <h2>Empieza en minutos,<br />no en <span>semanas</span></h2>
        <p>Cuatro pasos simples para tener tu tienda completamente organizada y operando desde el primer día.</p>
      </div>

      <div className="how-steps">
        {steps.map((step, i) => (
          <div key={i} className="how-step">
            <div className="step-left">
              <div className="step-num">{step.num}</div>
              {i < steps.length - 1 && <div className="step-line" />}
            </div>
            <div className="step-body">
              <div className="step-inner">
                <span className="step-tag">{step.tag}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
                <div className="step-details">
                  {step.details.map((d, j) => (
                    <span key={j} className="step-detail">{d}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}