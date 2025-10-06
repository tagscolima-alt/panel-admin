import React, { createContext, useState, useEffect } from "react";
import { login as apiLogin, getPerfil, logout as apiLogout } from "../services/authService";

// 🧠 Tipos
interface Usuario {
  id: string;
  email: string;
  rol: string;
  nombre?: string;
}

interface AuthContextType {
  user: Usuario | null;
  loading: boolean;
  loginUser: (email: string, password: string) => Promise<boolean>;
  logoutUser: () => void;
}

// 🟢 Crear el contexto
export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  loginUser: async () => false,
  logoutUser: () => {},
});

// 🟣 Proveedor del contexto
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  // Al montar el componente, cargar perfil si hay token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getPerfil()
        .then((data) => setUser(data.usuario))
        .catch(() => localStorage.removeItem("token"))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // 🔐 Iniciar sesión
  const loginUser = async (email: string, password: string) => {
    try {
      const data = await apiLogin(email, password);
      setUser(data.usuario);
      return true;
    } catch (err) {
      console.error("❌ Error en loginUser:", err);
      return false;
    }
  };

  // 🚪 Cerrar sesión
  const logoutUser = () => {
    apiLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
