// src/pages/LoginPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

export default function LoginPage() {
  const { loginUser, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await loginUser(email, password);
    if (success) navigate("/dashboard");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Box textAlign="center" mb={3}>
        <Typography variant="h4" gutterBottom>
          ERP-SAT | Iniciar Sesión
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Correo electrónico"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          type="password"
          label="Contraseña"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? "Validando..." : "Ingresar"}
        </Button>
      </form>
    </Container>
  );
}
