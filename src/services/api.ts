// src/services/api.ts
import axios from "axios";

/**
 * 🌐 Configuración base de Axios
 * Esta instancia se usará en todos los servicios (auth, users, logs, etc.)
 */
const api = axios.create({
  baseURL: "http://localhost:3000/api", // ✅ Ajusta si el backend cambia de puerto
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔑 Interceptor para incluir token JWT automáticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ⚠️ Interceptor para manejar errores globales (401, 500, etc.)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("⚠️ Sesión expirada o token inválido");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// 👇 ESTA LÍNEA ERA LA QUE FALTABA
export default api;
