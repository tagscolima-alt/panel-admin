// src/pages/Dashboard.tsx
import React from "react";
import { useAuth } from "../hooks/useAuth";

export default function Dashboard() {
  const { user, logoutUser, loading } = useAuth();

  if (loading) {
    return <p>⏳ Cargando sesión...</p>;
  }

  if (!user) {
    return <p>⚠️ No hay usuario autenticado.</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>🧭 Panel Administrativo</h1>
      <h3>Bienvenido, {user.nombre ?? user.email}</h3>
      <p>Rol: {user.rol}</p>

      <button
        onClick={logoutUser}
        style={{
          marginTop: "20px",
          background: "#c62828",
          color: "#fff",
          padding: "10px 20px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Cerrar sesión
      </button>
    </div>
  );
}
