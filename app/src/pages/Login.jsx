import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../Api/Api";
import { useAuth } from "../hooks/useAuth";
import Swal from "sweetalert2";
import logo from "../images/sindustryblanco.webp";

const Login = () => {
  const [data, setData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // 🧠 Detecta si el usuario fue redirigido por falta de permisos
  useEffect(() => {
    if (location.state?.reason === "unauthorized") {
      Swal.fire({
        title: "Acceso denegado",
        text: "No tienes permisos para acceder. Inicia sesión primero.",
        icon: "warning",
        confirmButtonText: "Entendido",
      });
    }
  }, [location]);

  // ✅ Actualiza los inputs del formulario
  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  // 🚀 Envía las credenciales y guarda el token si es válido
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/User/login", data);
    
      const token = res.data.token;
      const user ={
        idUser:res.data.idUser,
        username:res.data.userName,
        email:res.data.email,
        rol:res.data.rol
      }
      
      if (!token) {
        throw new Error("No se recibió token del servidor");
      }

      // Guarda token y usuario en el AuthContext
      login(token, user);

      Swal.fire({
        title: "Bienvenido",
        text: "Has iniciado sesión correctamente",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      const redirect = localStorage.getItem("redirectAfterLogin") || "/dashboard";
      localStorage.removeItem("redirectAfterLogin");

      navigate(redirect);
    } catch (err) {
      Swal.fire("Error", "Credenciales inválidas", "error");
      console.error(err);
    }
  };

  return (
    <div style={styles.loginWrapper}>
      <div style={styles.container}>
        <img
          src={logo}
          alt="Sindustry Logo"
          style={styles.logosIndustry}
        />

        <form onSubmit={handleSubmit}>
          <input
            name="username"
            placeholder="Usuario"
            value={data.username}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <hr />
          <input
            name="password"
            placeholder="Contraseña"
            type="password"
            value={data.password}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.buttonForm}>
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

// 🎨 Estilos inline
const styles = {
  loginWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "20px",
    backgroundImage: 'url("./images/maquinas.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    boxSizing: "border-box",
  },
  container: {
    padding: "50px 40px 20px 40px",
    fontFamily: "sans-serif",
    color: "#737373",
    border: "1px solid rgb(219, 219, 219)",
    textAlign: "center",
    background: "white",
    borderRadius: "15px",
    width: "350px",
    boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
  },
  input: {
    width: "100%",
    background: "inherit",
    border: 0,
    outline: "none",
    padding: "9px 8px 7px 8px",
    fontSize: "16px",
  },
  buttonForm: {
    width: "100%",
    height: "40px",
    background: "#69cb16",
    color: "black",
    borderRadius: "3px",
    border: "none",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    marginTop: "30px",
    transition: "background 0.3s",
  },
  logosIndustry: {
    width: "200px",
    height: "200px",
    objectFit: "cover",
    borderRadius: "15%",
    marginBottom: "20px",
  },
};

export default Login;
