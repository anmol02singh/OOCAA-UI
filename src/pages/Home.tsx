import React, { useEffect, useState } from "react";
import { fetchAllCDMData } from "../API/cdm";
import space from "../assets/space-ship-space.svg";
import "../styles/shipStyle.css";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await fetchAllCDMData();
        setData(result);
      } catch (error) {
        console.error("Failed to fetch CDM data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <img src={space} alt="rocketship" className="ship" />
      <h1>CDM Data</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
