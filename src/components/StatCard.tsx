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
      style={{
        backgroundColor,
        padding: '20px',
        borderRadius: '8px',
      }}
    >
      <Typography variant="h3" style={{ color: accentColor }}>
        {value}
      </Typography>
      <Typography variant="subtitle2" style={{ color: textColor }}>
        {label}
      </Typography>
    </Box>
  );
};

export default StatCard;
