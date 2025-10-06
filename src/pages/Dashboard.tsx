// src/pages/Dashboard.tsx
import React, { useEffect, useState } from "react";
import { getPerfil } from "../services/authService";
import DashboardLayout from "../layout/DashboardLayout";
import { Typography, CircularProgress, Box } from "@mui/material";

export default function Dashboard() {
  const [perfil, setPerfil] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const data = await getPerfil();
        setPerfil(data);
      } catch (error) {
        console.error("Error al cargar perfil:", error);
      } finally {
        setLoading(false);
      }
    };
    cargarPerfil();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!perfil) {
    return (
      <Box textAlign="center" mt={10}>
        <Typography variant="h6" color="error">
          ❌ No se pudo obtener el perfil del usuario.
        </Typography>
      </Box>
    );
  }

  return (
    <DashboardLayout>
      <Box textAlign="center" mt={10}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Panel Administrativo ERP-SAT
        </Typography>
        <Typography variant="h6">
          Bienvenido <strong>{perfil.email}</strong>
        </Typography>
        <Typography color="text.secondary">
          Rol asignado: <strong>{perfil.rol}</strong>
        </Typography>
      </Box>
    </DashboardLayout>
  );
}
