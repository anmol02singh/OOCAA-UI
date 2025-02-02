import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  useTheme,
} from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import StatCard from '../components/StatCard.tsx';
import SearchBar from '../components/SearchBar.tsx';
import TcaSlider from '../components/TCASlider.tsx';
import CesiumViewer from '../components/CesiumViewer.tsx';
import { tokens } from '../theme.tsx';
import { fetchCDMs } from '../API/searchCDMs.tsx';
import { fetchTLEs } from '../API/fetchTLEs.tsx'; 
import { CDM } from '../types.tsx';

const Directory = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [searchBars, setSearchBars] = useState([{ id: 1, criteria: 'objectName', value: '' }]);
  const [tcaRange, setTcaRange] = useState([new Date('2024-10-05').getTime(), Date.now()]);
  const [searchResults, setSearchResults] = useState<CDM[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tles, setTles] = useState<{
    object1?: { designator: string; tleLine1: string; tleLine2: string };
    object2?: { designator: string; tleLine1: string; tleLine2: string };
  }>({});
  

  const [selectedCDM, setSelectedCDM] = useState<CDM | null>(null) 

  const handleAddSearchBar = () => {
    if (searchBars.length < 2) {
      setSearchBars([...searchBars, { id: searchBars.length + 1, criteria: 'objectName', value: '' }]);
    }
  };

  const handleRemoveSearchBar = () => {
    if (searchBars.length > 1) {
      setSearchBars(searchBars.slice(0, -1));
    }
  };

  const handleCriteriaChange = (id: number, criteria: string) => {
    setSearchBars((prev) =>
      prev.map((bar) =>
        bar.id === id ? { ...bar, criteria } : bar
      )
    );
  };

  const handleTcaChange = (event: Event, newValue: number | number[]) => {
    setTcaRange(newValue as number[]);
  };

  const handleValueChange = (id: number, value: string) => {
    setSearchBars((prev) =>
      prev.map((bar) =>
        bar.id === id ? { ...bar, value } : bar
      )
    );
  };

  const handleSearch = async () => {
    const hasEmptySearch = searchBars.some((bar) => bar.value.trim() === '');
    if (hasEmptySearch) {
      setSearchResults([]);
      setSelectedCDM(null);
      setTles({});
      return;
    }
    try {
      const data = await fetchCDMs(searchBars, tcaRange);
      setSearchResults(data);
      setSelectedCDM(null);
      setTles({});
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const handleClickMessageId = async (cdm: CDM) => {
    try {
      const { object1, object2, tca } = cdm;

      const data = await fetchTLEs([object1.objectDesignator, object2.objectDesignator], tca);
      if (data && data.length === 2) {
        setTles({
          object1: {
            designator: data[0].designator,
            tleLine1: data[0].tleLine1,
            tleLine2: data[0].tleLine2,
          },
          object2: {
            designator: data[1].designator,
            tleLine1: data[1].tleLine1,
            tleLine2: data[1].tleLine2,
          },
        });
      } else {
        console.error('Unexpected TLE data format:', data);
      } 
      console.log('Fetched TLEs:', tles.object1);
      setSelectedCDM(cdm);
    } catch (error) {
      console.error('Failed to fetch TLEs:', error);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box
      p={3}
      sx={{
        backgroundColor: theme.palette.background.default,
        color: colors.grey[100],
        minHeight: '100vh',
      }}
    >
      
      {/* Header */}
      <Typography variant="body1" sx={{ color: colors.grey[300], fontFamily: 'Arial, sans-serif' }}>
        62,998 searchable objects
      </Typography>
      <Typography variant="h3" fontWeight="bold" mt={1}>
        OOCAA - On-Orbit Collision Avoidance Assistant
      </Typography>
      <Typography variant="subtitle1" mt={2} mb={3}>
        OOCAA organizes Conjunction Data Messages (CDMs) into clear formats, enabling quick data analysis with advanced search and filters.
      </Typography>

      {/* Stat Cards */}
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
          />
        ))}
      </Box>

      {/* Search Bars */}
      {searchBars.map((bar) => (
        <SearchBar
          key={bar.id}
          criteria={bar.criteria}
          value={bar.value}
          onCriteriaChange={(value) => handleCriteriaChange(bar.id, value)}
          onValueChange={(value) => handleValueChange(bar.id, value)}
          onSearch={handleSearch}
          backgroundColor={colors.primary[400]}
          textColor={colors.grey[100]}
        />
      ))}

      {/* Add/Remove Search Bars */}
      <Box display="flex" justifyContent="center" mt={2}>
        {searchBars.length === 1 && (
          <IconButton onClick={handleAddSearchBar} sx={{ color: colors.grey[100] }}>
            <AddCircleOutlineOutlinedIcon />
          </IconButton>
        )}
        {searchBars.length === 2 && (
          <IconButton onClick={handleRemoveSearchBar} sx={{ color: colors.grey[100] }}>
            <RemoveCircleOutlineOutlinedIcon />
          </IconButton>
        )}
      </Box>

      {/* TCA Slider */}
      <TcaSlider
        tcaRange={tcaRange}
        onTcaChange={handleTcaChange}
        min={new Date('2024-10-05').getTime()}
        max={Date.now()}
        step={3600000}
        accentColor={colors.blueAccent[700]}
      />

      {/* Search Results Table */}
      {searchResults.length > 0 && (
      <Box mt={4}>
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: colors.primary[500],
            color: colors.grey[100],
          }}
        >
          <Table>
            <TableHead
              sx={{
                '& .MuiTableCell-root': {
                  fontSize: '0.9rem',
                },
              }}
            >
              <TableRow>
                <TableCell>Message ID</TableCell>
                <TableCell>Creation Date [UTC]</TableCell>
                <TableCell>Time of Closest Approach [UTC]</TableCell>
                <TableCell>Miss Distance [m]</TableCell>
                <TableCell>Collision Probability</TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                '& .MuiTableCell-root': {
                  fontSize: '0.85rem',
                },
              }}
            >
              {searchResults
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((cdm, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: colors.primary[600], // Optional hover effect
                      },
                    }}
                    onClick={() => handleClickMessageId(cdm)}
                  >
                    <TableCell>{cdm.messageId}</TableCell>
                    <TableCell>{new Date(cdm.creationDate).toISOString()}</TableCell>
                    <TableCell>{new Date(cdm.tca).toISOString()}</TableCell>
                    <TableCell>{cdm.missDistance.toFixed(2)}</TableCell>
                    <TableCell>{cdm.collisionProbability.toExponential(2)}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={searchResults.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    )}

      {/* Detailed View for Selected CDM */}
      {selectedCDM && (
      <Box display="flex" gap={2} mt={4}>
        {/* Object 1 Details */}
        <Paper sx={{ p: 3, flex: 1, backgroundColor: colors.primary[500] }}>
          <Typography variant="h4" fontWeight="bold" mb={2}>
            {selectedCDM.object1.objectName} Details
          </Typography>
          {[
            { label: 'Launch Date', value: selectedCDM.object1.internationalDesignator },
            { label: 'Creation Date', value: new Date(selectedCDM.creationDate).toISOString() },
            { label: 'TCA', value: new Date(selectedCDM.tca).toISOString() },
            { label: 'Miss Distance', value: `${selectedCDM.missDistance} m` },
            { label: 'Collision Probability', value: selectedCDM.collisionProbability },
            { label: 'Object Designator', value: selectedCDM.object1.objectDesignator },
            { label: 'Object Type', value: selectedCDM.object1.objectType },
            { label: 'Operator Organization', value: selectedCDM.object1.operatorOrganization },
          ].map((item, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent="space-between"
              sx={{
                fontSize: '0.9rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                py: 0.5,
              }}
            >
              <Typography sx={{ fontWeight: 'bold' }}>{item.label}:</Typography>
              <Typography sx={{ textAlign: 'right' }}>{item.value}</Typography>
            </Box>
          ))}
        </Paper>

        {/* Object 2 Details */}
        <Paper sx={{ p: 3, flex: 1, backgroundColor: colors.primary[500] }}>
          <Typography variant="h4" fontWeight="bold" mb={2}>
            {selectedCDM.object2.objectName} Details
          </Typography>
          {[
            { label: 'Launch Date', value: selectedCDM.object2.internationalDesignator },
            { label: 'Creation Date', value: new Date(selectedCDM.creationDate).toISOString() },
            { label: 'TCA', value: new Date(selectedCDM.tca).toISOString() },
            { label: 'Miss Distance', value: `${selectedCDM.missDistance} m` },
            { label: 'Collision Probability', value: selectedCDM.collisionProbability },
            { label: 'Object Designator', value: selectedCDM.object2.objectDesignator },
            { label: 'Object Type', value: selectedCDM.object2.objectType },
            { label: 'Operator Organization', value: selectedCDM.object2.operatorOrganization },
          ].map((item, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent="space-between"
              sx={{
                fontSize: '0.9rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                py: 0.5,
              }}
            >
              <Typography sx={{ fontWeight: 'bold' }}>{item.label}:</Typography>
              <Typography sx={{ textAlign: 'right' }}>{item.value}</Typography>
            </Box>
          ))}
        </Paper>
      </Box>
      )}
      {/* Cesium Viewer */}
      {tles && tles.object1 && tles.object2 && (
        <Box mt={4}>
          <CesiumViewer tle1={tles.object1} tle2={tles.object2} />
        </Box>
      )}
    </Box>
  );
};

export default Directory;


//sort table via creation date? tca?
//date and time picker, and then slider to go in the future
//make table a separate component
//make detailed view a separate component
