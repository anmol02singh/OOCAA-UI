import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  Typography,
  useTheme,
  Box,
} from "@mui/material";
import Heatmap from "../components/HeatMap.tsx";
import { tokens } from "../theme.tsx";
import { WatchlistEntry } from "../types.tsx";
import { useNavigate } from "react-router-dom";
import { userdata } from "../API/account.tsx";
import { fetchUserWatchlist } from "../API/watchlist.tsx";
import { fetchLimitedEvents } from "../API/searchEvents.tsx";
import { Event } from "../types.tsx";

const AlertSystem = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [watchlist, setWatchlist] = useState<WatchlistEntry[]>([]);
  const [eventsByFilter, setEventsByFilter] = useState<Record<string, Event[]>>(
    {}
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const pageContainer: React.CSSProperties = {
    width: "99.7%",
    height: "auto",
    backgroundColor: colors.primary[500],
    overflowX: "hidden",
    overflowY: "auto",
    padding: "2rem",
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
              const eventData = await fetchLimitedEvents(
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
  }, [navigate]);

  const [foundCDMs, setFoundCDMs] = useState<any[]>([]);

  useEffect(() => {
    const fetchHeatMapData = async () => {
      try {
        const data = await fetchLimitedEvents(
          [],
          [1737331200000, 1737772640214],
          {}
        );

        const tcaArray = data.map((entry) => entry.tca);

        setFoundCDMs(tcaArray);
      } catch (error) {
        console.error("Error fetching filters or events:", error);
      }
    };

    fetchHeatMapData();
  }, []);

  return (
    
    <Box sx={pageContainer}>
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
      <Heatmap foundCDMs={foundCDMs} colors={colors} />

      <Typography
        variant="h2"
        sx={{ paddingTop: "20px", paddingBottom: "10px", marginTop: "20px" }}
      >
        CDM Alert Table
      </Typography>

      {watchlist.map((watchlistEntry, index) => {
        const events = eventsByFilter[watchlistEntry.createdAt] || [];
        return (
          <Paper
            key={watchlistEntry.createdAt || index}
            sx={{
              padding: 2,
              marginBottom: 4,
              backgroundColor: colors.primary[600],
              borderRadius: 2,
            }}
          >
            <Typography variant="h3" gutterBottom mb={2}>
              Query Parameters
            </Typography>
            {watchlistEntry.searchParams.map((param) => (
              <Typography variant="body1" sx={{marginBottom: 1}} key={param.id}>
               <strong>{param.criteria}:</strong> {(param.value).toUpperCase() || "N/A"}
              </Typography>
            ))}
            <Typography variant="body1" sx={{ marginTop: 1, marginBottom: 1 }}>
              <strong>Miss Distance:</strong>{" "}
              {watchlistEntry.missDistanceOperator === "gte" ? "≥ " : "≤ "}
              {watchlistEntry.missDistanceValue ?? "N/A"} km
            </Typography>
            <Typography variant="body1" sx={{marginBottom: 1}}>
              <strong>Collision Probability:</strong>{" "}
              {watchlistEntry.collisionProbabilityOperator === "gte" ? "≥ " : "≤ "}
              {watchlistEntry.collisionProbabilityValue ?? "N/A"}
            </Typography>
            <Typography variant="body1" sx={{marginBottom: 1}}>
              <strong>TCA Range:</strong> {new Date(watchlistEntry.tcaRange[0]).toISOString()} to{" "}
              {new Date(watchlistEntry.tcaRange[1]).toISOString()}
            </Typography>
            <Typography variant="body1">
              <strong>Operator Organization:</strong>{" "}
              {watchlistEntry.operatorOrganization || "N/A"}
            </Typography>

            <TableContainer
              sx={{
                backgroundColor: colors.primary[500],
                borderRadius: 2,
                border: `1px solid ${colors.primary[600]}`,
                mt: 2,
              }}
            >
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: colors.primary[600] }}>
                    <TableCell sx={{ color: colors.grey[100] }}>
                      <strong>CDM</strong>
                    </TableCell>
                    <TableCell sx={{ color: colors.grey[100] }}>
                      <strong>Primary Object Designator</strong>
                    </TableCell>
                    <TableCell sx={{ color: colors.grey[100] }}>
                      <strong>Secondary Object Designator</strong>
                    </TableCell>
                    <TableCell sx={{ color: colors.grey[100] }}>
                      <strong>TCA [UTC]</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody data-testid="table-list">
                  {events
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((val, rowIndex) => (
                      <TableRow
                        key={val._id}
                        sx={{
                          backgroundColor:
                            rowIndex % 2 === 0
                              ? colors.primary[600]
                              : colors.primary[500],
                        }}
                      >
                        <TableCell>{val._id}</TableCell>
                        <TableCell>{val.primaryObjectDesignator}</TableCell>
                        <TableCell>{val.secondaryObjectDesignator}</TableCell>
                        <TableCell>{val.tca}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={events.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{ color: colors.grey[100] }}
              />
            </TableContainer>
          </Paper>
        );
      })}
    </Box>
  );
};

export default AlertSystem;
