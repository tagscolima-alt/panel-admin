import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface Props {
  roles?: string[];
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ roles, children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;

  if (!user) return <Navigate to="/" />;

  if (roles && !roles.includes(user.rol)) {
    return <p>🚫 No tienes permiso para acceder a esta sección</p>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
