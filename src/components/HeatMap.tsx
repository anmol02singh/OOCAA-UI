import React, { useEffect, useState } from "react";
import { Chart as ChartJS, LinearScale, Tooltip, PointElement } from "chart.js";
import { Scatter } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import { Box } from "@mui/material";
import moment from "moment";

ChartJS.register(LinearScale, PointElement, Tooltip);

type HeatMapData = {
  x: number;
  y: number;
  value: number;
};

type HeatmapProps = {
  foundCDMs: any[];
  colors: any;
};

const Heatmap = ({ foundCDMs, colors }: HeatmapProps) => {
  const data: any = [];

  const now = moment();
  const currentDay = now.format("dddd");

  const weekBegin = now.clone().startOf("week");
  const weekend = now.clone().add(1, "week").startOf("week");

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  console.log(foundCDMs);

  const hourDict = {};

  for (let i = 0; i < 24; i++) {
    const hourKey = i.toString().padStart(2, "0") + ":00";
    hourDict[hourKey] = 0;
  }

  const heatMapData = {};

  daysOfWeek.map((day) => {
    heatMapData[day] = { ...hourDict };
  });

  foundCDMs.forEach((tcaVal) => {
    const dayOfWeek = moment(tcaVal).utc().format("dddd");
    const roundedHour = moment(tcaVal).utc().startOf("hour").format("HH:mm");

    heatMapData[dayOfWeek][roundedHour] += 1;
  });

  Object.keys(heatMapData).forEach((key) => {
    let dayVal = 1;
    if (key === "Monday") dayVal = 1;
    else if (key === "Tuesday") dayVal = 2;
    else if (key === "Wednesday") dayVal = 3;
    else if (key === "Thursday") dayVal = 4;
    else if (key === "Friday") dayVal = 5;
    else if (key === "Saturday") dayVal = 6;
    else if (key === "Sunday") dayVal = 7;

    Object.keys(heatMapData[key]).forEach((keys) => {
      const formattedTime = parseInt(keys.replace(":00", ""), 10);
      data.push({ x: dayVal, y: formattedTime, value: heatMapData[key][keys] });
    });
  });

  const chartData = {
    datasets: [
      {
        label: "Heatmap",
        data: data.map(({ x, y, value }) => ({ x, y, r: value / 2 })),
        backgroundColor: data.map(({ x, value }) => {
          return `rgba(255, ${255 - value * 40}, ${255 - value * 40}, 0.8)`;
        }),
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
          color: colors.grey[100],
          callback: (value: number) => {
            const daysOfWeek = [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ];
            const dayLabel = daysOfWeek[value - 1];

            if (dayLabel === currentDay) {
              return `${currentDay} (Current)`;
            }

            return dayLabel || "";
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
          color: colors.grey[100],
          callback: (value: number) => {
            return `${String(value).padStart(2, "0")}:00`;
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
            const time = `${String(context.raw.y).padStart(2, "0")}:00`;
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
