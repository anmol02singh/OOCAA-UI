import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

interface Cdm {
  messageId: string;
  creationDate: string;
  tca: string;
  missDistance: number;
  collisionProbability: number;
}

interface CdmTableProps {
  cdms: Cdm[];
}

const CdmTable: React.FC<CdmTableProps> = ({ cdms }) => {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography
        variant="h6"
        sx={{
          color: "#B0B0B0",
          mb: 2,
        }}
      >
        CDM Results
      </Typography>
      <TableContainer component={Paper} sx={{ bgcolor: "#2A2A2A" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#B0B0B0" }}>Message ID</TableCell>
              <TableCell sx={{ color: "#B0B0B0" }}>Creation Date</TableCell>
              <TableCell sx={{ color: "#B0B0B0" }}>Time of Closest Approach</TableCell>
              <TableCell sx={{ color: "#B0B0B0" }}>Miss Distance</TableCell>
              <TableCell sx={{ color: "#B0B0B0" }}>Collision Probability</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cdms.map((cdm, index) => (
              <TableRow key={index}>
                <TableCell sx={{ color: "#B0B0B0" }}>{cdm.messageId}</TableCell>
                <TableCell sx={{ color: "#B0B0B0" }}>{cdm.creationDate}</TableCell>
                <TableCell sx={{ color: "#B0B0B0" }}>{cdm.tca}</TableCell>
                <TableCell sx={{ color: "#B0B0B0" }}>{cdm.missDistance}</TableCell>
                <TableCell sx={{ color: "#B0B0B0" }}>{cdm.collisionProbability}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CdmTable;
