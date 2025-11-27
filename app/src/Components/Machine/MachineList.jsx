// src/Components/Machine/MachineList.jsx
import React from "react";
import CrudMenu from "../Shared/CrudMenu";
import { FaTrashAlt } from "react-icons/fa";

const MachineList = ({ machines = [], onDeleteMachine }) => {
  return (
    <div style={styles.machineList}>
      {machines?.map((machine) => (
        <div key={machine.id} style={styles.machineBox}>
          <div style={styles.machineHeader}>
            <div>
              <strong>{machine.name}</strong>
              <div style={styles.machineMeta}>{machine.description}</div>
            </div>

            <CrudMenu
            type="machine"
            id={machine.id}
              actions={[
                {
                  label: "Eliminar Máquina",
                  onClick: () => onDeleteMachine && onDeleteMachine(machine.id),
                  danger: true,
                  icon: <FaTrashAlt />
                }
              ]}
            />
          </div>
          <div style={styles.machineDetails}>
            <small>Serial: {machine.serialNumber || "N/A"}</small>
            <small style={{ marginLeft: 12 }}>Estado: {machine.status || "N/A"}</small>
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  machineList: { marginLeft: 60, marginTop: 8 },
  machineBox: {
    background: "#fff7e6",
    border: "1px solid #f0cfa0",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  machineHeader: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  machineMeta: { color: "#666", fontSize: 13 },
  machineDetails: { marginTop: 8, color: "#444", fontSize: 13 },
};

export default MachineList;
