import React, { useEffect, useState } from "react";
import { fetchAllCDMData } from "../API/cdm";

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
