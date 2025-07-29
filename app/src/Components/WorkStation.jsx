import React from "react";

const WorkStation = ({ data }) => {
  return (
    <div style={styles().container}>
      <p style={styles().text}>Estación: {data.name}</p>
    </div>
  );
};

export default WorkStation;

function styles() {
  return {
    container: {
      backgroundColor: "#e8e8e8",
      padding: "6px",
      marginLeft: "40px",
      borderRadius: "4px",
      marginBottom: "4px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    },
    text: {
      margin: 0,
      color: "#333",
    }
  };
}
