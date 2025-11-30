import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // Si no hay token → redirige a login
  if (!token) return <Navigate to="/login" />;

  // Si se pasa un rol y no coincide → redirige a login
  if (role && userRole !== role) return <Navigate to="/login" />;

  // Usuario loggeado permitido
  return children;
};

export default ProtectedRoute;
