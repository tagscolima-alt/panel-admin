import React from "react";
import { useAuth } from "../hooks/useAuth";

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div style={{ padding: 20 }}>
      <h1>📊 Panel Principal</h1>
      <p>Bienvenido, <b>{user?.email}</b></p>
      <p>Tu rol actual es: <b>{user?.rol}</b></p>
    </div>
  );
};

export default Dashboard;
