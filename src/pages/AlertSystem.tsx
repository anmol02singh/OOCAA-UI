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

const API_URL = process.env.API_URL || "http://localhost:3000";

const initialRows = [
  {
    name: "123",
    description: "CDM for 123",
    duration: "00:01:00",
    events: 10,
    status: "New Event",
  },
  {
    name: "234",
    description: "CDM for 234",
    duration: "00:05:00",
    events: 12,
    status: "Actioned by: James",
  },
  {
    name: "345",
    description: "CDM for 345",
    duration: "00:03:00",
    events: 4,
    status: "New Event",
  },
  {
    name: "456",
    description: "CDM for 456",
    duration: "00:05:00",
    events: 6,
    status: "Actioned by: James",
  },
  {
    name: "567",
    description: "CDM for 567",
    duration: "00:05:00",
    events: 18,
    status: "New Event",
  },
  {
    name: "213",
    description: "CDM for 213",
    duration: "00:05:00",
    events: 23,
    status: "Actioned by: James",
  },
  {
    name: "334",
    description: "CDM for 334",
    duration: "00:04:00",
    events: 36,
    status: "New Event",
  },
  {
    name: "435",
    description: "CDM for 435",
    duration: "00:07:00",
    events: 17,
    status: "Actioned by: James",
  },
  {
    name: "543",
    description: "CDM for 543",
    duration: "00:10:00",
    events: 15,
    status: "New Event",
  },
];

export const fetchCDMs = async (eventId: string) => {
  try {
    const response = await fetch(`${API_URL}/cdm-data/by-event/${eventId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch CDMs for event");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching CDMs for event:", error);
    throw error;
  }
};
const AlertSystem = () => {
  const [subscribedCDM, setSubscribedCDM] = useState([]);

  const [rows, setRows] = useState(initialRows);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate fetching data
        const result = await fetchCDMs("67bb892779e8e7f667693eeb");
        setSubscribedCDM(result); // Update state with fetched data
      } catch (err) {}
    };

    fetchData();
  }, []);

  console.log(subscribedCDM[0]);

  const getStatusColor = (status) => {
    return status === "New Event" ? "red" : "green";
  };

  const handleEditClick = (index) => {
    const updatedRows = [...rows];
    updatedRows[index].status =
      updatedRows[index].status == "Actioned by: James"
        ? "New Event"
        : "Actioned by: James";
    setRows(updatedRows);
  };

  const handleDelete = (index) => {
    const updatedRows = [...rows];
    const newRows = [
      ...updatedRows.slice(0, index),
      ...updatedRows.slice(index + 1),
    ];
    setRows(newRows);
  };

  const handleSort = (arr) => {
    arr.sort((a, b) => {
      // Convert the timestamps to Date objects
      var dateA = new Date(a.timestamp);
      var dateB = new Date(b.timestamp);

      // Compare the dates and return either -1, 0, or 1
      // depending on whether dateA is before, the same as,
      // or after dateB
      if (dateA < dateB) return -1;
      if (dateA > dateB) return 1;
      return 0;
    });
  };

  const handleStatusSort = () => {
    const updatedRows = [...rows];

    const sortedByStatus = updatedRows.sort((a, b) =>
      b.status.localeCompare(a.status)
    );

    setRows(sortedByStatus);
  };

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

      <Grid2 container spacing={2}>
        <Grid2>
          <Button
            data-testid="sort-by-events"
            variant="outlined"
            sx={{ padding: "5px", marginBottom: "10px", marginTop: "10px" }}
            onClick={() => handleSort(subscribedCDM)}
          >
            Sort By Last Updated
          </Button>
        </Grid2>

        <Grid2>
          <Button
            variant="outlined"
            sx={{ padding: "5px", marginBottom: "10px", marginTop: "10px" }}
            onClick={() => handleStatusSort()}
          >
            Sort By Status
          </Button>
        </Grid2>
      </Grid2>
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: colors.primary[500],
          color: colors.primary[100],
          border: `1px solid ${colors.primary[700]}`,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>CDM</strong>
              </TableCell>
              <TableCell>
                <strong>Last Update</strong>
              </TableCell>
              <TableCell>
                <strong>CDM EVENT</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
              <TableCell>
                <strong>Command</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody data-testid="table-list">
            {subscribedCDM.map((val: any, index) => (
              <TableRow key={val._id}>
                <TableCell>{val._id}</TableCell>
                <TableCell>{val.creationDate}</TableCell>
                <TableCell>{val.event}</TableCell>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <CircleIcon
                      fontSize="small"
                      style={{ color: getStatusColor("New Event") }}
                    />
                    New Event
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button color="info" onClick={openModal}>
                      <Edit />
                    </Button>
                    <Button color="error" onClick={() => handleDelete(index)}>
                      <Delete />
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
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
            {/* {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.duration}</TableCell>
                <TableCell>{row.events}</TableCell>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <CircleIcon
                      fontSize="small"
                      style={{ color: getStatusColor(row.status) }}
                    />
                    {row.status}
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button color="info" onClick={() => handleEditClick(index)}>
                      <Edit />
                    </Button>
                    <Button color="error" onClick={() => handleDelete(index)}>
                      <Delete />
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AlertSystem;
