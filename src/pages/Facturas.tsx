// src/pages/Facturas.tsx
import React from "react";
import { Typography, Box } from "@mui/material";

export default function Facturas() {
  return (
    <Box>
      <Typography variant="h4" color="primary" gutterBottom>
        📄 Módulo de Facturas
      </Typography>
      <Typography>
        Aquí podrás consultar, emitir y cancelar CFDIs conectados al SAT.
      </Typography>
    </Box>
  );
}
