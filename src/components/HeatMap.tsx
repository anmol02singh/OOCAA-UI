import React from "react";
import { Chart as ChartJS, LinearScale, Tooltip, PointElement } from "chart.js";
import { Scatter } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import { Box } from "@mui/material";

ChartJS.register(LinearScale, PointElement, Tooltip);

const generateHeatmapData = () => {
  // Example heatmap data
  const data = [];
  const rows = 24; // Number of rows
  const cols = 7; // Number of columns
  for (let x = 1; x <= cols; x++) {
    for (let y = 1; y <= rows; y++) {
      data.push({
        x,
        y,
        value: Math.floor(Math.random() * 100), // Random value between 0 and 100
      });
    }
  }
  return data;
};

const Heatmap = () => {
  const data = generateHeatmapData();

  const chartData = {
    datasets: [
      {
        label: "Heatmap",
        data: data.map(({ x, y, value }) => ({ x, y, r: value / 2 })), // Scale the radius
        backgroundColor: data.map(
          ({ value }) =>
            `rgba(255, ${255 - value * 2.5}, ${255 - value * 2.5}, 0.8)`
        ),
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.1)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        ticks: { stepSize: 1 },
      },
      y: {
        type: "linear",
        ticks: { stepSize: 1 },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Value: ${context.raw.r * 2}`;
          },
        },
      },
    },
  };

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        padding: 2,
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Scatter data={chartData} options={options} />
    </Box>
  );
};

export default Heatmap;
