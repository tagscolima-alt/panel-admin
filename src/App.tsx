// src/App.tsx
import React from "react";
import { AuthProvider } from "./context/AuthContext";
import AppRouter from "./router/AppRouter";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme/theme"; // 👈 importa el tema

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Normaliza colores y fondo */}
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ThemeProvider>
  );
}
