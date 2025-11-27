// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Shared/Sidebar";
import AreaList from "../Components/Area/AreaList";
import API from "../Api/Api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CrudMenu from "../Components/Shared/CrudMenu";

const Dashboard = () => {
  const [areas, setAreas] = useState([]);
  const [showAreaForm, setShowAreaForm] = useState(false);
  const [areaForm, setAreaForm] = useState({ name: "", description: "" });

  useEffect(() => {
    fetchAreas();
  }, []);

  const fetchAreas = async () => {
    try {
      const res = await API.get("http://localhost:5086/api/areas");
      setAreas(res.data);
    } catch (err) {
      console.error("Error fetching areas:", err);
      toast.error("Error al obtener áreas");
    }
  };

  // create generic
  const handleCreate = async (endpoint, data) => {
    try {
      await API.post(`http://localhost:5086/api/${endpoint}`, data);
      toast.success(`${endpoint} creado`);
      fetchAreas();
    } catch (err) {
      console.error("create error", err);
      toast.error(`Error creando ${endpoint}`);
    }
  };

  const handleDelete = async (endpoint, id) => {
    try {
      await API.delete(`http://localhost:5086/api/${endpoint}/${id}`);
      toast.success(`${endpoint} eliminado`);
      fetchAreas();
    } catch (err) {
      console.error("delete error", err);
      toast.error(`Error eliminando ${endpoint}`);
    }
  };

  // wrappers to make child calls clearer
  const handleCreateArea = (data) => handleCreate("areas", data);
  const handleDeleteArea = (id) => handleDelete("areas", id);

  const handleCreateLine = (data) => handleCreate("line", data);
  const handleDeleteLine = (id) => handleDelete("line", id);

  const handleCreateWorkstation = (data) => handleCreate("workstation", data);
  const handleDeleteStation = (id) => handleDelete("workstation", id);

  const handleCreateMachine = (data) => handleCreate("machine", data);
  const handleDeleteMachine = (id) => handleDelete("machine", id);

  const submitArea = (e) => {
    e.preventDefault();
    if (!areaForm.name) return;
    handleCreateArea(areaForm);
    setAreaForm({ name: "", description: "" });
    setShowAreaForm(false);
  };

  return (
    <div style={styles.dashboard}>
      <Sidebar />
      <ToastContainer />
      <div style={styles.content}>
        <h1 style={styles.title}>Dashboard Andon-OEE</h1>

        <div style={{ marginBottom: 18 }}>
          <button
            onClick={() => setShowAreaForm((s) => !s)}
            style={styles.addButton}
          >
            {showAreaForm ? "Cancelar" : "Agregar Área"}
          </button>
        </div>

        {showAreaForm && (
          <form
            onSubmit={submitArea}
            style={{ ...styles.form, border: "2px solid #17a2b8" }}
          >
            <input
              type="text"
              placeholder="Nombre del área"
              value={areaForm.name}
              onChange={(e) =>
                setAreaForm({ ...areaForm, name: e.target.value })
              }
              required
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Descripción"
              value={areaForm.description}
              onChange={(e) =>
                setAreaForm({ ...areaForm, description: e.target.value })
              }
              style={styles.input}
            />
            <button type="submit" style={styles.submitButton}>
              Crear Área
            </button>
          </form>
        )}

        {/* 👇 Aquí integramos CrudMenu en cada área */}
        <AreaList
          areas={areas.map((area) => ({
            ...area,
            menu: (
              <CrudMenu
                type="area"
                id={area.areaId}
                onEdit={() => console.log("Editar área:", area)}
                onDelete={() => handleDeleteArea(area.areaId)}
              />
            ),
          }))}
          onCreateLine={handleCreateLine}
          onDeleteArea={handleDeleteArea}
          onCreateWorkstation={handleCreateWorkstation}
          onDeleteLine={handleDeleteLine}
          onCreateMachine={handleCreateMachine}
          onDeleteStation={handleDeleteStation}
          onDeleteMachine={handleDeleteMachine}
        />
      </div>
    </div>
  );
};

const styles = {
  dashboard: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    backgroundColor: "#f0f2f5",
    fontFamily: "Arial, sans-serif",
  },
  content: {
    flex: 1,
    padding: "30px",
    overflowY: "auto",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  },
  addButton: {
    padding: "10px 20px",
    marginBottom: "20px",
    fontSize: "16px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "10px",
    borderRadius: "8px",
    marginTop: "10px",
    marginBottom: "20px",
    backgroundColor: "#fff",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  submitButton: {
    padding: "10px 15px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default Dashboard;
