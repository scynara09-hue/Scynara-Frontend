import { useState } from "react";

const COLORS = [
  { bg: "rgba(139,92,246,0.15)", color: "#a78bfa" },
  { bg: "rgba(52,211,153,0.15)", color: "#34d399" },
  { bg: "rgba(96,165,250,0.15)", color: "#60a5fa" },
  { bg: "rgba(251,191,36,0.15)", color: "#fbbf24" },
  { bg: "rgba(244,114,182,0.15)", color: "#f472b6" },
  { bg: "rgba(45,212,191,0.15)", color: "#2dd4bf" },
];

const STATUS_MAP = {
  ACTIVO: { cls: "estado-activo", txt: "● Activo" },
  INACTIVO: { cls: "estado-inactivo", txt: "○ Inactivo" },
};


const IconEdit = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="13" height="13"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>;
const IconClock = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="13" height="13"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>;
const IconTrash = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="13" height="13"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /></svg>;
const IconCheck = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="13" height="13"><polyline points="20 6 9 17 4 12" /></svg>;
const IconX = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="13" height="13"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>;

export default function EmployeeRow({
  employee, index, currentUserId, isAdmin,
  onEdit, onToggle, onDelete, readOnly = false,
}) {
  
  const [showConfirm, setShowConfirm] = useState(false);

  const col = COLORS[index % COLORS.length];

  const initialNombre = employee?.nombre?.charAt(0) || "";
  const initialApellido = employee?.apellidos?.charAt(0) || "";
  const initials = (initialNombre + initialApellido).toUpperCase() || "?";

  const isMe = employee.id_usuario === currentUserId;

  const estadoActual = employee?.estado?.toUpperCase() || "BAJA";
  const badge = STATUS_MAP[estadoActual] || STATUS_MAP.BAJA;

  const canEdit = !readOnly && (isAdmin || isMe);
  const canToggle = !readOnly && isAdmin && !isMe;
  const canDelete = !readOnly && isAdmin && !isMe;

  const horaEntrada = employee?.horario_entrada?.slice(0, 5) || "--:--";
  const horaSalida = employee?.horario_salida?.slice(0, 5) || "--:--";

  return (
    <tr className={isMe ? "highlight" : ""}>
      <td><span className="emp-num">{employee?.numero || "S/N"}</span></td>
      <td>
        <div className="emp-person">
          <div className="emp-av" style={{ background: col.bg, color: col.color }}>
            {initials}
          </div>
          <div>
            <div className="emp-pname">
              {employee?.nombre} {employee?.apellidos}
              {isMe && <span className="you-badge">Tú</span>}
            </div>
            <div className="emp-pemail">{employee?.correo || employee?.email}</div>
          </div>
        </div>
      </td>
      <td>
        <span className={`jornada-chip jornada-${employee?.tipo_jornada}`}>
          {employee?.tipo_jornada || "N/A"}
        </span>
      </td>
      <td>
        <span className="emp-horario">
          {horaEntrada} – {horaSalida}
        </span>
      </td>
      <td>
        <span className={`estado-chip ${badge.cls}`}>{badge.txt}</span>
      </td>
      <td>
        <div className="row-actions">
          {!showConfirm ? (
            <>
              <button
                className={`row-btn btn-edit ${!canEdit ? "disabled-btn" : ""}`}
                onClick={() => canEdit && onEdit(employee.id_usuario)}
                title="Editar"
              >
                <IconEdit />
              </button>
              <button
                className={`row-btn btn-toggle ${!canToggle ? "disabled-btn" : ""}`}
                onClick={() => canToggle && onToggle(employee.id_usuario)}
                title="Cambiar estado"
              >
                <IconClock />
              </button>
              <button
                className={`row-btn btn-del ${!canDelete ? "disabled-btn" : ""}`}
                onClick={() => canDelete && setShowConfirm(true)}
                title="Eliminar"
              >
                <IconTrash />
              </button>
            </>
          ) : (
            
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "4px", 
              background: "rgba(248,113,113,0.1)", 
              padding: "2px 4px", 
              borderRadius: "6px" 
            }}>
              <button 
                className="row-btn btn-del" 
                title="Confirmar eliminación"
                onClick={() => {
                  onDelete(employee.id_usuario);
                  setShowConfirm(false); 
                }}
              >
                <IconCheck />
              </button>
              <button 
                className="row-btn" 
                title="Cancelar"
                style={{ background: "transparent", color: "var(--color-text-secondary)" }}
                onClick={() => setShowConfirm(false)}
              >
                <IconX />
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}
