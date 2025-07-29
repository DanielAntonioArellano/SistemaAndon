import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import React, { useState } from "react";
 import { useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: ""
  });
  const navigate = useNavigate();

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
  e.preventDefault();
  try {
    const payload = { ...data, rol: "operator" };
    console.log("Enviando:", payload);

    const res = await axios.post("http://localhost:5086/api/User/login", payload);

    console.log("Respuesta completa:", res.data);

    const user = res.data.user || res.data;

    const userWithFlag = { ...user, logined: true };

    console.log("Usuario con logined:", userWithFlag);

    alert("¡BIENVENIDO!");
    navigate("/dashboard")
  } catch (error) {
    console.error("Error de login:", error);
    alert("Datos incorrectos, intenta nuevamente.");
  }
};

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <img className="logosindustry" src="src/images/sindustryblanco.png" alt="Logo" />
        <Form className="container"  onSubmit={onSubmit}>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              className="content__form"
              type="text"
              placeholder="Username"
              name="username"
              value={data.username || ""}
              onChange={onChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              className="content__form"
              type="password"
              placeholder="Password"
              name="password"
              value={data.password || ""}
              onChange={onChange}
              required
            />
          </Form.Group>

          <Button className="buttonForm" type="submit" onClick={onSubmit}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
