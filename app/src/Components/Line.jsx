
import React, { useEffect, useState } from "react";
import axios from "axios";
import WorkStation from "./WorkStation";

const Line = ({ data }) => {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5086/api/WorkStation/by-line/${data.id}`)
      .then((res) => setStations(res.data))
      .catch((err) => console.error(err));
  }, [data.id]);

  return (
    <div style={styles().container}>
      <h4 style={styles().title}>{data.name}</h4>
      {stations.map((station) => (
        <WorkStation key={station.id} data={station} />
      ))}
    </div>
  );
};

export default Line;

function styles() {
  return {
    container: {
      border: "1px dashed #777",
      padding: "8px",
      marginLeft: "20px",
      backgroundColor: "#fafafa",
      borderRadius: "6px",
    },
    title: {
      marginBottom: "5px",
      color: "#444",
    }
  };
}
