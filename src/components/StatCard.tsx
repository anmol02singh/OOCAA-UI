import React from 'react';
import { Box, Typography } from '@mui/material';

interface StatCardProps {
  value: string;
  label: string;
  backgroundColor: string;
  accentColor: string;
  textColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ value, label, backgroundColor, accentColor, textColor }) => {
  return (
    <Box
      textAlign="center"
      flex={1}
      sx={{
        backgroundColor,
        padding: '20px',
      }}
    >
      <Typography variant="h2" sx={{ color: accentColor }}>
        {value}
      </Typography>
      <Typography variant="subtitle1" sx={{ color: textColor }}>
        {label}
      </Typography>
    </Box>
  );
};

export default StatCard;
