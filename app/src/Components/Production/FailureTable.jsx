import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../../Api/Api";

const FailureTable = () => {
    const [productions, setProductions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        API.get("http://localhost:5086/api/Production")
            .then(response => {
                setProductions(response.data);
            })
            .catch(error => {
                console.error("Error al obtener Producciones:", error);
            });
    }, []);

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Fallas Registradas</h1>


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
                        <th style={styles.th}>Falla</th>
                        <th style={styles.th}>Alerta</th>

                    </tr>
                </thead>
                <tbody>
                    {productions.map((p) => (
                        <tr key={p.productionId}>
                            <td style={styles.td}>{p.productionId}</td>
                            <td style={styles.td}>{p.area?.name || "N/A"}</td>
                            <td style={styles.td}>{p.line?.name || "N/A"}</td>
                            <td style={styles.td}>{p.workstation?.name || "N/A"}</td>
                            <td style={styles.td}>{p.machine?.id|| "N/A"}</td>
                            <td style={styles.td}>{p.model || "N/A"}</td>
                            <td style={styles.td}>{new Date(p.dateTime).toLocaleString()}</td>
                            <td style={styles.td}>{p.failure}</td>
                            <td style={styles.td}><div style={{...styles.alertIndicator,
                                backgroundColor:p.failure? "red":"gray",
                            }}/></td>

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
   alertIndicator: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    margin: "0 auto",
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
    addButton: {
        padding: "10px 20px",
        marginBottom: "20px",
        fontSize: "16px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
    },
};

export default FailureTable;
