import React, { useState, useEffect, useMemo } from 'react';
import { Box, Typography, Button, tooltipClasses, TooltipProps, Tooltip, styled } from "@mui/material";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import { tokens } from '../theme.tsx';
import Header from "../components/Header.tsx";
import { useTheme } from "@mui/material";
import { WatchlistEntry } from '../types.tsx';
import { fetchUserWatchlist, deleteFilters } from '../API/watchlist.tsx';
import { userdata } from '../API/account.tsx';
import { useNavigate } from 'react-router-dom';

const Watchlist: React.FC = () => {
  const navigate = useNavigate();  
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
        navigate('/login')
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

  const columns: GridColDef[] = [
    { field: "objectOne", headerName: "OBJECT ONE", flex: 1 },
    { field: "objectTwo", headerName: "OBJECT TWO", flex: 1 },
    { field: "tcaStart", headerName: "TCA START", flex: 1 },
    { field: "tcaFinish", headerName: "TCA FINISH", flex: 1 },
    { field: "missDistance", headerName: "MISS DISTANCE", flex: 1 },
    { field: "collisionProbability", headerName: "COLLISION PROBABILITY", flex: 1 },
    { field: "operatorOrganization", headerName: "OPERATOR ORGANIZATION", flex: 1 },
    {
        field: "actions",
        headerName: "ACTIONS",
        flex: 1,
        renderCell: (params) => (
        <CustomTooltip title="Delete these Filters from your Watchlist">
          <Button
            variant="contained"
            sx={{ backgroundColor: colors.primary[500] }}
            onClick={(e) => {
              e.stopPropagation();
              deleteFilters(params.row.id) 
                .then(() => {
                  setWatchlist(prev =>
                    prev.filter(
                      (entry) => entry._id !== params.row.id
                    )
                  );
                })
                .catch((error) => {
                  console.error("Error deleting filters:", error);
                  setErrMsg("Error deleting filters");
                });
            }}
          >
            Delete
          </Button>
        </CustomTooltip>
          
        )
      }      
  ];

  const rows = useMemo(() => {
    return watchlist.map((entry) => {
      const objectNames = entry.searchParams
        .filter(param => param.criteria === 'objectName' || param.criteria === 'objectType' || param.criteria === 'objectDesignator')
        .map(param => param.value);
      
      const objectOne = objectNames[0] || 'N/A';
      const objectTwo = objectNames[1] || 'N/A';
      
      const tcaStart = new Date(entry.tcaRange[0]).toISOString();
      const tcaFinish = new Date(entry.tcaRange[1]).toISOString();
  
      let missDistanceStr = 'N/A';
      if (entry.missDistanceValue) {
        const missOp = entry.missDistanceOperator === 'gte' ? '≥' : '≤';
        missDistanceStr = `${missOp} ${entry.missDistanceValue}`;
      }
  
      let collisionProbabilityStr = 'N/A';
      if (entry.collisionProbabilityValue) {
        const probOp = entry.collisionProbabilityOperator === 'gte' ? '≥' : '≤';
        collisionProbabilityStr = `${probOp} ${entry.collisionProbabilityValue}`;
      }
      
      return {
        id: entry._id,
        objectOne: objectOne.toUpperCase(),
        objectTwo: objectTwo.toUpperCase(), 
        tcaStart: tcaStart,
        tcaFinish: tcaFinish,
        missDistance: missDistanceStr,
        collisionProbability: collisionProbabilityStr,
        operatorOrganization: entry.operatorOrganization || 'N/A',
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
