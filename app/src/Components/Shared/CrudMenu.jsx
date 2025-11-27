// src/Components/Shared/CrudMenu.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BiDotsVerticalRounded } from "react-icons/bi";

const CrudMenu = ({ type, id, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef();

console.log("[CrudMenu] props:", { type, id });

  const handleGetReports = () => {
    if(!type || !id){
        console.warn("Falta type o id")
    }
    navigate(`/production?type=${type}&id=${id}`);
    setOpen(false);
  };

  // Cerrar menú si clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: 4,
        }}
        aria-label="menu"
      >
        <BiDotsVerticalRounded size={20} />
      </button>

      {open && (
        <div style={styles.menu}>
          
          <button style={styles.option} onClick={handleGetReports}>
            Obtener reportes
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  menu: {
    position: "absolute",
    top: "110%",
    right: 0,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    border: "1px solid rgba(0,0,0,0.12)",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    zIndex: 999,
    minWidth: "150px",
    overflow: "hidden",
  },
  option: {
    background: "none",
    border: "none",
    padding: "10px 12px",
    textAlign: "left",
    cursor: "pointer",
    fontSize: "14px",
    color: "#333",
    transition: "background 0.2s",
  },
};

export default CrudMenu;
