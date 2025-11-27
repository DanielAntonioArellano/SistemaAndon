// src/Components/Line/LineList.jsx
import React, { useState } from "react";
import CrudMenu from "../Shared/CrudMenu";
import WorkstationList from "../Workstation/WorkStationList";
import { FaPlus, FaTrashAlt } from "react-icons/fa";

const LineList = ({ line, onCreateWorkstation, onDeleteLine, onCreateMachine, onDeleteStation, onDeleteMachine }) => {
  const [showStationForm, setShowStationForm] = useState(false);
  const [stationForm, setStationForm] = useState({ name: "", description: "" });

  const submitStation = (e) => {
    e.preventDefault();
    if (!stationForm.name) return;
    onCreateWorkstation && onCreateWorkstation({ ...stationForm, lineId: line.id });
    setStationForm({ name: "", description: "" });
    setShowStationForm(false);
  };

  return (
    <div style={styles.lineBox}>
      <div style={styles.header}>
        <div>
          <strong>Línea:</strong> {line.name}
          <div style={styles.meta}>{line.description}</div>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button onClick={() => setShowStationForm((s) => !s)} style={styles.smallAction} title="Agregar estación">
            <FaPlus />
          </button>

          <CrudMenu
          type="line"
          id={line.id}
            actions={[
              { label: "Eliminar Línea", onClick: () => onDeleteLine && onDeleteLine(line.id), danger: true, icon: <FaTrashAlt /> }
            ]}
          />
        </div>
      </div>

      {showStationForm && (
        <form onSubmit={submitStation} style={styles.form}>
          <input placeholder="Nombre estación" value={stationForm.name} onChange={(e) => setStationForm({ ...stationForm, name: e.target.value })} required style={styles.input} />
          <input placeholder="Descripción" value={stationForm.description} onChange={(e) => setStationForm({ ...stationForm, description: e.target.value })} style={styles.input} />
          <div style={{ display: "flex", gap: 8 }}>
            <button type="submit" style={styles.btnPrimary}>Crear Estación</button>
            <button type="button" onClick={() => setShowStationForm(false)} style={styles.btnSecondary}>Cancelar</button>
          </div>
        </form>
      )}

      {line.workStations?.map((station) => (
        <WorkstationList
          key={station.id}
          station={station}
          onCreateMachine={onCreateMachine}
          onDeleteStation={onDeleteStation}
          onDeleteMachine={onDeleteMachine}
        />
      ))}
    </div>
  );
};

const styles = {
  lineBox: {
    border: "1px solid #ffc107",
    borderRadius: 8,
    padding: 10,
    margin: "10px 0 10px 20px",
    backgroundColor: "#fff7e6",
  },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  meta: { fontSize: 13, color: "#555" },
  smallAction: { background: "#fff", border: "1px solid #ccc", padding: 6, borderRadius: 6, cursor: "pointer" },
  form: { marginTop: 10, display: "flex", flexDirection: "column", gap: 8 },
  input: { padding: 8, borderRadius: 6, border: "1px solid #ccc", fontSize: 14 },
  btnPrimary: { padding: "8px 12px", background: "#20c997", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" },
  btnSecondary: { padding: "8px 12px", background: "#f0f0f0", border: "none", borderRadius: 6, cursor: "pointer" },
};

export default LineList;
