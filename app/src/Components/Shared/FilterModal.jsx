// src/Components/Shared/FilterModal.jsx
import React, { useState, useEffect } from "react";

const FilterModal = ({ onClose, onApply }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [machineId, setMachineId] = useState("");

  useEffect(() => {
    // cerrar con ESC
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onApply({ startDate, endDate, machineId });
    onClose();
  };

  // Si el usuario hace click en el overlay, cerramos
  // pero si hace click dentro de la tarjeta evitamos el cierre (stopPropagation)
  return (
    <div style={styles.backdrop} onMouseDown={onClose} role="dialog" aria-modal="true">
      <div style={styles.card} onMouseDown={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <div>
            <div style={styles.title}> Filtrar reportes</div>
            <div style={styles.subtitle}>Aplica rango de fechas o selecciona una máquina</div>
          </div>

          <button
            aria-label="Cerrar"
            onClick={onClose}
            style={styles.closeBtn}
            type="button"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            Fecha inicio
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={styles.input}
            />
          </label>

          <label style={styles.label}>
            Fecha fin
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={styles.input}
            />
          </label>

          <label style={styles.label}>
            ID de máquina
            <input
              type="text"
              placeholder="Ej. 1"
              value={machineId}
              onChange={(e) => setMachineId(e.target.value)}
              style={styles.input}
            />
          </label>

          <div style={styles.actions}>
            <button type="button" onClick={onClose} style={styles.cancelBtn}>
              Cancelar
            </button>
            <button type="submit" style={styles.applyBtn}>
              Aplicar filtros
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  backdrop: {
    position: "fixed",
    inset: 0, // top:0 right:0 bottom:0 left:0
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.35)",
    zIndex: 9999,
    padding: "20px",
    boxSizing: "border-box",
  },
  card: {
    width: "100%",
    maxWidth: "540px",
    background: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 12px 30px rgba(16,24,40,0.2)",
    padding: "20px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "4px",
  },
  title: {
    fontSize: "18px",
    fontWeight: 600,
    color: "#2c3e50",
  },
  subtitle: {
    fontSize: "13px",
    color: "#6b7280",
    marginTop: "4px",
  },
  closeBtn: {
    background: "transparent",
    border: "none",
    fontSize: "22px",
    lineHeight: 1,
    cursor: "pointer",
    color: "#374151",
    padding: "4px 8px",
    borderRadius: "6px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    fontSize: "14px",
    color: "#374151",
  },
  input: {
    height: "40px",
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    outline: "none",
    fontSize: "14px",
    boxSizing: "border-box",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "8px",
  },
  cancelBtn: {
    padding: "10px 16px",
    background: "#f3f4f6",
    color: "#111827",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  applyBtn: {
    padding: "10px 16px",
    background: "#00bf63",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: 600,
  },
};

export default FilterModal;
