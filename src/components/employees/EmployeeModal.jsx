import { useState, useEffect } from "react";

/* ─── Iconos ─────────────────────────────────────────── */
const IconClose = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="13" height="13">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const IconUser = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" width="14" height="14">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" width="14" height="14">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" width="14" height="14">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const IconLock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" width="14" height="14">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const IconCal = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" width="14" height="14">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" width="14" height="14">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" width="14" height="14">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const IconKey = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" width="14" height="14">
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
  </svg>
);

const IconUserAdd = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" width="18" height="18">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
    <line x1="19" y1="8" x2="19" y2="14" />
    <line x1="22" y1="11" x2="16" y2="11" />
  </svg>
);

const IconSave = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="14" height="14">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconEye = ({ open }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" width="14" height="14">
    {open ? (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    ) : (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    )}
  </svg>
);

/* ─── Subcomponentes ─────────────────────────────────── */
function SectionLabel({ children }) {
  return <div className="em-section">{children}</div>;
}

function Field({ label, hint, error, children }) {
  return (
    <div className="em-field">
      <label>
        {label}
        {hint && <span className="em-hint">{hint}</span>}
      </label>
      {children}
      {error && <span className="em-error-text">{error}</span>}
    </div>
  );
}

function InputWrap({ icon, children }) {
  return (
    <div className="em-input-wrap">
      <span className="em-input-icon">{icon}</span>
      {children}
    </div>
  );
}

/* ─── Estado inicial ─────────────────────────────────── */
const EMPTY = {
  nombre: "",
  apellidos: "",
  correo: "",
  telefono: "",
  password: "",
  estado: "ACTIVO",
  rol: "EMPLEADO",
  tipo_jornada: "Completa",
  horario_entrada: "08:00",
  horario_salida: "16:00",
  nivel_acceso: "BASICO",
  permisos: "ACCESO_GENERAL",
};

