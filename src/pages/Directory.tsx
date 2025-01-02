import React, { useState } from 'react';
import { Box, Typography, IconButton, useTheme } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import StatCard from '../components/StatCard.tsx';
import SearchBar from '../components/SearchBar.tsx';
import TcaSlider from '../components/TCASlider.tsx';
import CesiumViewer from '../components/CesiumViewer.tsx';
import { tokens } from "../theme.tsx";

const Directory = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const colors = {
  //   primary: theme.palette.mode === 'dark' ? '#121212' : '#ffffff',
  //   textPrimary: theme.palette.mode === 'dark' ? '#ffffff' : '#121212',
  //   accent: '#6A5ACD',
  //   searchBackground: '#2C2C2C',
  //   searchText: '#ffffff',
  //   searchBorder: '#555555',
  // };


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
    <Box p={3} style={{ backgroundColor: colors.primary[500], color: colors.grey[100], minHeight: '100vh' }}>
      <Typography
            variant="body1"
            sx={{
              color: colors.grey[300],
              fontFamily: "Arial, sans-serif",
            }}
          >
            62,998 searchable objects
          </Typography>
      <Typography variant="h3" fontWeight="bold" mt={1}>
        OOCAA — On-Orbit Collision Avoidance Assistant
      </Typography>
      <Typography variant="subtitle1" mt={2} mb={3}>
      OOCAA organizes Conjunction Data Messages (CDMs) into clear formats, enabling quick data analysis with advanced search and filters.
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
            backgroundColor={colors.primary[400]}
            accentColor={colors.grey[100]}
            textColor={colors.greenAccent[500]}
            borderColor="#535b6c"
          />
        ))}
      </Box>

      {searchBars.map((bar, index) => (
        <SearchBar
          key={bar.id}
          criteria={bar.criteria}
          onCriteriaChange={(value) => handleCriteriaChange(bar.id, value)}
          backgroundColor={colors.primary[400]}
          textColor={colors.grey[100]}
          borderColor="#535b6c"
        />
      ))}

      <Box display="flex" justifyContent="center" mt={2}>
        {searchBars.length === 1 && (
          <IconButton onClick={handleAddSearchBar} style={{ color: colors.grey[100] }}>
            <AddCircleOutlineOutlinedIcon />
          </IconButton>
        )}
        {searchBars.length === 2 && (
          <IconButton onClick={handleRemoveSearchBar} style={{ color: colors.grey[100] }}>
            <RemoveCircleOutlineOutlinedIcon />
          </IconButton>
        )}
      </Box>

      <TcaSlider
        tcaRange={tcaRange}
        onTcaChange={handleTcaChange}
        min={new Date('2024-10-05').getTime()}
        max={Date.now()}
        step={3600000}
        accentColor={colors.blueAccent[700]}
      />
      {/* <Box sx={{ mt: 6 }}>
          <Typography
            variant="h6"
            sx={{
              color: "#B0B0B0",
              mb: 2,
            }}
          >
            Orbital Visualization
          </Typography>
          <CesiumViewer />
      </Box> */}
    </Box>
  );
};

export default Directory;
