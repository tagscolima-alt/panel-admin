import api from "./api";

export interface LoginResponse {
  mensaje: string;
  token: string;
  usuario: { id: string; email: string; rol: string; nombre?: string };
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", { email, password });
  const data = response.data;
  if (data?.token) localStorage.setItem("token", data.token);
  return data;
};

export const getPerfil = async () => {
  const token = localStorage.getItem("token");
  const response = await api.get("/auth/perfil", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.usuario;
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};