/* ─── Componente principal ───────────────────────────── */
export default function EmployeeModal({
  open,
  employee,
  isAdmin,
  isOwnProfile,
  onClose,
  onSave,
}) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [showPwd, setShowPwd] = useState(false);

  const isEditing = !!employee;

  useEffect(() => {
    if (!open) return;

    setErrors({});
    setShowPwd(false);

    if (employee) {
      const nombreCompleto = employee.nombre || "";
      const partes = nombreCompleto.trim().split(" ");

      let nombre = "";
      let apellidos = "";

      if (partes.length > 1) {
        apellidos = partes.pop();
        nombre = partes.join(" ");
      } else {
        nombre = partes[0] || "";
      }

      setForm({
        id_usuario: employee.id_usuario,
        nombre,
        apellidos,
        correo: employee.correo || employee.email || "",
        telefono: employee.telefono || "",
        password: "",
        estado: employee.estado?.toUpperCase() || "ACTIVO",
        rol: employee.rol?.toUpperCase() || "EMPLEADO",
        tipo_jornada: employee.tipo_jornada || "Completa",
        horario_entrada: employee.horario_entrada?.slice(0, 5) || "08:00",
        horario_salida: employee.horario_salida?.slice(0, 5) || "16:00",
        nivel_acceso: employee.nivel_acceso || "BASICO",
        permisos: employee.permisos || "ACCESO_GENERAL",
      });
    } else {
      setForm(EMPTY);
    }
  }, [open, employee]);

  if (!open) return null;

  const isEmpleado = form.rol === "EMPLEADO";
  const canEditLaboral = isAdmin;

  /* ─── Set helper ───────────────────────────────────── */
  const set = (field) => (e) => {
    const value = e.target.value;

    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
      general: "",
    }));
  };

  /* ─── Validaciones ─────────────────────────────────── */
  const validateForm = () => {
    const newErrors = {};

    if (!form.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
    }

    if (!form.apellidos.trim()) {
      newErrors.apellidos = "Los apellidos son obligatorios";
    }

    if (!form.correo.trim()) {
      newErrors.correo = "El correo es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) {
      newErrors.correo = "Ingresa un correo válido";
    }

    if (!form.telefono.trim()) {
      newErrors.telefono = "El teléfono es obligatorio";
    } else if (
      form.telefono &&
      !/^\d{10}$/.test(form.telefono.replace(/\s/g, ""))
    ) {
      newErrors.telefono = "El teléfono debe tener 10 dígitos";
    }

    if (!isEditing) {
      if (!form.password.trim()) {
        newErrors.password = "La contraseña es obligatoria";
      } else if (form.password.length < 8) {
        newErrors.password = "La contraseña debe tener mínimo 8 caracteres";
      }
    } else if (form.password && form.password.length < 8) {
      newErrors.password = "La contraseña debe tener mínimo 8 caracteres";
    }

    if (isEmpleado && form.horario_entrada >= form.horario_salida) {
      newErrors.horario_salida = "La hora de salida debe ser mayor";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

const handleSave = async (e) => {
    // PREVENCIÓN DE EVENTOS FANTASMAS
    if (e) {
      e.preventDefault(); 
      e.stopPropagation();
    }


    if (!validateForm()) {
      return;
    }

    const data = {
      ...form,
      nombre: form.nombre.trim(),
      apellidos: form.apellidos.trim(),
      email: form.correo, 
    };

    if (form.rol === "EMPLEADO") {
      delete data.nivel_acceso;
      delete data.permisos;
    } else {
      delete data.tipo_jornada;
      delete data.horario_entrada;
      delete data.horario_salida;
    }

    if (isEditing && (!data.password || data.password.trim() === "")) {
      delete data.password;
    }

    try {
      await onSave(data);
      
      // SOLO AQUÍ SE DEBE CERRAR
      onClose();

    } catch (error) {
      
      const apiErrors = error.response?.data?.errors;
      if (apiErrors) {
        const mappedErrors = {};
        for (const key in apiErrors) {
          const frontendField = key === "email" ? "correo" : key;
          mappedErrors[frontendField] = Array.isArray(apiErrors[key]) 
            ? apiErrors[key][0] 
            : apiErrors[key];
        }
        setErrors(mappedErrors); 
      } else {
        setErrors({ general: "Ocurrió un error inesperado al guardar." });
      }
    }
  };

  return (
   <div 
      className="modal-overlay" 
      onClick={(e) => {
        if (e.target === e.currentTarget && Object.keys(errors).length === 0) {
          onClose();
        }
      }}
    >
      <div className="modal">
        {/* HEADER */}
        <div className="em-header">
          <div className="em-header-icon">
            <IconUserAdd />
          </div>

          <div className="em-header-text">
            <h2>
              {!isEditing
                ? "Agregar empleado"
                : isOwnProfile
                  ? "Editar mi perfil"
                  : "Editar empleado"}
            </h2>

            <p>
              {!isEditing
                ? "Completa los datos para crear una nueva cuenta"
                : "Modifica la información del empleado"}
            </p>
          </div>

          <button className="modal-close" onClick={onClose}>
            <IconClose />
          </button>
        </div>

        {/* BODY */}
        <div className="em-body">
          <SectionLabel>Datos personales</SectionLabel>

          <div className="em-grid">
            <Field label="Nombre(s)" error={errors.nombre}>
              <InputWrap icon={<IconUser />}>
                <input
                  className={`em-input ${errors.nombre ? "em-input-error" : ""}`}
                  type="text"
                  placeholder="Ej: Juan"
                  value={form.nombre}
                  onChange={set("nombre")}
                />
              </InputWrap>
            </Field>

            <Field label="Apellidos" error={errors.apellidos}>
              <InputWrap icon={<IconUser />}>
                <input
                  className={`em-input ${errors.apellidos ? "em-input-error" : ""}`}
                  type="text"
                  placeholder="Ej: Pérez López"
                  value={form.apellidos}
                  onChange={set("apellidos")}
                />
              </InputWrap>
            </Field>
          </div>

          <div className="em-grid">
            <Field label="Correo electrónico" error={errors.correo}>
              <InputWrap icon={<IconMail />}>
                <input
                  className={`em-input ${errors.correo ? "em-input-error" : ""}`}
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={form.correo}
                  onChange={set("correo")}
                />
              </InputWrap>
            </Field>

            <Field label="Teléfono" error={errors.telefono}>
              <InputWrap icon={<IconPhone />}>
                <input
                  className={`em-input ${errors.telefono ? "em-input-error" : ""}`}
                  type="tel"
                  placeholder="5512345678"
                  value={form.telefono}
                  onChange={set("telefono")}
                />
              </InputWrap>
            </Field>
          </div>

          <Field
            label="Contraseña"
            error={errors.password}
            hint={isEditing ? "(dejar en blanco para mantener la actual)" : undefined}
          >
            <div className="em-input-wrap">
              <span className="em-input-icon">
                <IconLock />
              </span>

              <input
                className={`em-input ${errors.password ? "em-input-error" : ""}`}
                type={showPwd ? "text" : "password"}
                placeholder={isEditing ? "••••••••" : "Mínimo 8 caracteres"}
                value={form.password}
                onChange={set("password")}
              />

              <button
                type="button"
                className="em-eye-btn"
                onClick={() => setShowPwd((p) => !p)}
              >
                <IconEye open={showPwd} />
              </button>
            </div>
          </Field>

          <div className="em-divider" />

          {/* ROL */}
          {canEditLaboral && (
            <>
              <SectionLabel>Rol en el sistema</SectionLabel>

              <div className="em-rol-chips">
                {[
                  {
                    id: "EMPLEADO",
                    label: "Empleado",
                    sub: "Registro de ventas y consulta",
                    cls: "emp",
                  },
                  {
                    id: "ADMINISTRADOR",
                    label: "Administrador",
                    sub: "Acceso y gestión completa",
                    cls: "adm",
                  },
                ].map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    className={`em-rol-chip ${form.rol === r.id ? `active-${r.cls}` : ""}`}
                    onClick={() => setForm((prev) => ({ ...prev, rol: r.id }))}
                  >
                    <div className="em-rol-top">
                      <span className={`em-rol-dot dot-${r.cls}`} />
                      <span className="em-rol-name">{r.label}</span>
                    </div>
                    <div className="em-rol-sub">{r.sub}</div>
                  </button>
                ))}
              </div>

              <div className="em-divider" />
            </>
          )}

          {/* EMPLEADO */}
          {(isEmpleado || !canEditLaboral) && (
            <>
              <SectionLabel>Datos laborales</SectionLabel>

              <div className="em-grid">
                <Field label="Tipo de jornada">
                  <InputWrap icon={<IconCal />}>
                    <select
                      className="em-input em-select"
                      value={form.tipo_jornada}
                      onChange={set("tipo_jornada")}
                    >
                      <option value="Completa">Jornada Completa</option>
                      <option value="Medio">Media Jornada</option>
                    </select>
                  </InputWrap>
                </Field>

                <Field label="Estado de la cuenta">
                  <div className="em-estado">
                    {[
                      { val: "ACTIVO", text: "Activo", cls: "active-activo" },
                      { val: "INACTIVO", text: "Inactivo", cls: "active-inactivo" },
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        type="button"
                        className={`em-estado-opt ${form.estado === opt.val ? opt.cls : ""}`}
                        onClick={() => setForm((prev) => ({ ...prev, estado: opt.val }))}
                      >
                        {form.estado === opt.val ? "●" : "○"} {opt.text}
                      </button>
                    ))}
                  </div>
                </Field>
              </div>

              <Field
                label="Horario"
                hint="(entrada — salida)"
                error={errors.horario_salida}
              >
                <div className="em-time-wrap">
                  <InputWrap icon={<IconClock />}>
                    <input
                      className="em-input"
                      type="time"
                      value={form.horario_entrada}
                      onChange={set("horario_entrada")}
                    />
                  </InputWrap>

                  <span className="em-time-sep">—</span>

                  <InputWrap icon={<IconClock />}>
                    <input
                      className={`em-input ${errors.horario_salida ? "em-input-error" : ""}`}
                      type="time"
                      value={form.horario_salida}
                      onChange={set("horario_salida")}
                    />
                  </InputWrap>
                </div>
              </Field>
            </>
          )}

          {/* ADMIN */}
          {!isEmpleado && canEditLaboral && (
            <>
              <SectionLabel>Datos de administrador</SectionLabel>

              <div className="em-grid">
                <Field label="Nivel de acceso">
                  <InputWrap icon={<IconShield />}>
                    <select
                      className="em-input em-select"
                      value={form.nivel_acceso}
                      onChange={set("nivel_acceso")}
                    >
                      <option value="BASICO">Básico</option>
                      <option value="AVANZADO">Avanzado</option>
                      <option value="TOTAL">Total</option>
                    </select>
                  </InputWrap>
                </Field>

                <Field label="Estado de la cuenta">
                  <div className="em-estado">
                    {[
                      { val: "ACTIVO", text: "Activo", cls: "active-activo" },
                      { val: "INACTIVO", text: "Inactivo", cls: "active-inactivo" },
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        type="button"
                        className={`em-estado-opt ${form.estado === opt.val ? opt.cls : ""}`}
                        onClick={() => setForm((prev) => ({ ...prev, estado: opt.val }))}
                      >
                        {form.estado === opt.val ? "●" : "○"} {opt.text}
                      </button>
                    ))}
                  </div>
                </Field>
              </div>

              <Field label="Permisos">
                <InputWrap icon={<IconKey />}>
                  <input
                    className="em-input"
                    type="text"
                    placeholder="Ej: ACCESO_GENERAL"
                    value={form.permisos}
                    onChange={set("permisos")}
                  />
                </InputWrap>
              </Field>
            </>
          )}
        </div>

        {/* Error general */}
        {errors.general && (
          <div className="em-general-error">{errors.general}</div>
        )}

        {/* FOOTER */}
        <div className="em-footer">
  <button type="button" className="em-btn-cancel" onClick={(e) => {
    e.stopPropagation();
    onClose();
  }}>
    Cancelar
  </button>

  <button type="button" className="em-btn-save" onClick={handleSave}>
    <IconSave />
    {isEditing ? "Guardar cambios" : "Crear usuario"}
  </button>
</div>
      </div>
    </div>
  );
}