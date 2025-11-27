// src/Components/Workstation/WorkstationList.jsx
import React, { useState } from "react";
import CrudMenu from "../Shared/CrudMenu";
import MachineList from "../Machine/MachineList";
import { FaPlus, FaTrashAlt } from "react-icons/fa";

const WorkstationList = ({ station, onCreateMachine, onDeleteStation, onDeleteMachine }) => {
  const [showMachineForm, setShowMachineForm] = useState(false);
  const [machineForm, setMachineForm] = useState({
    name: "",
    description: "",
    serialNumber: "",
    status: "Active",
  });

  const submitMachine = (e) => {
    e.preventDefault();
    if (!machineForm.name) return;
    const data = { ...machineForm, workStationId: Number(station.id) };
    onCreateMachine && onCreateMachine(data);
    setMachineForm({ name: "", description: "", serialNumber: "", status: "Active" });
    setShowMachineForm(false);
  };

  return (
    <div style={styles.stationBox}>
      <div style={styles.header}>
        <div>
          <strong>Estación:</strong> {station.name}
          <div style={styles.meta}>{station.description}</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            onClick={() => setShowMachineForm((s) => !s)}
            style={styles.smallAction}
            title="Agregar máquina"
          >
            <FaPlus />
          </button>

          <CrudMenu
          type="station"
          id={station.id}
            actions={[
              { label: "Eliminar Estación", onClick: () => onDeleteStation && onDeleteStation(station.id), danger: true, icon: <FaTrashAlt /> }
            ]}
          />
        </div>
      </div>

      {showMachineForm && (
        <form onSubmit={submitMachine} style={styles.form}>
          <input
            placeholder="Nombre máquina"
            value={machineForm.name}
            onChange={(e) => setMachineForm({ ...machineForm, name: e.target.value })}
            required
            style={styles.input}
          />
          <input
            placeholder="Descripción"
            value={machineForm.description}
            onChange={(e) => setMachineForm({ ...machineForm, description: e.target.value })}
            style={styles.input}
          />
          <input
            placeholder="Serial"
            value={machineForm.serialNumber}
            onChange={(e) => setMachineForm({ ...machineForm, serialNumber: e.target.value })}
            style={styles.input}
          />
          <div style={{ display: "flex", gap: 8 }}>
            <button type="submit" style={styles.btnPrimary}>Crear Máquina</button>
            <button type="button" onClick={() => setShowMachineForm(false)} style={styles.btnSecondary}>Cancelar</button>
          </div>
        </form>
      )}

      <MachineList machines={station.machines || []} onDeleteMachine={onDeleteMachine} />
    </div>
  );
};

const styles = {
  stationBox: {
    border: "1px solid #20c997",
    borderRadius: 8,
    padding: 10,
    margin: "10px 0 10px 40px",
    backgroundColor: "#e6f9f1",
  },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  meta: { fontSize: 13, color: "#555" },
  smallAction: {
    background: "#fff",
    border: "1px solid #ccc",
    padding: 6,
    borderRadius: 6,
    cursor: "pointer",
  },
  form: { marginTop: 10, display: "flex", flexDirection: "column", gap: 8 },
  input: { padding: 8, borderRadius: 6, border: "1px solid #ccc", fontSize: 14 },
  btnPrimary: { padding: "8px 12px", background: "#fd7e14", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" },
  btnSecondary: { padding: "8px 12px", background: "#f0f0f0", border: "none", borderRadius: 6, cursor: "pointer" },
};

export default WorkstationList;
