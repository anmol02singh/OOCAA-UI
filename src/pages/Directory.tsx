import React, { useState } from 'react';
import { Box, Typography, IconButton, useTheme } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import StatCard from '../components/StatCard.tsx';
import SearchBar from '../components/SearchBar.tsx';
import TcaSlider from '../components/TCASlider.tsx';

const Directory = () => {
  const theme = useTheme();
  const colors = {
    primary: theme.palette.mode === 'dark' ? '#121212' : '#ffffff',
    textPrimary: theme.palette.mode === 'dark' ? '#ffffff' : '#121212',
    accent: '#6A5ACD',
    searchBackground: '#2C2C2C',
    searchText: '#ffffff',
    searchBorder: '#555555',
  };

  const [searchBars, setSearchBars] = useState([{ id: 1, criteria: 'name' }]);
  const [tcaRange, setTcaRange] = useState([new Date('2024-10-05').getTime(), Date.now()]);

  const handleAddSearchBar = () => {
    if (searchBars.length < 2) {
      setSearchBars([...searchBars, { id: searchBars.length + 1, criteria: 'name' }]);
    }
  };

  const handleRemoveSearchBar = () => {
    if (searchBars.length > 1) {
      setSearchBars(searchBars.slice(0, -1));
    }
  };

  const handleCriteriaChange = (id: number, value: string) => {
    setSearchBars(
      searchBars.map((bar) => (bar.id === id ? { ...bar, criteria: value } : bar))
    );
  };

  const handleTcaChange = (event: Event, newValue: number | number[]) => {
    setTcaRange(newValue as number[]);
  };

  return (
    <Box p={3} style={{ backgroundColor: colors.primary, color: colors.textPrimary, minHeight: '100vh' }}>
      <Typography variant="h4" fontWeight="bold">
        Satcat — Spaceflight Intelligence Exchange
      </Typography>
      <Typography variant="subtitle1" mt={1} mb={3}>
        Explore real-time satellite data, debris, and space weather with Satcat
      </Typography>

      <Box display="flex" justifyContent="space-between" gap={2} mb={3}>
        {[
          { label: 'On-orbit total', value: '31,086' },
          { label: 'Debris', value: '15,797' },
          { label: 'Payload', value: '13,585' },
          { label: 'Analyst/Experimental', value: '764' },
          { label: 'Unknown/Unidentified', value: '619' },
        ].map((stat, index) => (
          <StatCard
            key={index}
            value={stat.value}
            label={stat.label}
            backgroundColor={colors.searchBackground}
            accentColor={colors.accent}
            textColor={colors.searchText}
          />
        ))}
      </Box>

      {searchBars.map((bar, index) => (
        <SearchBar
          key={bar.id}
          criteria={bar.criteria}
          onCriteriaChange={(value) => handleCriteriaChange(bar.id, value)}
          backgroundColor={colors.searchBackground}
          textColor={colors.searchText}
          borderColor={colors.searchBorder}
        />
      ))}

      <Box display="flex" justifyContent="center" mt={2}>
        {searchBars.length === 1 && (
          <IconButton onClick={handleAddSearchBar} style={{ color: colors.textPrimary }}>
            <AddCircleIcon />
          </IconButton>
        )}
        {searchBars.length === 2 && (
          <IconButton onClick={handleRemoveSearchBar} style={{ color: colors.textPrimary }}>
            <RemoveCircleIcon />
          </IconButton>
        )}
      </Box>

      <TcaSlider
        tcaRange={tcaRange}
        onTcaChange={handleTcaChange}
        min={new Date('2024-10-05').getTime()}
        max={Date.now()}
        step={3600000}
        accentColor={colors.accent}
      />
    </Box>
  );
};

export default Directory;
