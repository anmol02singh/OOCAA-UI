import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Stack,
  Button,
} from "@mui/material";
import {
  PlayCircleOutline,
  PauseCircleOutline,
  Edit,
  Delete,
} from "@mui/icons-material";
import CircleIcon from "@mui/icons-material/Circle";
// Import the Heatmap component
import Heatmap from "../components/HeatMap.tsx"; // Adjust the path if Heatmap is in a different folder

const rows = [
  {
    name: "123",
    description: "CDM for 123",
    duration: "00:05:00",
    latency: 10,
    status: "New Alert",
  },
  {
    name: "234",
    description: "CDM for 234",
    duration: "00:05:00",
    latency: 12,
    status: "No New Alert",
  },
  {
    name: "345",
    description: "CDM for 345",
    duration: "00:05:00",
    latency: 4,
    status: "New Alert",
  },
  {
    name: "456",
    description: "CDM for 456",
    duration: "00:05:00",
    latency: 6,
    status: "No New Alert",
  },
  {
    name: "567",
    description: "CDM for 567",
    duration: "00:05:00",
    latency: 8,
    status: "New Alert",
  },
];

const AlertSystem = () => {
  const getStatusColor = (status) => {
    return status === "New Alert" ? "red" : "green";
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography
        variant="h2"
        sx={{ paddingBottom: "20px", paddingTop: "20px" }}
      >
        Heatmap
      </Typography>
      {/* Add Heatmap below the table */}
      <Heatmap />

      <Typography variant="h2" gutterBottom>
        Alert System
      </Typography>
      <Button variant="Text">Sort By</Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>CDM</strong>
              </TableCell>
              <TableCell>
                <strong>Description</strong>
              </TableCell>
              <TableCell>
                <strong>Last Update</strong>
              </TableCell>
              <TableCell>
                <strong>Number of Events</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
              <TableCell>
                <strong>Command</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.duration}</TableCell>
                <TableCell>{row.latency}</TableCell>
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
                    <IconButton color="info">
                      <Edit />
                    </IconButton>
                    <IconButton color="error">
                      <Delete />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AlertSystem;
