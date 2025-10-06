// src/App.tsx
import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";
import { login } from "./services/authService";

function PruebaLogin() {
  const { user, loading, loginUser, logoutUser } = useAuth();

  const handleLogin = async () => {
    try {
      const data = await login("juan@test.com", "123456");
      loginUser(data.usuario);
      alert("✅ Login exitoso: " + data.usuario.email);
    } catch (err) {
      alert("❌ Error de login");
    }
  };

  if (loading) return <p>⏳ Verificando sesión...</p>;

  return (
    <div style={{ padding: "30px" }}>
      <h1>🧪 Prueba de autenticación</h1>
      {user ? (
        <>
          <p>Usuario autenticado: {user.email}</p>
          <p>Rol: {user.rol}</p>
          <button onClick={logoutUser}>Cerrar sesión</button>
        </>
      ) : (
        <>
          <p>No hay sesión activa</p>
          <button onClick={handleLogin}>Iniciar sesión de prueba</button>
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <PruebaLogin />
    </AuthProvider>
  );
}
