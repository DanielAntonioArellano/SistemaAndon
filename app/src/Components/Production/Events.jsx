import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid
} from "recharts";
import { Card } from "react-bootstrap";

const Dashboard = () => {
  const [machinesData, setMachinesData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5086/api/Production")
      .then(response => {
        const data = response.data;

        // Agrupar producciones por máquina
        const grouped = {};
        data.forEach(p => {
          const machineName = p.machine.name;

          if (!grouped[machineName]) {
            grouped[machineName] = {
              totals: { ok: 0, ng: 0 },
              history: []
            };
          }

          grouped[machineName].totals.ok += p.quantityProducedOK;
          grouped[machineName].totals.ng += p.quantityProducedNG;

          grouped[machineName].history.push({
            date: new Date(p.dateTime).toLocaleDateString(),
            ok: p.quantityProducedOK,
            ng: p.quantityProducedNG
          });
        });

        const result = Object.keys(grouped).map(machine => ({
          machine,
          history: grouped[machine].history
        }));

        setMachinesData(result);
      })
      .catch(error => {
        console.error("Error al obtener producciones:", error);
      });
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>📊 Dashboard de Producción</h1>
      <div className="row">
        {machinesData.map((m, index) => (
          <div key={index} className="col-md-6 mb-4">
            <Card className="shadow p-3">
              <h3 className="text-center mb-3">{m.machine}</h3>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={m.history}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="ok" fill="#28a745" name="Piezas OK" />
                  <Bar dataKey="ng" fill="#dc3545" name="Piezas NG" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
