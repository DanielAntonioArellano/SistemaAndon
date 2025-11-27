import axios from "axios";
import Swal from "sweetalert2";

const API = axios.create({
  baseURL: "http://localhost:5086/api", // 🔧 ajusta a tu backend
  headers: { "Content-Type": "application/json" },
});

// Interceptor: agrega token a cada petición
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Interceptor de respuestas
API.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      Swal.fire({
        icon: "warning",
        title: "Sesión expirada",
        text: "Por favor, inicia sesión de nuevo.",
      }).then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/";
      });
    } else if (status === 403) {
      Swal.fire({
        icon: "error",
        title: "Acceso denegado",
        text: "No tienes permisos para realizar esta acción.",
      });
    }

    return Promise.reject(error);
  }
);

export default API;
