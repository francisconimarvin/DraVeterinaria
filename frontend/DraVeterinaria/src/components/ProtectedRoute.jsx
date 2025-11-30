import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) {
    console.warn("ProtectedRoute: No hay token, redirigiendo a /login");
    return <Navigate to="/login" replace />;
  }

  if (role && userRole !== role) {
    console.warn(`ProtectedRoute: Rol incorrecto: ${userRole} != ${role}`);
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
