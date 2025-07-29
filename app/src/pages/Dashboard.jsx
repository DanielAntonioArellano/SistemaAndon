import React, { useEffect, useState } from 'react';
import Sidebar from '../Components/Shared/Sidebar';
import AreaComponent from '../components/Area/AreaCard';
import axios from 'axios';

const Dashboard = () => {
  const [areas, setAreas] = useState([]);
  const [newArea, setNewArea] = useState({ name: '', description: '' });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchAreas();
  }, []);

  const fetchAreas = async () => {
    try {
      const response = await axios.get('http://localhost:5086/api/areas');
      setAreas(response.data);
    } catch (error) {
      console.error('Error al obtener las áreas:', error);
    }
  };

  const handleAddArea = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5086/api/areas', newArea);
      setNewArea({ name: '', description: '' });
      setShowForm(false);
      fetchAreas();
    } catch (error) {
      console.error('Error al crear el área:', error);
    }
  };

  return (
    <div style={styles.dashboard}>
      <Sidebar />
      <div style={styles.content}>
        <h1 style={styles.title}>Dashboard Andon-OEE</h1>

        <button onClick={() => setShowForm(!showForm)} style={styles.addButton}>
          {showForm ? 'Cancelar' : 'Agregar Área'}
        </button>

        {showForm && (
          <form onSubmit={handleAddArea} style={styles.form}>
            <input
              type="text"
              placeholder="Nombre del área"
              value={newArea.name}
              onChange={(e) => setNewArea({ ...newArea, name: e.target.value })}
              required
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Descripción"
              value={newArea.description}
              onChange={(e) => setNewArea({ ...newArea, description: e.target.value })}
              style={styles.input}
            />
            <button type="submit" style={styles.submitButton}>Crear</button>
          </form>
        )}

        {areas.length === 0 ? (
          <p style={styles.empty}>No hay áreas registradas.</p>
        ) : (
        areas.map((area) => (
        <AreaComponent key={area.id} area={area} onLineCreated={fetchAreas} />
))
        )}
      </div>
    </div>
  );
};

const styles = {
  dashboard: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#f0f2f5',
    fontFamily: 'Arial, sans-serif',
  },
  content: {
    flex: 1,
    padding: '30px',
    overflowY: 'auto',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
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
    transition: 'background-color 0.3s ease',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
    gap: '10px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  submitButton: {
    padding: '10px 15px',
    fontSize: '16px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  empty: {
    fontStyle: 'italic',
    color: '#888',
  },
};

export default Dashboard;
