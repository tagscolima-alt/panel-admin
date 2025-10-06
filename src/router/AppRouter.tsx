// src/router/AppRouter.tsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Facturas from "../pages/Facturas";
import Configuracion from "../pages/Configuracion";
import Usuarios from "../pages/Usuarios";
import DashboardLayout from "../layout/DashboardLayout";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();

  if (loading) return <p>⏳ Verificando sesión...</p>;
  return user ? children : <Navigate to="/login" replace />;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública */}
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas dentro del layout */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/facturas"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Facturas />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/configuracion"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Configuracion />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/usuarios"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Usuarios />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        {/* Si no existe la ruta */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
