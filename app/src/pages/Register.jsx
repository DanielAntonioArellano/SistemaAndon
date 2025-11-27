import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Sidebar from '../Components/Shared/Sidebar';

const RegisterPage = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    rol: ""
  });

  const navigate = useNavigate();

  const [Roles] = useState([
    { label: "Administrador", value: "Admin" },
    { label: "Mantenimiento", value: "Maintenance" },
    { label: "Visitante", value: "Visitor" },
    { label: "Consulta", value: "Query" }
  ]);

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...data, rol: data.rol || "Admin" };
      console.log("Enviando:", payload);

      const res = await axios.post("http://localhost:5086/api/User/register", payload);
         toast.success("¡USUARIO REGISTRADO CON EXITO!");
      //navigate("/dashboard");
    } catch (error) {
      console.error("Error de login:", error);
      alert("Datos incorrectos, intenta nuevamente.");
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <Sidebar />
      <ToastContainer/>
      <div style={styles.mainContent}>
        <div style={styles.loginWrapper}>
          <img style={styles.logosIndustry} src="src/images/sindustryblanco.webp" alt="Logo" />
          <Form style={styles.container} onSubmit={onSubmit}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                style={styles.input}
                type="text"
                placeholder="Username"
                name="username"
                value={data.username}
                onChange={onChange}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                style={styles.input}
                type="email"
                placeholder="Email"
                name="email"
                value={data.email}
                onChange={onChange}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                style={styles.input}
                type="password"
                placeholder="Password"
                name="password"
                value={data.password}
                onChange={onChange}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Rol</Form.Label>
              <Form.Select
                style={styles.input}
                name="rol"
                value={data.rol}
                onChange={onChange}
                required
              >
                <option value="">Selecciona un rol</option>
                {Roles.map((role, index) => (
                  <option key={index} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button style={styles.buttonForm} type="submit">
              Registrar
            </Button>
          </Form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
  },

  mainContent: {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
  },

  loginWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundImage: 'url("./images/maquinas.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    border: '1px solid rgb(219, 219, 219)',
    boxSizing: 'border-box',
    position: 'relative',
    borderRadius: '15px',
  },

  container: {
    padding: '50px 40px 20px 40px',
    fontFamily: 'sans-serif',
    color: '#737373',
    border: '1px solid rgb(219, 219, 219)',
    textAlign: 'center',
    background: 'white',
    borderRadius: '15px',
    width: '400px',
  },

  input: {
    width: '100%',
    background: 'inherit',
    border: '1px solid #ccc',
    outline: 'none',
    padding: '9px 8px 7px 8px',
    fontSize: '16px',
    marginBottom: '15px',
    borderRadius: '4px',
  },

  buttonForm: {
    width: '100%',
    height: '40px',
    background: '#69cb16',
    color: 'black',
    borderRadius: '3px',
    border: 'none',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color ease-in-out .2s',
    marginTop: '20px',
  },

  logosIndustry: {
    width: '200px',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '15%',
    marginBottom: '20px',
  },
};

export default RegisterPage;
