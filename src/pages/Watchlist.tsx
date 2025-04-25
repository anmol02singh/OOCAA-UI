import React, { useState, useEffect, useMemo } from 'react';
import { Box, Typography, Button, tooltipClasses, TooltipProps, Tooltip, styled, useMediaQuery } from "@mui/material";
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
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

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
  }, [navigate]);

  const mobileColumns: GridColDef[] = [
    { field: "objectOne", headerName: "OBJ 1", flex: 1 },
    { field: "objectTwo", headerName: "OBJ 2", flex: 1 },
    { field: "missDistance", headerName: "MISS DIST", flex: 1 },
    {
      field: "actions",
      headerName: "ACTIONS",
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          sx={{ 
            backgroundColor: colors.primary[500],
            fontSize: '0.7rem',
            padding: '4px 8px'
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(params.row.id);
          }}
        >
          Delete
        </Button>
      )
    }      
  ];

  const tabletColumns: GridColDef[] = [
    { field: "objectOne", headerName: "OBJECT ONE", flex: 1 },
    { field: "objectTwo", headerName: "OBJECT TWO", flex: 1 },
    { field: "missDistance", headerName: "MISS DISTANCE", flex: 1 },
    { field: "collisionProbability", headerName: "COLLISION PROB", flex: 1 },
    {
      field: "actions",
      headerName: "ACTIONS",
      flex: 1,
      renderCell: (params) => (
        <CustomTooltip title="Delete these Filters from your Watchlist">
          <Button
            variant="contained"
            size="small"
            sx={{ backgroundColor: colors.primary[500] }}
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(params.row.id);
            }}
          >
            Delete
          </Button>
        </CustomTooltip>
      )
    }      
  ];

  const desktopColumns: GridColDef[] = [
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
              handleDelete(params.row.id);
            }}
          >
            Delete
          </Button>
        </CustomTooltip>
      )
    }      
  ];

  const handleDelete = (id: string) => {
    deleteFilters(id) 
      .then(() => {
        setWatchlist(prev =>
          prev.filter(
            (entry) => entry._id !== id
          )
        );
      })
      .catch((error) => {
        console.error("Error deleting filters:", error);
        setErrMsg("Error deleting filters");
      });
  };

  const columns = isMobile ? mobileColumns : (isTablet ? tabletColumns : desktopColumns);

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

  const MobileCardView = () => {
    if (watchlist.length === 0) return <Typography>No entries found</Typography>;
    
    return (
      <Box sx={{ mt: 2 }}>
        {rows.map((row) => (
          <Box 
            key={row.id} 
            sx={{ 
              backgroundColor: colors.primary[400],
              borderRadius: '4px',
              p: 2,
              mb: 2
            }}
          >
            <Typography variant="h6" fontWeight="bold">Objects: {row.objectOne} / {row.objectTwo}</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>Miss Distance: {row.missDistance}</Typography>
            <Typography variant="body2">Collision Probability: {row.collisionProbability}</Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>Operator: {row.operatorOrganization}</Typography>
            
            <Button
              fullWidth
              variant="contained"
              size="small"
              sx={{ backgroundColor: colors.primary[500] }}
              onClick={() => handleDelete(row.id)}
            >
              Delete
            </Button>
          </Box>
        ))}
      </Box>
    );
  };

  const isVerySmallMobile = useMediaQuery('(max-width:450px)');

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Box 
      sx={{
        padding: isMobile ? "10px" : "20px",
        width: "99%",
        height: "100%",
        overflow: "auto",
        position: "relative",
        boxSizing: "border-box",
      }}
    >
      <Typography 
        variant={isMobile ? "h3" : "h2"} 
        fontWeight="bold" 
        mt={1}
      >
        Watchlist
      </Typography>
      <Typography 
        variant={isMobile ? "body1" : "h5"} 
        mt={isMobile ? 1 : 2} 
        mb={isMobile ? 2 : 3}
      >
        Stay informed with real-time insights on your monitored satellites and events.
      </Typography>
      
      {errMsg && (
        <Typography variant="body1" color="error" sx={{ mb: 2 }}>
          {errMsg}
        </Typography>
      )}

      {isVerySmallMobile ? (
        <MobileCardView />
      ) : (
        <Box
          sx={{
            width: "100%",
            height: isMobile ? "65vh" : "75vh",
            overflow: "auto", 
            "& .MuiDataGrid-root": { 
              border: "none",
              width: "100%", 
              overflow: "visible", 
              '& .MuiDataGrid-main': {
                overflow: 'visible',
              },
            },
            "& .MuiDataGrid-cell": { 
              borderBottom: "none",
              fontSize: isMobile ? '0.75rem' : 'inherit',
              padding: isMobile ? '8px 4px' : 'inherit',
              whiteSpace: "normal", 
              lineHeight: "normal"
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
              fontSize: isMobile ? '0.75rem' : 'inherit'
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.primary[500],
              fontSize: isMobile ? '0.75rem' : 'inherit'
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${colors.grey[100]} !important`,
              fontSize: isMobile ? '0.75rem' : 'inherit',
              padding: isMobile ? '4px' : 'inherit'
            },
            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
              fontSize: isMobile ? '0.75rem' : 'inherit'
            }
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            slots={{ toolbar: isMobile ? undefined : GridToolbar }}
            initialState={{
              pagination: {
                paginationModel: { pageSize: isMobile ? 5 : 10 }
              }
            }}
            pageSizeOptions={isMobile ? [5] : [10, 25, 50]}
            disableColumnMenu={isMobile}
            key={`grid-${windowSize.width}-${windowSize.height}`}
            columnVisibilityModel={{
              ...(windowSize.width < 1100 && !isMobile && !isTablet && {
                operatorOrganization: false,
              }),
            }}
            density={isMobile ? "compact" : "standard"}
          />
        </Box>
      )}
    </Box>
  );
};

export default Watchlist;

