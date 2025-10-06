import api from "./api";

export const getFacturas = async () => {
  const response = await api.get("/sat/cfdi/listar");
  return response.data;
};

export const emitirFactura = async (facturaData: any) => {
  const response = await api.post("/sat/cfdi/emitir", facturaData);
  return response.data;
};

export const cancelarFactura = async (uuid: string) => {
  const response = await api.post("/sat/cfdi/cancelar", { uuid });
  return response.data;
};
