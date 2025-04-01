import React from "react";
import { Chart as ChartJS, LinearScale, Tooltip, PointElement } from "chart.js";
import { Scatter } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import { Box } from "@mui/material";

ChartJS.register(LinearScale, PointElement, Tooltip);

type HeatMapData = {
  x: number;
  y: number;
  value: number;
};

const generateHeatmapData = () => {
  const data: HeatMapData[] = [];
  const rows = 24;
  const cols = 7;
  for (let x = 1; x <= cols; x++) {
    for (let y = 1; y <= rows; y++) {
      data.push({
        x,
        y,
        value: Math.floor(Math.random() * 50), // Random value between 0 and 50
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
        data: data.map(({ x, y, value }) => ({ x, y, r: value / 2 })), // Scale radius based on values
        backgroundColor: data.map(
          ({ value }) =>
            `rgba(255, ${255 - value * 5}, ${255 - value * 5}, 0.8)`
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
        ticks: {
          stepSize: 1,
          color: "#fff", // Darker text color
          callback: (value: number) => {
            const daysOfWeek = [
              "Mon",
              "Tue",
              "Wed",
              "Thu",
              "Fri",
              "Sat",
              "Sun",
            ];
            return daysOfWeek[value - 1] || "";
          },
        },
        grid: {
          color: "rgba(200, 200, 200, 0.8)",
          lineWidth: 1,
        },
      },
      y: {
        type: "linear",
        ticks: {
          stepSize: 1,
          color: "#fff", // Darker text color
          callback: (value: number) => {
            return `${String(value - 1).padStart(2, "0")}:00`;
          },
        },
        grid: {
          color: "rgba(200, 200, 200, 0.8)",
          lineWidth: 1,
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const daysOfWeek = [
              "Mon",
              "Tue",
              "Wed",
              "Thu",
              "Fri",
              "Sat",
              "Sun",
            ];
            const day = daysOfWeek[context.raw.x - 1];
            const time = `${String(context.raw.y - 1).padStart(2, "0")}:00`;
            const value = context.raw.r * 2;
            return `Day: ${day}, Time: ${time}, Value: ${value}`;
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
      }}
    >
      <Scatter data={chartData} options={options} />
    </Box>
  );
};

export default Heatmap;
