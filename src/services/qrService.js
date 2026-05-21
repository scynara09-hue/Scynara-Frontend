import api from "./api";

export const enviarQR = async (qr) => {
  try {
    const response = await api.post("/api/qr", { qr });
    return response.data;
  } catch (error) {
    console.error("Error enviando QR:", error);
    throw error;
  }
};