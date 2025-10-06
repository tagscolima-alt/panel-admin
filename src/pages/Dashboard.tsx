// src/pages/Dashboard.tsx
import React from "react";
import { useAuth } from "../hooks/useAuth";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import Grid from "@mui/material/Grid"; // ✅ Importa el nuevo Grid v2

export default function Dashboard() {
  const { user, logoutUser } = useAuth();

  return (
    <Box
      sx={{
        bgcolor: "#f5f6fa",
        minHeight: "100vh",
        py: 8,
        px: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 800,
          boxShadow: 3,
          borderRadius: 3,
          p: 3,
          background: "white",
        }}
      >
        <CardContent>
          <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
            Panel Administrativo ERP-SAT
          </Typography>

          <Typography variant="body1" gutterBottom>
            Bienvenido <strong>{user?.email}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Rol asignado: <strong>{user?.rol}</strong>
          </Typography>

          <Grid container spacing={2} mt={3}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Button fullWidth variant="contained" color="primary">
                📄 Ver facturas
              </Button>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Button fullWidth variant="outlined" color="secondary">
                ⚙️ Configuración
              </Button>
            </Grid>
            <Grid size={12}>
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
