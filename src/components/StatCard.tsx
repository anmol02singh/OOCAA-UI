import React from 'react';
import { Box, Typography } from '@mui/material';

interface StatCardProps {
  value: string;
  label: string;
  backgroundColor: string;
  accentColor: string;
  textColor: string;
  borderColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ value, label, backgroundColor, accentColor, textColor, borderColor }) => {
  return (
    <Box
      textAlign="center"
      flex={1}
      style={{
        backgroundColor,
        padding: '20px',
        border: `1px solid ${borderColor}`,
      }}
    >
      <Typography variant="h2" style={{ color: accentColor }}>
        {value}
      </Typography>
      <Typography variant="subtitle1" style={{ color: textColor }}>
        {label}
      </Typography>
    </Box>
  );
};

export default StatCard;
