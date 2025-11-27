import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Swal from "sweetalert2";

const RequireAuth = ({ children, roles }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    Swal.fire("Sesión no válida", "Debes iniciar sesión", "warning");
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (roles && roles.length > 0) {
    const userRole = user?.rol ?? user?.role;
    if (!roles.includes(userRole)) {
      Swal.fire("Acceso denegado", "No tienes permisos", "error");
      return <Navigate to="/forbidden" replace />;
    }
  }

  return children;
};

export default RequireAuth;
