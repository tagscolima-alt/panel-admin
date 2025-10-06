// src/pages/Dashboard.tsx
import React, { useEffect, useState } from "react";
import { getPerfil } from "../services/authService";
import DashboardLayout from "../layout/DashboardLayout";
import { Typography, CircularProgress, Box, Paper } from "@mui/material";

export default function Dashboard() {
  const [perfil, setPerfil] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const data = await getPerfil();
        setPerfil(data);
      } catch (error) {
        console.error("❌ Error al cargar el perfil:", error);
      } finally {
        setLoading(false);
      }
    };
    cargarPerfil();
  }, []);

  return (
    <DashboardLayout>
      <Box sx={{ p: 3 }}>
        {loading ? (
          <Box sx={{ textAlign: "center", mt: 10 }}>
            <CircularProgress />
            <Typography variant="body1" mt={2}>
              Cargando datos del usuario...
            </Typography>
          </Box>
        ) : (
          <Paper sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h4" color="primary" gutterBottom>
              Bienvenido al ERP-SAT
            </Typography>
            <Typography variant="h6">
              Usuario: <strong>{perfil?.email}</strong>
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Rol: {perfil?.rol}
            </Typography>
          </Paper>
        )}
      </Box>
    </DashboardLayout>
  );
}
