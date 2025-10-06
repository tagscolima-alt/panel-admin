import React from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { Typography, Box } from "@mui/material";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <Box>
        <Typography variant="h4" gutterBottom>Bienvenido al ERP-SAT</Typography>
        <Typography>Selecciona un módulo desde el menú lateral.</Typography>
      </Box>
    </DashboardLayout>
  );
}
