
// src/services/authService.ts
import api from "./api";

/**
 * 🔹 Tipado de respuesta del backend
 */
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
 * Hace POST a /auth/login y guarda el token en localStorage.
 */
export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>("/auth/login", { email, password });
    const data = response.data;

    // ✅ Guarda el token en localStorage si viene en la respuesta
    if (data?.token) {
      localStorage.setItem("token", data.token);
    }

    return data;
  } catch (error: any) {
    console.error("❌ Error en login:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.mensaje || "Error al iniciar sesión. Verifica tus credenciales."
    );
  }
};

/**
 * 👤 Obtener perfil actual del usuario logueado
 * (Requiere token en headers)
 */
export const getPerfil = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get("/auth/perfil", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    console.error("❌ Error al obtener perfil:", error.response?.data || error.message);
    throw new Error("No se pudo obtener el perfil del usuario.");
  }
};

/**
 * 🚪 Cerrar sesión
 * Elimina token y redirige a /login
 */
export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};
