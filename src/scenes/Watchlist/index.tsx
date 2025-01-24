import { Box } from "@mui/material";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import { tokens } from '../../theme.tsx';
import Header from "../../components/Header.tsx";
import React from "react";
import { useTheme } from "@mui/material";
import { mockDataWatchlist } from "../../Data/mockDataWatchlist.tsx";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns: GridColDef[] = [
    { field: "id", headerName: "MESSAGE ID", flex: 1},
    { field: "CREATION_DATE", headerName: "CREATION DATE - (UTC)", flex: 1 },
    {
      field: "TCA",
      headerName: "TCA - (UTC)",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "MISS_DISTANCE",
      headerName: "MISS DISTANCE - (M)",
      flex: 1
     // type: "number",
     // headerAlign: "left",
     // align: "left",
    },
    { field: "COLLISION_PROBABILITY", headerName: "COLLISION PROBABILITY", flex: 1 },
   // { field: "email", headerName: "Email", flex: 1 },
   // { field: "address", headerName: "Address", flex: 1 },
   // { field: "city", headerName: "City", flex: 1 },
   // { field: "zipCode", headerName: "Zip Code", flex: 1 },
  ];

  return (
    <Box m="20px">
      <Header title="Watchlist" subtitle="Stay informed with real-time insights on your monitored satellites" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .name-column--cell": { color: colors.greenAccent[300] },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={mockDataWatchlist}
          columns={columns}
          slots={{ toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
