import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AreaCard from './AreaCard';

const AreaList = () => {
  const [areas, setAreas] = useState([]);
  const [newArea, setNewArea] = useState({ name: '', description: '' });

  useEffect(() => {
    fetchAreas();
  }, []);





  
  const fetchAreas = async () => {
    try {
      const res = await axios.get('http://localhost:5086/api/Area');
      setAreas(res.data);
    } catch (err) {
      alert('Error al obtener las áreas');
    }
  };

  const handleChange = (e) => {
    setNewArea({ ...newArea, [e.target.name]: e.target.value });
  };

  const createArea = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5086/api/Area', newArea);
      setAreas([...areas, res.data]);
      setNewArea({ name: '', description: '' });
    } catch (err) {
      alert('Error al crear el área');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Áreas del Sistema</h2>

      <form onSubmit={createArea} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Nombre del Área"
          value={newArea.name}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Descripción"
          value={newArea.description}
          onChange={handleChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Crear Área</button>
      </form>

      {areas.map((area) => (
        <AreaCard key={area.id} area={area} />
      ))}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
  title: {
    fontSize: '28px',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    gap: '10px',
    marginBottom: '30px',
    flexWrap: 'wrap',
  },
  input: {
    flex: '1',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#28a745',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default AreaList;
