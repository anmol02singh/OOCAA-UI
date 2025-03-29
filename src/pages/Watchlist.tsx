import React, { useState, useEffect, useMemo } from 'react';
import { Box, Typography, Button, tooltipClasses, TooltipProps, Tooltip, styled } from "@mui/material";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import { tokens } from '../theme.tsx';
import Header from "../components/Header.tsx";
import { useTheme } from "@mui/material";
import { Event, WatchlistEntry } from '../types.tsx';
import { fetchUserWatchlist } from '../API/watchlist.tsx';
import { userdata } from '../API/account.tsx';
import { useNavigate } from 'react-router-dom';

const Watchlist: React.FC = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [watchlist, setWatchlist] = useState<WatchlistEntry[]>([]);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
      <Tooltip {...props} arrow classes={{ popper: className }} />
    ))(({ theme }) => ({
      [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: colors.primary[400],
        color: 'white',
        fontSize: '0.75rem',
      },
      [`& .${tooltipClasses.arrow}`]: {
        color: colors.primary[400],
      },
    }));

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accountToken");
      if (!token) {
        
        return;
      }
      try {
        const user = await userdata(token);
        const userId = user._id;
        const data = await fetchUserWatchlist(userId);
        setWatchlist(data);
      } catch (error) {
        setErrMsg("Failed to fetch events");
        console.error("Error fetching events:", error);
      }
    };
    fetchData();
  }, []);

  // Define the columns for the DataGrid.
  const columns: GridColDef[] = [
    { field: "eventName", headerName: "EVENT NAME", flex: 1 },
    { field: "primaryObjectName", headerName: "PRIMARY OBJECT NAME", flex: 1 },
    { field: "primaryObjectDesignator", headerName: "PRIMARY OBJECT DESIGNATOR", flex: 1 },
    { field: "secondaryObjectName", headerName: "SECONDARY OBJECT NAME", flex: 1 },
    { field: "secondaryObjectDesignator", headerName: "SECONDARY OBJECT DESIGNATOR", flex: 1 },
    { field: "tca", headerName: "TCA [UTC]", flex: 1 },
    {
        field: "actions",
        headerName: "ACTIONS",
        flex: 1,
        renderCell: (params) => (
            <CustomTooltip title = "Delete this Event from your Watchlist">
                <Button
                    variant="contained"
                    sx={{
                    backgroundColor: colors.primary[500],
                    }}
                    onClick={(e) => {
                    e.stopPropagation();
                    }}
                >
                    Delete
                </Button>
            </CustomTooltip>
          
        )
      }      
  ];

  // Map the watchlist entries to rows using the nested event data.
  const rows = useMemo(() => {
    return watchlist.map((entry) => {
      const evt = entry.event;
      return {
        id: entry._id, // use the watchlist entry _id as the row id
        eventName: evt.eventName,
        primaryObjectName: evt.primaryObjectName,
        primaryObjectDesignator: evt.primaryObjectDesignator,
        secondaryObjectName: evt.secondaryObjectName,
        secondaryObjectDesignator: evt.secondaryObjectDesignator,
        tca: new Date(evt.tca).toLocaleString(),
      };
    });
  }, [watchlist]);

  return (
    <Box m="20px">
      <Typography variant="h2" fontWeight="bold" mt={1}>
        Watchlist
    </Typography>
    <Typography variant="h5" mt={2} mb={3}>
        Stay informed with real-time insights on your monitored satellites and events.
    </Typography>
      {errMsg && (
        <Typography variant="body1" color="error" sx={{ mb: 2 }}>
          {errMsg}
        </Typography>
      )}
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.primary[500],
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          slots={{ toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Watchlist;
