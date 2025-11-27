import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaIndustry, FaTools, FaChartBar, FaUsers } from "react-icons/fa";


const Sidebar = () => {
 
const navigate = useNavigate();

  const [hoverIndex, setHoverIndex] = React.useState(null);
  ["Inicio", "Producción", "Fallas", "Reportes", "Usuarios"];
  const menuItems = [
    {name:"Inicio", path:"/dashboard",icon:<FaHome/>},
    {name:"Produccion", path:"/Events",icon:<FaIndustry/>},
    {name:"Fallas", path:"/Failure", icon:<FaTools/>},
    {name:"Reportes", path:"/Production", icon:<FaChartBar/>},
    {name:"Usuarios", path:"/Users", icon:<FaUsers/>}
  ]

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
          onClick={()=> navigate(item.path)}
          onMouseEnter={() => setHoverIndex(index)}
          onMouseLeave={() => setHoverIndex(null)}
        >
          <span style={styles.marginIcon}>{item.icon}</span>
          {item.name}
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
    },
    marginIcon:{
      marginRight:"8px",
      marginTop:"25px"
    }
    
  };

export default Sidebar;
