// src/pages/Configuracion.tsx
import React from "react";
import { Typography, Box } from "@mui/material";

export default function Configuracion() {
  return (
    <Box>
      <Typography variant="h4" color="secondary" gutterBottom>
        ⚙️ Configuración del sistema
      </Typography>
      <Typography>
        Ajustes generales, datos de empresa, certificados y preferencias.
      </Typography>
    </Box>
  );
}
