import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar: React.FC = () => {
  const { user, logoutUser } = useAuth();

  return (
    <nav style={{ background: "#282c34", color: "white", padding: "10px" }}>
      <Link to="/dashboard" style={{ marginRight: 15, color: "white" }}>Dashboard</Link>
      {user?.rol === "admin" && (
        <>
          <Link to="/usuarios" style={{ marginRight: 15, color: "white" }}>Usuarios</Link>
          <Link to="/logs" style={{ marginRight: 15, color: "white" }}>Logs</Link>
        </>
      )}
      <span style={{ float: "right" }}>
        {user?.email} | <button onClick={logoutUser}>Cerrar sesión</button>
      </span>
    </nav>
  );
};

export default Navbar;
