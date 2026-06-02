export const normalizeRole = (role) => String(role || "").trim().toUpperCase();

export const isGuestRole = (role) => normalizeRole(role) === "INVITADO";

export const canWrite = (role) => !isGuestRole(role);

export const isAdminRole = (role) => normalizeRole(role) === "ADMINISTRADOR";

