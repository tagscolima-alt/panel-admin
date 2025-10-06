// ✅ src/context/AuthContext.tsx
import React, { createContext, useState, useEffect } from "react";
import { getPerfil, login as apiLogin, logout as apiLogout } from "../services/authService";

interface AuthContextType {
  user: any;
  loading: boolean;
  loginUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false); // 🚫 evita múltiples llamadas

  useEffect(() => {
    if (initialized) return; // 👈 evita repetición
    setInitialized(true);

    const fetchPerfil = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const perfil = await getPerfil();
        setUser(perfil);
      } catch {
        // Si el token no es válido, lo eliminamos
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPerfil();
  }, [initialized]);

  const loginUser = async (email: string, password: string) => {
    const data = await apiLogin(email, password);
    localStorage.setItem("token", data.token);
    setUser(data.usuario);
  };

  const logoutUser = () => {
    apiLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, logoutUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
