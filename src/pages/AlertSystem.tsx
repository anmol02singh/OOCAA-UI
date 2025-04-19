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
  Box,
  useTheme,
} from "@mui/material";
import Heatmap from "../components/HeatMap.tsx";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { tokens } from "../theme.tsx";
import { WatchlistEntry } from "../types.tsx";
import { useNavigate } from "react-router-dom";
import { userdata } from "../API/account.tsx";
import { fetchUserWatchlist } from "../API/watchlist.tsx";
import { fetchEvents } from "../API/searchEvents.tsx";

const AlertSystem = () => {
  const navigate = useNavigate();

  const [watchlist, setWatchlist] = useState<WatchlistEntry[]>([]);
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

        const filters = await fetchUserWatchlist(userId);
        setWatchlist(filters);

        const eventsByFilterEntries = await Promise.all(
          filters.map(async (filter) => {
            try {
              const eventData = await fetchEvents(
                filter.searchParams,
                filter.tcaRange,
                {
                  missDistanceValue: filter.missDistanceValue,
                  missDistanceOperator: filter.missDistanceOperator,
                  collisionProbabilityValue: filter.collisionProbabilityValue,
                  collisionProbabilityOperator:
                    filter.collisionProbabilityOperator,
                  operatorOrganization: filter.operatorOrganization,
                }
              );
              return [filter.createdAt, eventData];
            } catch (err) {
              console.error(
                `Error fetching events for filter ${filter._id}:`,
                err
              );
              return [filter._id, []];
            }
          })
        );

        const eventsMap = Object.fromEntries(eventsByFilterEntries);
        setEventsByFilter(eventsMap);
      } catch (error) {
        console.error("Error fetching filters or events:", error);
      }
    };

    fetchData();
  }, []);

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
          <Paper
            sx={{
              padding: 2,
              marginBottom: 2,
              backgroundColor: colors.primary[600],
            }}
          >
            <Typography variant="h3" gutterBottom>
              Query Parameters
            </Typography>

            {watchlistEntry.searchParams.map((param, i) => (
              <Typography variant="body1" key={param.id}>
                • <strong>{param.criteria}:</strong> {param.value}
              </Typography>
            ))}

            <Typography variant="body1" sx={{ marginTop: 1 }}>
              • <strong>Miss Distance:</strong>{" "}
              {watchlistEntry.missDistanceOperator}{" "}
              {watchlistEntry.missDistanceValue ?? "N/A"} km
            </Typography>
            <Typography variant="body1">
              • <strong>Collision Probability:</strong>{" "}
              {watchlistEntry.collisionProbabilityOperator}{" "}
              {watchlistEntry.collisionProbabilityValue ?? "N/A"}
            </Typography>
            <Typography variant="body1">
              • <strong>TCA Range:</strong> {watchlistEntry.tcaRange[0]} to{" "}
              {watchlistEntry.tcaRange[1]}
            </Typography>
            <Typography variant="body1">
              • <strong>Operator Organization:</strong>{" "}
              {watchlistEntry.operatorOrganization}
            </Typography>
          </Paper>

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
