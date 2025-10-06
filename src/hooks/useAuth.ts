// src/hooks/useAuth.ts
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/**
 * 🔁 Hook para acceder fácilmente al contexto de autenticación
 * Permite usar: const { user, loading, loginUser, logoutUser } = useAuth();
 */
export function useAuth() {
  return useContext(AuthContext);
}
