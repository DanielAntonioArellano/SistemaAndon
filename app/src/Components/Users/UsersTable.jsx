import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/esm/Button";
import { useNavigate, useNavigation } from "react-router-dom";
import API from "../../Api/Api";

const UsersPage = () =>{
    const [Users, setUsers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
    API.get('http://localhost:5086/api/user')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error al obtener usuarios:', error);
      });
  }, []);
    return(
       <div style={styles.container}>
      <h1 style={styles.title}>Usuarios Registrados</h1>
      <button onClick={()=> navigate("/Register")} style={styles.addButton}>Crear Usuario</button>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Nombre</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Rol</th>
          </tr>
        </thead>
        <tbody>
          {Users.map((u) => (
            <tr key={u.idUser}>
              <td style={styles.td}>{u.idUser}</td>
              <td style={styles.td}>{u.userName}</td>
              <td style={styles.td}>{u.email}</td>
              <td style={styles.td}>{u.rol}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#333",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  th: {
    backgroundColor: "#f2f2f2",
    textAlign: "left",
    padding: "12px",
    borderBottom: "1px solid #ddd",
    fontWeight: "bold",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #eee",
  },
    addButton: {
    padding: '10px 20px',
    marginBottom: '20px',
    fontSize: '16px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};

export default UsersPage;