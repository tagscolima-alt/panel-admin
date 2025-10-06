// src/App.tsx
import { AuthProvider } from "./context/AuthContext";
import AppRouter from "./router/AppRouter"; // ✅ Importa desde tu carpeta "router"

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}
