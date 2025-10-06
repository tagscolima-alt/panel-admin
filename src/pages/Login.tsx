import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Box, Button, TextField, Typography, Card, CardContent } from "@mui/material";

export default function Login() {
  const { loginUser } = useAuth();
  const [email, setEmail] = useState("juan@test.com");
  const [password, setPassword] = useState("123456");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      window.location.href = "/";
    } catch {
      alert("❌ Credenciales inválidas");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <Card sx={{ width: 400 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>Iniciar sesión</Typography>
          <form onSubmit={handleSubmit}>
            <TextField fullWidth margin="normal" label="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField fullWidth margin="normal" label="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Entrar</Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
