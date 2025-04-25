import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Paper,
  useTheme,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import StatCard from "../components/StatCard.tsx";
import SearchBar from "../components/SearchBar.tsx";
import TcaPicker from "../components/TCAPicker.tsx";
import CesiumViewer from "../components/CesiumViewer.tsx";
import { tokens } from "../theme.tsx";
import { fetchEvents } from "../API/searchEvents.tsx";
import { fetchTLEs } from "../API/fetchTLEs.tsx";
import { fetchCDMs, fetchCounts } from "../API/fetchCDMs.tsx";
import { getEvents } from "../API/getEvents.tsx";
import { CDM, ObjectTypeCounts, Event, Account } from "../types.tsx";
import EventCharts from "../components/EventCharts.tsx";
import EventTable from "../components/EventTable.tsx";
import EventFilters, { ExtraFilters } from "../components/EventFilters.tsx";
import CDMTable from "../components/CDMTable.tsx";
import { subscribeToCriteria } from "../API/watchlist.tsx";
import { userdata } from "../API/account.tsx";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import FullCdmModal from "../components/FullCDMView.tsx";

const Directory = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accountToken");
  if (!token) {
    navigate("/login");
  }
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const pageContainer: React.CSSProperties = {
      width: '99.8%',
      height: 'auto',
      backgroundColor: colors.primary[500],
      overflowX: 'hidden',
      overflowY: 'auto',
      padding: '2rem',
      flexGrow: 1,
      minWidth: 0,
  };

  const [searchBars, setSearchBars] = useState([
    { id: 1, criteria: "objectName", value: "" },
  ]);
  const [tcaRange, setTcaRange] = useState<[number, number]>([
    new Date("2024-10-05").getTime(),
    Date.now(),
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

  const [extraFilters, setExtraFilters] = useState<ExtraFilters>({
    missDistanceValue: undefined,
    missDistanceOperator: "lte",
    collisionProbabilityValue: undefined,
    collisionProbabilityOperator: "gte",
    operatorOrganization: "",
  });

  const [errMsg, setErrMsg] = useState<string | null>(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const initialStats: ObjectTypeCounts = {
    total: 0,
    payload: 0,
    debris: 0,
    rocketBody: 0,
    unknown: 0,
    other: 0,
  };

  const [stats, setStats] = useState<ObjectTypeCounts>(initialStats);

  const [user, setUser] = useState<Account | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEvents();
        if (data.length === 0) {
          setErrMsg("No events found");
          setTimeout(() => setErrMsg(null), 2900);
        }
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
        setErrMsg("Error fetching events");
        setTimeout(() => setErrMsg(null), 2900);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    fetchCounts()
      .then((data) => setStats(data))
      .catch((err) => {
        console.error(err);
        setErrMsg("Failed to load Statistics");
        setTimeout(() => setErrMsg(null), 2900);
      });
  }, []);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("accountToken");
      if (!token) {
        navigate("/login");
        return;
      }
      const u = await userdata(token);
      setUser(u);
    })();
  }, []);

  const handleAddSearchBar = () => {
    if (searchBars.length < 2) {
      setSearchBars([
        ...searchBars,
        { id: searchBars.length + 1, criteria: "objectName", value: "" },
      ]);
    }
  };

  const handleRemoveSearchBar = () => {
    if (searchBars.length > 1) {
      setSearchBars(searchBars.slice(0, -1));
    }
  };

  const handleCriteriaChange = (id: number, criteria: string) => {
    setSearchBars((prev) =>
      prev.map((bar) => (bar.id === id ? { ...bar, criteria } : bar))
    );
  };

  const handleTcaChange = (newRange: [number, number]) => {
    setTcaRange(newRange);
  };

  const handleValueChange = (id: number, value: string) => {
    setSearchBars((prev) =>
      prev.map((bar) => (bar.id === id ? { ...bar, value } : bar))
    );
  };

  const handleSearch = async () => {
    try {
      const data = await fetchEvents(searchBars, tcaRange, extraFilters);
      if (data.length == 0) {
        setErrMsg("No search results found");
        setTimeout(() => setErrMsg(null), 2900);
      }
      if (
        searchBars.length > 1 &&
        searchBars.some((bar) => bar.value.trim() === "")
      ) {
        setErrMsg("Please Enter Another Object or Remove a Search Bar");
        setTimeout(() => setErrMsg(null), 2900);
        return;
      }
      setEvents(data);
      setSelectedCDM(null);
      setTles({});
      setSelectedEvent(null);
      setCdms([]);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  const handleClickMessageId = async (cdm: CDM) => {
    try {
      const { object1, object2, tca } = cdm;
      const data = await fetchTLEs(
        [object1.objectDesignator, object2.objectDesignator],
        tca
      );
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
        console.error("Unexpected TLE data format:", data);
      }
      setSelectedCDM(cdm);
    } catch (error) {
      console.error("Failed to fetch TLEs:", error);
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
      console.error("Failed to fetch CDMs for event:", error);
    }
  };

  const handleSubscribe = async () => {
    if (
      searchBars.length > 1 &&
      searchBars.some((bar) => bar.value.trim() === "")
    ) {
      setSnackbarMessage("Please Enter Another Object or Remove a Search Bar");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    const token = localStorage.getItem("accountToken");
    if (!token) {
      navigate("/login");
      return;
    }
    const user = await userdata(token);
    const userId = user._id;
    try {
      const events = await fetchEvents(searchBars, tcaRange, extraFilters);
      if (!events || events.length === 0) {
        setSnackbarMessage("No Events Exist for the Current Filter Criteria");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }
      await subscribeToCriteria(userId, searchBars, tcaRange, extraFilters);
      setSnackbarMessage(
        "Successfully Subscribed to the Current Filter Criteria"
      );
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error subscribing to criteria:", error);
      setSnackbarMessage(
        "You Have Already Subscribed to the Current Filter Criteria"
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const canViewFull = user?.roleNum !== undefined && user.roleNum <= 1;

  return (
    <Box
      // p={3}
      // sx={{
      //   backgroundColor: theme.palette.background.default,
      //   color: colors.grey[100],
      //   minHeight: '100vh',
      // }}
      sx={pageContainer}
    >
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      {/* Header */}
      <Typography
        variant="body1"
        sx={{ color: colors.grey[300], fontFamily: "Arial, sans-serif" }}
      >
        {`${stats.total}`} searchable objects
      </Typography>
      <Typography variant="h3" fontWeight="bold" mt={1}>
        Directory
      </Typography>
      <Typography variant="subtitle1" mt={2} mb={3}>
        Filter thousands of Conjunction Data Messages (CDMs) into clear formats,
        enabling quick data analysis with advanced search and filters.
      </Typography>

      {/* Stat Cards */}
      <Box display="flex" justifyContent="space-between" gap={2} mb={3}>
        {[
          { label: "On-orbit total", value: stats.total },
          { label: "Debris", value: stats.debris },
          { label: "Payload", value: stats.payload },
          { label: "Rocket Body", value: stats.rocketBody },
          { label: "Unknown/Other", value: stats.unknown + stats.other },
        ].map((stat, index) => (
          <StatCard
            key={index}
            value={stat.value.toString()}
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
          backgroundColor={colors.primary[400]}
          textColor={colors.grey[100]}
        />
      ))}

      {/* Add/Remove Search Bars */}
      <Box display="flex" justifyContent="center" mt={2}>
        {searchBars.length === 1 && (
          <IconButton
            onClick={handleAddSearchBar}
            sx={{ color: colors.grey[100] }}
          >
            <AddCircleOutlineOutlinedIcon />
          </IconButton>
        )}
        {searchBars.length === 2 && (
          <IconButton
            onClick={handleRemoveSearchBar}
            sx={{ color: colors.grey[100] }}
          >
            <RemoveCircleOutlineOutlinedIcon />
          </IconButton>
        )}
      </Box>

      {/* Extra Filters */}
      <EventFilters filters={extraFilters} setFilters={setExtraFilters} />

      {/* TCA Picker */}
      <TcaPicker
        tcaRange={tcaRange}
        onTcaChange={handleTcaChange}
        onSearch={handleSearch}
        onSubscribe={handleSubscribe}
      />

      {errMsg && (
        <Box display="flex" alignItems="center" gap={1} mt={2}>
          <ErrorOutlineIcon color="error" />
          <Typography color="error">{errMsg}</Typography>
        </Box>
      )}

      {/* Search Results (Events) Table */}
      {events.length > 0 && (
        <EventTable
          events={events}
          selectedEvent={selectedEvent}
          onEventClick={handleEventClick}
        />
      )}

      {/* CDM table */}
      {cdms.length > 0 && (
        <Box mt={4}>
          <Typography variant="h4" mb={3}>
            Viewing CDMs for {selectedEvent ? selectedEvent.eventName : ""} :{" "}
            {selectedEvent ? selectedEvent.primaryObjectName : ""} &{" "}
            {selectedEvent ? selectedEvent.secondaryObjectName : ""}
          </Typography>
          <CDMTable
            cdms={cdms}
            selectedCDM={selectedCDM}
            onRowClick={handleClickMessageId}
          />
        </Box>
      )}

      {/* Detailed View for Selected CDM */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4">
          {selectedCDM ? `Viewing CDM: ${selectedCDM.messageId}` : ""}
        </Typography>
        {selectedCDM && canViewFull && (
          <Button
            variant="outlined"
            onClick={() => setModalOpen(true)}
            sx={{
              backgroundColor: colors.primary[400],
              color: colors.grey[100],
              fontWeight: "bold",
              padding: "0.5rem 1rem",
            }}
          >
            View Full CDM
          </Button>
        )}
      </Box>

      {selectedCDM && (
        <Box display="flex" gap={2} mt={4}>
          {/* Object 1 Details */}
          <Paper sx={{ p: 3, flex: 1, backgroundColor: colors.primary[400] }}>
            <Typography variant="h4" fontWeight="bold" mb={2}>
              {selectedCDM.object1.objectName} Details
            </Typography>
            {[
              {
                label: "Launch Date",
                value: selectedCDM.object1.internationalDesignator,
              },
              {
                label: "Creation Date",
                value: new Date(selectedCDM.creationDate).toISOString(),
              },
              { label: "TCA", value: new Date(selectedCDM.tca).toISOString() },
              {
                label: "Miss Distance",
                value: `${selectedCDM.missDistance} m`,
              },
              {
                label: "Collision Probability",
                value: selectedCDM.collisionProbability,
              },
              {
                label: "Object Designator",
                value: selectedCDM.object1.objectDesignator,
              },
              { label: "Object Type", value: selectedCDM.object1.objectType },
              {
                label: "Operator Organization",
                value: selectedCDM.object1.operatorOrganization,
              },
            ].map((item, index) => (
              <Box
                key={index}
                display="flex"
                justifyContent="space-between"
                sx={{
                  fontSize: "0.9rem",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                  py: 0.5,
                }}
              >
                <Typography sx={{ fontWeight: "bold" }}>
                  {item.label}:
                </Typography>
                <Typography sx={{ textAlign: "right" }}>
                  {item.value}
                </Typography>
              </Box>
            ))}
          </Paper>

          {/* Object 2 Details */}
          <Paper sx={{ p: 3, flex: 1, backgroundColor: colors.primary[400] }}>
            <Typography variant="h4" fontWeight="bold" mb={2}>
              {selectedCDM.object2.objectName} Details
            </Typography>
            {[
              {
                label: "Launch Date",
                value: selectedCDM.object2.internationalDesignator,
              },
              {
                label: "Creation Date",
                value: new Date(selectedCDM.creationDate).toISOString(),
              },
              { label: "TCA", value: new Date(selectedCDM.tca).toISOString() },
              {
                label: "Miss Distance",
                value: `${selectedCDM.missDistance} m`,
              },
              {
                label: "Collision Probability",
                value: selectedCDM.collisionProbability,
              },
              {
                label: "Object Designator",
                value: selectedCDM.object2.objectDesignator,
              },
              { label: "Object Type", value: selectedCDM.object2.objectType },
              {
                label: "Operator Organization",
                value: selectedCDM.object2.operatorOrganization,
              },
            ].map((item, index) => (
              <Box
                key={index}
                display="flex"
                justifyContent="space-between"
                sx={{
                  fontSize: "0.9rem",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                  py: 0.5,
                }}
              >
                <Typography sx={{ fontWeight: "bold" }}>
                  {item.label}:
                </Typography>
                <Typography sx={{ textAlign: "right" }}>
                  {item.value}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Box>
      )}

      {/* full-json modal */}
      {selectedCDM && (
        <FullCdmModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          cdm={selectedCDM}
        />
      )}

      {/* Cesium Viewer */}
      {tles && tles.object1 && tles.object2 && (
        <Box mt={4}>
          <CesiumViewer tle1={tles.object1} tle2={tles.object2} tca={tca} />
        </Box>
      )}

      {/* Graphs Section */}
      {cdms.length > 0 && (
        <Box mt={4}>
          <Typography variant="h4" mb={3}>
            Trends for Event: {selectedEvent ? selectedEvent.eventName : ""}
          </Typography>
          <EventCharts cdms={cdms} />
        </Box>
      )}
    </Box>
  );
};

export default Directory;