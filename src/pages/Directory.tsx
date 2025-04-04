import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Paper,
  useTheme,
  Button,
  TextField,
  MenuItem,
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import StatCard from '../components/StatCard.tsx';
import SearchBar from '../components/SearchBar.tsx';
import TcaPicker from '../components/TCAPicker.tsx';
import CesiumViewer from '../components/CesiumViewer.tsx';
import { tokens } from '../theme.tsx';
import { fetchEvents } from '../API/searchEvents.tsx';
import { fetchTLEs } from '../API/fetchTLEs.tsx'; 
import { fetchCDMs } from '../API/fetchCDMs.tsx';
import { CDM } from '../types.tsx';
import { Event } from '../types.tsx';
import EventCharts from '../components/EventCharts.tsx';
import EventTable from '../components/EventTable.tsx';
import CDMTable from '../components/CDMTable.tsx';
import { useNavigate } from 'react-router-dom';


const Directory = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accountToken");
  console.log("token", token);
  if(!token){
      navigate('/login')
  }
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [searchBars, setSearchBars] = useState([{ id: 1, criteria: 'objectName', value: '' }]);
  const [tcaRange, setTcaRange] = useState<[number, number]>([
    new Date('2024-10-05').getTime(), 
    Date.now()
  ]); 
  const [events, setEvents] = useState<Event[]>([]);
  const [cdms, setCdms] = useState<CDM[]>([]);
  const [tles, setTles] = useState<{
    object1?: { designator: string; tleLine1: string; tleLine2: string };
    object2?: { designator: string; tleLine1: string; tleLine2: string };
  }>({});

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedCDM, setSelectedCDM] = useState<CDM | null>(null);

  const [tca, setTca] = useState(new Date().toISOString());

  const [errMsg, setErrMsg] = useState<string | null>(null);

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

  const handleTcaChange = (newRange: [number, number]) => {
    setTcaRange(newRange);
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
      setErrMsg('Please fill in all search fields');
      setTimeout(() => setErrMsg(null), 2900);
      // setEvents([]);
      // setCdms([]);
      // setSelectedEvent(null);
      // setSelectedCDM(null);
      // setTles({});
      return;
    }
    setErrMsg(null);
    try {
      const data = await fetchEvents(searchBars, tcaRange, {});
      if (data.length == 0) {
        setErrMsg('No search results found');
        setTimeout(() => setErrMsg(null), 2900);
      }
      setEvents(data);
      setSelectedCDM(null);
      setTles({});
      setSelectedEvent(null);
      setCdms([]);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const handleClickMessageId = async (cdm: CDM) => {
    try {
      const { object1, object2, tca } = cdm;
      const data = await fetchTLEs([object1.objectDesignator, object2.objectDesignator], tca);
      setTca(tca);
      
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
      setSelectedCDM(cdm);
    } catch (error) {
      console.error('Failed to fetch TLEs:', error);
    } 
  };

  const handleEventClick = async (eventItem: Event) => {
    try {
      const data = await fetchCDMs(eventItem._id);
      setSelectedEvent(eventItem);
      setCdms(data);
      setSelectedCDM(null);
      setTles({});
    } catch (error) {
      console.error('Failed to fetch CDMs for event:', error);
    }
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
          { label: 'On-orbit total', value: '15' },
          { label: 'Debris', value: '5' },
          { label: 'Payload', value: '10' },
          { label: 'Rocket Body', value: '0' },
          { label: 'Unknown/Other', value: '0' },
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

      {/* TCA Picker */}
      <TcaPicker 
        tcaRange={tcaRange} 
        onTcaChange={handleTcaChange} 
        onSearch={handleSearch} 
      />

      {errMsg && (
        <Box display="flex" alignItems="center" gap={1} mt={2}>
          <ErrorOutlineIcon color="error" />
          <Typography color="error">{errMsg}</Typography>
        </Box>
      )}

      {/* Search Results Table */}
      {events.length > 0 && (
      <EventTable events={events} selectedEvent={selectedEvent} onEventClick={handleEventClick} />
    )}
    
    {/* CDM table */}
    {cdms.length > 0 && (
      <Box mt={4}>
        <Typography variant="h4" mb={3}>
          Viewing CDMs for {selectedEvent ? selectedEvent.eventName : ''} : {selectedEvent ? selectedEvent.primaryObjectName : ''} & {selectedEvent ? selectedEvent.secondaryObjectName : ''}
        </Typography>
        <CDMTable cdms={cdms} selectedCDM={selectedCDM} onRowClick={handleClickMessageId} />
      </Box>
    )}

      {/* Detailed View for Selected CDM */}
      <Typography variant="h4" mb={3}>
        {selectedCDM ? `Viewing CDM: ${selectedCDM.messageId}` : ''}
      </Typography>
      {selectedCDM && (
      <Box display="flex" gap={2} mt={4}>
        
        {/* Object 1 Details */}
        <Paper sx={{ p: 3, flex: 1, backgroundColor: colors.primary[400] }}>
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
        <Paper sx={{ p: 3, flex: 1, backgroundColor: colors.primary[400] }}>
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
          <CesiumViewer tle1={tles.object1} tle2={tles.object2} tca={tca}/>
        </Box>
      )}

      {/* Graphs Section */}
      {cdms.length > 0 && (
        <Box mt={4}>
          <Typography variant="h4" mb={3}>
            Trends for Event: {selectedEvent ? selectedEvent.eventName : ''}
          </Typography>
          <EventCharts cdms={cdms} />
        </Box>
      )}

    </Box>
  );
};

export default Directory;

//try to get orbital paths
//dont log into spacetrack every single time u want tles