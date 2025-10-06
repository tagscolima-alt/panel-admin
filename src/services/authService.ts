// src/services/authService.ts
import api from "./api";

export interface LoginResponse {
  mensaje: string;
  token: string;
  usuario: {
    id: string;
    email: string;
    rol: string;
    nombre?: string;
  };
}

/**
 * 🔐 Iniciar sesión
 */
export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await api.post("/auth/login", { email, password });
  const data = response.data;

  // Guardar token en localStorage
  if (data.token) {
    localStorage.setItem("token", data.token);
  }

  return data;
};

/**
 * 👤 Obtener perfil actual
 */
export const getPerfil = async () => {
  const response = await api.get("/auth/perfil");
  return response.data;
};

/**
 * 🚪 Cerrar sesión
 */
export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};
