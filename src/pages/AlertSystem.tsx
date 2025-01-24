import React, { useState } from "react";
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
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import CircleIcon from "@mui/icons-material/Circle";
import Heatmap from "../components/HeatMap.tsx";

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

const AlertSystem = () => {
  const [rows, setRows] = useState(initialRows);

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

  const handleSort = () => {
    const updatedRows = [...rows];

    const sortedRows = updatedRows.sort((a, b) => b.events - a.events);

    setRows(sortedRows);
  };

  const handleStatusSort = () => {
    const updatedRows = [...rows];

    const sortedByStatus = updatedRows.sort((a, b) =>
      b.status.localeCompare(a.status)
    );

    setRows(sortedByStatus);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h2" sx={{ paddingBottom: "20px" }}>
        Heatmap
      </Typography>
      <Heatmap />

      <Typography variant="h2" gutterBottom sx={{ paddingTop: "20px" }}>
        Alert System
      </Typography>
      <Grid2 container spacing={2}>
        <Grid2>
          <Button
            variant="outlined"
            sx={{ padding: "5px", marginBottom: "10px" }}
            onClick={() => handleSort()}
          >
            Sort By Events
          </Button>
        </Grid2>

        <Grid2>
          <Button
            variant="outlined"
            sx={{ padding: "5px", marginBottom: "10px" }}
            onClick={() => handleStatusSort()}
          >
            Sort By Status
          </Button>
        </Grid2>
      </Grid2>
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AlertSystem;
