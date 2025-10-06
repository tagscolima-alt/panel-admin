// src/theme/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light", // puedes cambiar a "dark" si prefieres
    primary: {
      main: "#0052cc", // Azul SAT
    },
    secondary: {
      main: "#00b8d9", // Azul celeste corporativo
    },
    background: {
      default: "#f4f6f8", // Fondo general claro
      paper: "#ffffff",   // Fondo de tarjetas
    },
    text: {
      primary: "#172b4d",
      secondary: "#6b778c",
    },
    error: {
      main: "#d32f2f",
    },
    success: {
      main: "#2e7d32",
    },
    warning: {
      main: "#ed6c02",
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: { fontWeight: 700, fontSize: "2rem" },
    h2: { fontWeight: 600, fontSize: "1.75rem" },
    h3: { fontWeight: 600, fontSize: "1.5rem" },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: "10px 18px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        },
      },
    },
  },
});

export default theme;
