import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Stack,
  Grid2,
  Box,
  useTheme,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import CircleIcon from "@mui/icons-material/Circle";
import Heatmap from "../components/HeatMap.tsx";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { tokens } from "../theme.tsx";
import { WatchlistEntry } from "../types.tsx";
import { useNavigate } from "react-router-dom";
import { userdata } from "../API/account.tsx";
import { fetchUserWatchlist } from "../API/watchlist.tsx";
import { fetchEvents } from "../API/searchEvents.tsx";

const API_URL = process.env.API_URL || "http://localhost:3000";

const AlertSystem = () => {
  const navigate = useNavigate();

  const [subscribedCDM, setSubscribedCDM] = useState([]);
  const [watchlist, setWatchlist] = useState<WatchlistEntry[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const token = localStorage.getItem("accountToken");
  //     if (!token) {
  //       navigate("/login");
  //       return;
  //     }
  //     try {
  //       const user = await userdata(token);
  //       const userId = user._id;
  //       const data = await fetchUserWatchlist(userId);
  //       setWatchlist(data);
  //     } catch (error) {
  //       console.error("Error fetching events:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // console.log(watchlist);
  // const [events, setEvents] = useState<Event[]>([]);

  // // console.log(watchlist[0]);

  // useEffect(() => {
  //   console.log(watchlist);
  //   const events = async () => {
  //     const data = await fetchEvents(
  //       watchlist[0].searchParams,
  //       watchlist[0].tcaRange
  //     );
  //     setEvents(data);
  //   };
  //   events();
  // }, [watchlist]);

  const [events, setEvents] = useState<Event[]>([]);

  const [eventsByFilter, setEventsByFilter] = useState<Record<string, Event[]>>(
    {}
  );

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accountToken");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const user = await userdata(token);
        const userId = user._id;

        // Step 1: Get the saved filters
        const filters = await fetchUserWatchlist(userId);
        setWatchlist(filters);

        // Step 2: For each filter, fetch events and associate them with filter ID
        const eventsByFilterEntries = await Promise.all(
          filters.map(async (filter) => {
            try {
              const eventData = await fetchEvents(
                filter.searchParams,
                filter.tcaRange
              );
              return [filter.createdAt, eventData]; // ✅ string key
            } catch (err) {
              console.error(
                `Error fetching events for filter ${filter._id}:`,
                err
              );
              return [filter._id, []];
            }
          })
        );

        // Step 3: Convert the array of entries into an object
        const eventsMap = Object.fromEntries(eventsByFilterEntries);
        console.log(eventsMap);
        setEventsByFilter(eventsMap); // ✅ your state holding filter-wise events
      } catch (error) {
        console.error("Error fetching filters or events:", error);
      }
    };

    fetchData();
  }, []);

  console.log(events);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const openModal = () => {
    handleOpen();
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h1" gutterBottom sx={{ paddingTop: "20px" }}>
        Alert System
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
        sx={{ paddingTop: "10px", paddingBottom: "20px" }}
      >
        OOCAA derives new Events for each CDM, and organizes all CDM's based on
        criterias such as number of events, or status of events. These are
        displayed in a heat map indicating the number of events per day of the
        week, and each hour an event is derived.
      </Typography>

      <Typography variant="h2" sx={{ paddingBottom: "20px" }}>
        Heatmap
      </Typography>
      <Heatmap />

      <Typography
        variant="h2"
        sx={{ paddingTop: "20px", paddingBottom: "10px" }}
      >
        CDM Alert Table
      </Typography>

      {watchlist.map((watchlistEntry, index) => (
        <>
          <Typography variant="h3" sx={{ margin: 0 }}>
            Add each specific query here
          </Typography>
          <TableContainer
            key={watchlistEntry.createdAt || index}
            component={Paper}
            sx={{
              backgroundColor: colors.primary[500],
              color: colors.primary[100],
              border: `1px solid ${colors.primary[700]}`,
              marginBottom: 4,
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>CDM</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Primary Object Designator</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Secondary Object Name</strong>
                  </TableCell>
                  <TableCell>
                    <strong>TCA[UTC]</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody data-testid="table-list">
                {eventsByFilter[watchlistEntry.createdAt]?.map((val: any) => (
                  <TableRow key={val._id}>
                    <TableCell>{val._id}</TableCell>
                    <TableCell>{val.primaryObjectDesignator}</TableCell>
                    <TableCell>{val.secondaryObjectDesignator}</TableCell>
                    <TableCell>{val.tca}</TableCell>
                  </TableRow>
                ))}

                {/* Modal should ideally not be repeated per row; pull it out if it's shared */}
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography variant="h2">Add Rationale</Typography>
                    <TextField
                      id="outlined-multiline-flexible"
                      multiline
                      maxRows={6}
                      sx={{ width: "100%" }}
                    />
                    <Button
                      variant="contained"
                      onClick={handleClose}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        mt: 2,
                      }}
                    >
                      Submit
                    </Button>
                  </Box>
                </Modal>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ))}
    </div>
  );
};

export default AlertSystem;
