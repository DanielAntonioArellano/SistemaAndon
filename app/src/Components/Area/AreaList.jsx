// src/Components/Area/AreaList.jsx
import React, { useState } from "react";
import LineList from "../Line/LineList";
import CrudMenu from "../Shared/CrudMenu";
import { FaPlus, FaTrashAlt } from "react-icons/fa";

const AreaList = ({ areas = [], onCreateLine, onDeleteArea, onCreateWorkstation, onDeleteLine, onCreateMachine, onDeleteStation, onDeleteMachine }) => {
  const [showLineFormFor, setShowLineFormFor] = useState(null);
  const [lineForm, setLineForm] = useState({ name: "", description: "" });

  const submitLine = (areaId) => {
    if (!lineForm.name) return;
    onCreateLine && onCreateLine({ ...lineForm, areaId });
    setLineForm({ name: "", description: "" });
    setShowLineFormFor(null);
  };

  return (
    <div>
      {areas.map((area) => (
        <div key={area.id} style={styles.areaBox}>
          <div style={styles.header}>
            <div>
              <h3 style={{ margin: 0 }}>Área: {area.name}</h3>
              <div style={styles.meta}>{area.description}</div>
            </div>

            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <button
                onClick={() => setShowLineFormFor((s) => (s === area.id ? null : area.id))}
                style={styles.actionBtn}
                title="Agregar línea"
              >
                <FaPlus />
              </button>

              <CrudMenu
              type= "area"
              id={area.id}
              
                actions={[
                 
                  { label: "Eliminar Área", onClick: () => onDeleteArea && onDeleteArea(area.id), danger: true, icon: <FaTrashAlt /> }
                ]}
              />
            </div> 
          </div>
   
          {showLineFormFor === area.id && (
            <div style={styles.form}>
              <input placeholder="Nombre línea" value={lineForm.name} onChange={(e) => setLineForm({ ...lineForm, name: e.target.value })} style={styles.input} />
              <input placeholder="Descripción" value={lineForm.description} onChange={(e) => setLineForm({ ...lineForm, description: e.target.value })} style={styles.input} />
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => submitLine(area.id)} style={styles.btnPrimary}>Crear Línea</button>
                <button onClick={() => setShowLineFormFor(null)} style={styles.btnSecondary}>Cancelar</button>
              </div>
            </div>
          )}

          {area.lines?.map((line) => (
            <LineList
              key={line.id}
              line={line}
              onCreateWorkstation={(data) => onCreateWorkstation && onCreateWorkstation({ ...data, lineId: line.id })}
              onDeleteLine={(id) => onDeleteLine && onDeleteLine(id)}
              onCreateMachine={(data) => onCreateMachine && onCreateMachine(data)}
              onDeleteStation={(id) => onDeleteStation && onDeleteStation(id)}
              onDeleteMachine={(id) => onDeleteMachine && onDeleteMachine(id)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

const styles = {
  areaBox: {
    border: "1px solid #17a2b8",
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    backgroundColor: "#e9f7fd",
  },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  meta: { color: "#555" },
  actionBtn: { background: "#fff", border: "1px solid #ccc", padding: 6, borderRadius: 6, cursor: "pointer" },
  form: { marginTop: 10, marginBottom: 10, display: "flex", flexDirection: "column", gap: 8 },
  input: { padding: 8, borderRadius: 6, border: "1px solid #ccc" },
  btnPrimary: { padding: "8px 12px", background: "#17a2b8", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" },
  btnSecondary: { padding: "8px 12px", background: "#f0f0f0", border: "none", borderRadius: 6, cursor: "pointer" },
};

export default AreaList;
