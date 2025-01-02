import React from 'react';
import { Box, Typography, Slider } from '@mui/material';

interface TcaSliderProps {
  tcaRange: number[];
  onTcaChange: (event: Event, newValue: number | number[]) => void;
  min: number;
  max: number;
  step: number;
  accentColor: string;
}

const TcaSlider: React.FC<TcaSliderProps> = ({
  tcaRange,
  onTcaChange,
  min,
  max,
  step,
  accentColor,
}) => {
  const formatTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toISOString().replace('T', ' ').split('.')[0];
  };

  return (
    <Box mt={4}>
      <Typography variant="h5" mb={2}>
        Filter by TCA Range: {formatTimestamp(tcaRange[0])} to {formatTimestamp(tcaRange[1])}
      </Typography>
      <Slider
        value={tcaRange}
        onChange={onTcaChange}
        // valueLabelDisplay="auto"
        min={min}
        max={max}
        step={step}
        sx={{ color: accentColor }}
      />
    </Box>
  );
};

export default TcaSlider;
