import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from ".././Hooks/UseAuth";

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation();

  if (!token) {
    // Guarda la ruta original para volver luego si quieres
    localStorage.setItem("redirectAfterLogin", location.pathname);

    // Redirige al login y pasa un estado para mostrar mensaje
    return <Navigate to="/login" state={{ from: location, reason: "unauthorized" }} replace />;
  }

  return children;
};

export default ProtectedRoute;
