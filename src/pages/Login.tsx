// src/pages/Login.tsx
import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService"; // 👈 tu servicio real

export default function Login() {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 📡 Llamada real a tu backend NestJS
      const data = await login(email, password);

      // 👤 Guarda el usuario en el contexto global
      loginUser(data.usuario);

      // 🚀 Redirige al dashboard
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Error al iniciar sesión:", err);
      setError("❌ Credenciales inválidas o error del servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f5f6fa",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          backgroundColor: "white",
          padding: "40px 50px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          textAlign: "center",
          width: "320px",
        }}
      >
        <h2 style={{ color: "#1976d2", marginBottom: "20px" }}>
          🔐 ERP-SAT Login
        </h2>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            marginBottom: "15px",
            width: "100%",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            marginBottom: "20px",
            width: "100%",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        />

        {error && (
          <p style={{ color: "red", marginBottom: "10px", fontSize: "14px" }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: loading ? "#aaa" : "#1976d2",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "16px",
            width: "100%",
          }}
        >
          {loading ? "Iniciando..." : "Iniciar sesión"}
        </button>
      </form>
    </div>
  );
}
