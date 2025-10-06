import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Facturas from "../pages/Facturas";
import Configuracion from "../pages/Configuracion";
import Usuarios from "../pages/Usuarios";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();
  if (loading) return <p>⏳ Verificando sesión...</p>;
  return user ? children : <Navigate to="/login" />;
}

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/facturas"
          element={
            <PrivateRoute>
              <Facturas />
            </PrivateRoute>
          }
        />
        <Route
          path="/configuracion"
          element={
            <PrivateRoute>
              <Configuracion />
            </PrivateRoute>
          }
        />
        <Route
          path="/usuarios"
          element={
            <PrivateRoute>
              <Usuarios />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
