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
          [1728086400000, 1745449630441],
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
      <Heatmap foundCDMs={foundCDMs} />

      <Typography
        variant="h2"
        sx={{ paddingTop: "20px", paddingBottom: "10px" }}
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
            <Typography variant="h3" gutterBottom>
              Query Parameters
            </Typography>
            {watchlistEntry.searchParams.map((param) => (
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

            <TableContainer
              sx={{
                backgroundColor: colors.primary[500],
                borderRadius: 2,
                border: `1px solid ${colors.primary[700]}`,
                mt: 2,
              }}
            >
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: colors.primary[700] }}>
                    <TableCell sx={{ color: "white" }}>
                      <strong>CDM</strong>
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>
                      <strong>Primary Object Designator</strong>
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>
                      <strong>Secondary Object Name</strong>
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>
                      <strong>TCA[UTC]</strong>
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
                sx={{ color: "white" }}
              />
            </TableContainer>
          </Paper>
        );
      })}
    </div>
  );
};

export default AlertSystem;
