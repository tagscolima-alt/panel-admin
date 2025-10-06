// src/pages/Dashboard.tsx
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
        console.error("Error al cargar perfil", error);
      } finally {
        setLoading(false);
      }
    };
    cargarPerfil();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <DashboardLayout>
      <Typography variant="h4" gutterBottom color="primary">
        Bienvenido al ERP-SAT
      </Typography>
      <Typography variant="body1">
        Usuario: <strong>{perfil?.email}</strong>
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Rol asignado: {perfil?.rol}
      </Typography>
    </DashboardLayout>
  );
}
