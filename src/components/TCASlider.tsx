import React from "react";
import { Box, Typography, Slider } from "@mui/material";

interface TcaSliderProps {
  tcaRange: number[];
  onSliderChange: (event: Event, newValue: number | number[]) => void;
}

const TcaSlider: React.FC<TcaSliderProps> = ({ tcaRange, onSliderChange }) => {
  return (
    <Box sx={{ mt: 4, px: 1 }}>
      <Typography
        sx={{
          color: "#B0B0B0",
          mb: 1,
          fontSize: "1.1rem",
        }}
      >
        Filter by TCA
      </Typography>
      <Slider
        value={tcaRange}
        onChange={onSliderChange}
        valueLabelDisplay="auto"
        min={0}
        max={24}
        sx={{
          color: "#2979FF",
        }}
      />
      <Typography
        variant="body2"
        sx={{
          color: "#B0B0B0",
          mt: 1,
        }}
      >
        Range: {tcaRange[0]} - {tcaRange[1]} hours
      </Typography>
    </Box>
  );
};

export default TcaSlider;
