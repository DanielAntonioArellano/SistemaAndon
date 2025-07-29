import React from "react";

const Sidebar = () => {
 


  const [hoverIndex, setHoverIndex] = React.useState(null);

  const menuItems = ["Inicio", "Producción", "Fallas", "Reportes", "Usuarios"];

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.title}>Andon-OEE</h2>
      {menuItems.map((item, index) => (
        <button
          key={index}
          style={{
            ...styles.button,
            ...(hoverIndex === index ? styles.buttonHover : {})
          }}
          onMouseEnter={() => setHoverIndex(index)}
          onMouseLeave={() => setHoverIndex(null)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};
 const styles = {
    sidebar: {
      width: "400px",
      height: "100vh",
      backgroundColor: "#2c3e50",
      color: "#ecf0f1",
      padding: "20px",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    title: {
      fontSize: "24px",
      marginBottom: "30px",
    },
    button: {
      backgroundColor: "#34495e",
      border: "2px solid #1abc9c",
      color: "#ecf0f1",
      fontSize: "16px",
      padding: "12px 15px",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      textAlign: "left",
    },
    buttonHover: {
      backgroundColor: "#1abc9c",
      color: "#2c3e50",
      transform: "scale(1.05)",
    }
  };

export default Sidebar;
