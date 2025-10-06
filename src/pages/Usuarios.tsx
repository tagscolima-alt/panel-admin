// src/pages/Usuarios.tsx
import React from "react";
import { Typography, Box } from "@mui/material";

export default function Usuarios() {
  return (
    <Box>
      <Typography variant="h4" color="text.primary" gutterBottom>
        👥 Gestión de usuarios
      </Typography>
      <Typography>
        Administra los usuarios con acceso al sistema ERP-SAT.
      </Typography>
    </Box>
  );
}
