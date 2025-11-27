// src/Components/Production/ProductionTable.jsx
import React, { useState, useEffect } from "react";
import API from "../../Api/Api";

const ProductionPage = ({ filters = {} }) => {
  const [productions, setProductions] = useState([]);
  const [filteredProductions, setFilteredProductions] = useState([]);

  useEffect(() => {
    API.get("http://localhost:5086/api/Production")
      .then((response) => {
        setProductions(response.data || []);
        setFilteredProductions(response.data || []);
        console.log("[ProductionTable] fetched:", (response.data || []).length, "items");
      })
      .catch((error) => {
        console.error("Error al obtener Producciones:", error);
      });
  }, []);

  // helper para leer valores con variantes de nombres
  const getFieldValue = (obj, paths) => {
    for (const path of paths) {
      // path es array de keys, ej ['area','id'] o ['areaId']
      let cur = obj;
      let ok = true;
      for (const key of path) {
        if (cur == null || typeof cur !== "object" || !(key in cur)) {
          ok = false;
          break;
        }
        cur = cur[key];
      }
      if (ok) return cur;
    }
    return undefined;
  };

  useEffect(() => {
    // variantes posibles para cada id
    const variants = {
      areaId: [
        ["areaId"],
        ["area", "id"],
        ["area", "areaId"],
        ["AreaId"],
      ],
      lineId: [
        ["lineId"],
        ["line", "id"],
        ["line", "lineId"],
        ["LineId"],
      ],
      stationId: [
        ["stationId"],
        ["station", "id"],
        ["station", "stationId"],
        ["workstationId"],
        ["workStationId"],
        ["workstation", "id"],
      ],
      machineId: [
        ["machineId"],
        ["machine", "id"],
        ["MachineId"],
        ["machine", "machineId"],
      ],
    };

    let data = [...productions];

    // Aplicar filtros por entidad (si vienen)
    if (filters) {
      // filtrado para cada posible key si existe en filters
      if (filters.areaId != null) {
        data = data.filter((p) => {
          const val = getFieldValue(p, variants.areaId);
          return Number(val) === Number(filters.areaId);
        });
      }
      if (filters.lineId != null) {
        data = data.filter((p) => {
          const val = getFieldValue(p, variants.lineId);
          return Number(val) === Number(filters.lineId);
        });
      }
      if (filters.stationId != null) {
        data = data.filter((p) => {
          const val = getFieldValue(p, variants.stationId);
          return Number(val) === Number(filters.stationId);
        });
      }
      if (filters.machineId != null) {
        data = data.filter((p) => {
          const val = getFieldValue(p, variants.machineId);
          return Number(val) === Number(filters.machineId);
        });
      }

      // filtros por fecha (si existen)
      if (filters.startDate) {
        data = data.filter((p) => new Date(p.dateTime) >= new Date(filters.startDate));
      }
      if (filters.endDate) {
        data = data.filter((p) => new Date(p.dateTime) <= new Date(filters.endDate));
      }

      // filtro por machineId desde form (compatibilidad)
      if (filters.machineIdForm) {
        data = data.filter((p) => {
          const val = getFieldValue(p, variants.machineId);
          return Number(val) === Number(filters.machineIdForm);
        });
      }
    }

    console.log("[ProductionTable] applying filters:", filters, "-> results:", data.length);
    setFilteredProductions(data);
  }, [filters, productions]);

  return (
    <div style={styles.container}>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Área</th>
            <th style={styles.th}>Línea</th>
            <th style={styles.th}>Estación</th>
            <th style={styles.th}>Máquina</th>
            <th style={styles.th}>Modelo</th>
            <th style={styles.th}>Fecha y Hora</th>
            <th style={styles.th}>OK</th>
            <th style={styles.th}>NG</th>
            <th style={styles.th}>Tiempo Producción</th>
            <th style={styles.th}>Tiempo Paro</th>
            <th style={styles.th}>Estatus</th>
            <th style={styles.th}>Fallas</th>
            <th style={styles.th}>Operador</th>
          </tr>
        </thead>
        <tbody>
          {filteredProductions.map((p) => (
            <tr key={p.productionId || p.id || Math.random()}>
              <td style={styles.td}>{p.productionId ?? p.id}</td>
              <td style={styles.td}>{p.area?.name || p.areaName || "N/A"}</td>
              <td style={styles.td}>{p.line?.name || p.lineName || "N/A"}</td>
              <td style={styles.td}>{p.workstation?.name || p.stationName || "N/A"}</td>
              <td style={styles.td}>{p.machine?.id || p.machineId|| "N/A"}</td>
              <td style={styles.td}>{p.model || "N/A"}</td>
              <td style={styles.td}>{p.dateTime ? new Date(p.dateTime).toLocaleString() : "N/A"}</td>
              <td style={styles.td}>{p.quantityProducedOK}</td>
              <td style={styles.td}>{p.quantityProducedNG}</td>
              <td style={styles.td}>{p.productionTime}</td>
              <td style={styles.td}>{p.productionDowntime}</td>
              <td style={styles.td}>{p.status}</td>
              <td style={styles.td}>{p.failure}</td>
              <td style={styles.td}>{p.operator}</td>
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
};

export default ProductionPage;
