// src/pages/Login.tsx
import React from "react";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const { loginUser } = useAuth();

  const handleLogin = () => {
    const usuario = { email: "juan@test.com", rol: "admin" };
    loginUser(usuario);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "#f5f6fa",
      }}
    >
      <h1>🔐 Iniciar sesión ERP-SAT</h1>
      <p>Haz clic para entrar con un usuario de prueba.</p>
      <button
        style={{
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          background: "#1976d2",
          color: "white",
          cursor: "pointer",
        }}
        onClick={handleLogin}
      >
        Iniciar sesión
      </button>
    </div>
  );
}
