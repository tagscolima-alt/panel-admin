// src/pages/Dashboard.tsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getPerfil } from "../services/authService";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
} from "@mui/material";

interface PerfilUsuario {
  id: string;
  email: string;
  rol: string;
  nombre?: string;
}

export default function Dashboard() {
  const { logoutUser } = useAuth();
  const [perfil, setPerfil] = useState<PerfilUsuario | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const data = await getPerfil();
        setPerfil(data);
      } catch (err: any) {
        console.error("❌ Error al obtener perfil:", err);
        setError("No se pudo cargar la información del usuario.");
      } finally {
        setLoading(false);
      }
    };

    cargarPerfil();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "background.default",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          textAlign: "center",
          pt: 10,
          color: "error.main",
          bgcolor: "background.default",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h6">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        minHeight: "100vh",
        py: 8,
        px: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 800 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
            Panel Administrativo ERP-SAT
          </Typography>

          <Typography variant="body1" gutterBottom>
            Bienvenido,{" "}
            <strong>{perfil?.nombre || perfil?.email || "Usuario"}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Rol asignado: <strong>{perfil?.rol}</strong>
          </Typography>

          <Grid container spacing={2} mt={3}>
            <Grid item xs={12} sm={6}>
              <Button fullWidth variant="contained" color="primary">
                📄 Ver facturas
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button fullWidth variant="outlined" color="secondary">
                ⚙️ Configuración
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="text"
                color="error"
                onClick={logoutUser}
                sx={{ mt: 2 }}
              >
                🔒 Cerrar sesión
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
