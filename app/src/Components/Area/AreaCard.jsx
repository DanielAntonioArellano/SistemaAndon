import React, { useState } from 'react';
import axios from 'axios';

const AreaComponent = ({ area, onLineCreated }) => {
  const [expanded, setExpanded] = useState(false);
  const [showLineForm, setShowLineForm] = useState(false);
  const [newLineName, setNewLineName] = useState('');
  const [newLineDescription, setNewLineDescription] = useState('');


  const handleCreateLine = async () => {
    if (!newLineName.trim()) return;

    try {
      const payload = {
        AreaId: area.id,
        Name: newLineName,
        Description: ''
      };

      await axios.post('http://localhost:5086/api/Line', payload);
      setNewLineName('');
      setNewLineDescription('');
      setShowLineForm(false);
      onLineCreated();   
        } catch (err) {
      console.error('Error al crear línea', err);
      alert('No se pudo crear la línea.');
    }
  };

  return (
  <div style={styles.areaContainer}>
    <button onClick={() => setExpanded(!expanded)} style={styles.areaButton}>
      {area.name}
    </button>

    {expanded && (
      <div style={styles.lineContainer}>
        <button
          onClick={() => setShowLineForm(!showLineForm)}
          style={styles.addLineButton}
        >
          + Agregar línea
        </button>

        {showLineForm && (
          <div style={styles.lineForm}>
            <input
              type="text"
              placeholder="Nombre de línea"
              value={newLineName}
              onChange={(e) => setNewLineName(e.target.value)}
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Descripción"
              value={newLineDescription}
              onChange={(e) => setNewLineDescription(e.target.value)}
              style={styles.input}
            />
            <button onClick={handleCreateLine} style={styles.createBtn}>
              Crear
            </button>
          </div>
        )}

        {area.lines?.map((line) => (
          <div key={line.id} style={styles.lineBox}>
            {line.name}
          </div>
        ))}
      </div>
    )}
  </div>
);
};

const styles = {
  areaContainer: {
    margin: '20px',
    padding: '15px',
    border: '2px solid #ccc',
    borderRadius: '12px',
    backgroundColor: '#f5f5f5',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  },
  areaButton: {
    width: '100%',
    padding: '10px 15px',
    fontSize: '18px',
    textAlign: 'left',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#007BFF',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  lineContainer: {
    marginTop: '10px',
    paddingLeft: '20px',
  },
  addLineButton: {
    margin: '10px 0',
    padding: '6px 10px',
    backgroundColor: '#28a745',
    color: 'white',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
  },
  lineForm: {
    display: 'flex',
    gap: '10px',
    marginBottom: '10px',
  },
  input: {
    flex: 1,
    padding: '6px 10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  createBtn: {
    padding: '6px 10px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  lineBox: {
    padding: '8px 12px',
    margin: '8px 0',
    backgroundColor: '#e0e0e0',
    borderRadius: '8px',
  },
};

export default AreaComponent;
