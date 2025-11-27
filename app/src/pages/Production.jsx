// src/pages/Production.jsx
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductionPage from "../Components/Production/ProductionTable";
import Sidebar from "../Components/Shared/Sidebar";
import FilterModal from "../Components/Shared/FilterModal.jsx";

const Production = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({});

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get("type"); // e.g. "area", "line", "workstation", "machine"
    const id = params.get("id");

    // mapeo explícito type -> campo que usaremos en ProductionTable
    const map = {
      area: "areaId",
      line: "lineId",
      workstation: "stationId", // importante: mapear a stationId si ese es el campo real
      machine: "machineId"
    };

    if (type && id) {
      const key = map[type] ?? `${type}Id`;
      setFilters((prev) => ({ ...prev, [key]: Number(id), __fromUrl: true }));
      console.log("[Production.jsx] query params ->", { type, id, mappedKey: key });
    }
  }, [location.search]);

  const handleOpenFilter = () => setIsFilterOpen(true);
  const handleCloseFilter = () => setIsFilterOpen(false);

  const handleApplyFilter = (newFilters) => {
    setFilters(newFilters);
    setIsFilterOpen(false);
  };

  return (
    <div style={styles.page}>
      <Sidebar />
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>Producciones Registradas</h1>
          <button style={styles.filterButton} onClick={handleOpenFilter}>
            Filtrar Reportes
          </button>
        </div>

        <ProductionPage filters={filters} />

        {isFilterOpen && (
          <FilterModal onClose={handleCloseFilter} onApply={handleApplyFilter} />
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
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
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "24px",
    color: "#333",
  },
  filterButton: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default Production;
