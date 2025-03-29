import React, { useState, useMemo } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  TableSortLabel,
  TextField,
  Button,
  useTheme,
  MenuItem,
  Tooltip,
  styled,
  tooltipClasses,
  TooltipProps,
} from '@mui/material';
import { tokens } from '../theme.tsx';
import { Event } from '../types';
import { subscribeToEvent } from '../API/watchlist.tsx';
import { userdata } from '../API/account.tsx';
import { useNavigate } from 'react-router-dom';

type Order = 'asc' | 'desc';
type NumericOperator = 'lte' | 'gte' | 'eq';

interface EventTableProps {
  events: Event[];
  onEventClick: (eventItem: Event) => void;
  selectedEvent?: Event | null;
}

const EventTable: React.FC<EventTableProps> = ({ events, onEventClick, selectedEvent }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [order, setOrder] = useState<Order>('asc');
  const handleRequestSort = () => {
    setOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const [filterMissDistance, setFilterMissDistance] = useState<number | ''>('');
  const [missDistanceOperator, setMissDistanceOperator] = useState<NumericOperator>('lte');
  
  const [filterCollisionProbability, setFilterCollisionProbability] = useState<number | ''>('');
  const [collisionProbabilityOperator, setCollisionProbabilityOperator] = useState<NumericOperator>('gte');
  
  const [filterOperatorOrganization, setFilterOperatorOrganization] = useState<string>('');

  const isApproximatelyEqual = (
    a: number,
    b: number,
    tolerance: number = 0.05
  ): boolean => {
    if (b === 0) return Math.abs(a) < tolerance;
    return Math.abs(a - b) / Math.abs(b) <= tolerance;
  };

  const sortedEvents = useMemo(() => {
    const eventsCopy = [...events];
    eventsCopy.sort((a, b) => {
      const dateA = new Date(a.tca).getTime();
      const dateB = new Date(b.tca).getTime();
      return order === 'asc' ? dateA - dateB : dateB - dateA;
    });
    return eventsCopy;
  }, [events, order]);

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

  const filteredEvents = useMemo(() => {
    return sortedEvents.filter(event => {
      let valid = true;
      
      if (filterMissDistance !== '') {
        const threshold = Number(filterMissDistance);
        switch (missDistanceOperator) {
          case 'lte':
            valid = valid && event.missDistances.some(val => val <= threshold);
            break;
          case 'gte':
            valid = valid && event.missDistances.some(val => val >= threshold);
            break;
          case 'eq':
            valid = valid && event.missDistances.some(val => val === threshold);
            break;
          default:
            break;
        }
      }
      
      if (filterCollisionProbability !== '') {
        const threshold = Number(filterCollisionProbability);
        switch (collisionProbabilityOperator) {
          case 'lte':
            valid = valid && event.collisionProbabilities.some(val => val <= threshold);
            break;
          case 'gte':
            valid = valid && event.collisionProbabilities.some(val => val >= threshold);
            break;
          case 'eq': {
            valid = valid && event.collisionProbabilities.some(val => isApproximatelyEqual(val, threshold));
            break;
          }            
          default:
            break;
        }
      }
      
      if (filterOperatorOrganization.trim() !== '') {
        const orgFilter = filterOperatorOrganization.toLowerCase();
        valid =
          valid &&
          (event.primaryOperatorOrganization.toLowerCase().includes(orgFilter) ||
            event.secondaryOperatorOrganization.toLowerCase().includes(orgFilter));
      }
      
      return valid;
    });
  }, [
    sortedEvents,
    filterMissDistance,
    missDistanceOperator,
    filterCollisionProbability,
    collisionProbabilityOperator,
    filterOperatorOrganization,
  ]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSubscribe = async (eventItem: Event) => {
    const token = localStorage.getItem("accountToken");
    if (!token) {
      navigate('/login');
      return;
    }
    const user = await userdata(token);
    const userId = user._id;
    try {
      await subscribeToEvent(eventItem._id, userId,);
      alert("Successfully subscribed to event");
    } catch (error) {
      console.error('Error subscribing to event:', error);
      alert("You have already subscribed to this event");
    }
  };

  return (
    <Box mt={4}>
      <Box display="flex" gap={2} mb={2}>
        <TextField
          fullWidth
          sx={{
            backgroundColor: colors.primary[400],
            color: colors.grey[100],
          }}
          select
          label="Operator"
          variant="outlined"
          size="small"
          value={missDistanceOperator}
          onChange={(e) => setMissDistanceOperator(e.target.value as NumericOperator)}
          slotProps={{
            select: {
              MenuProps: {
                PaperProps: {
                  sx: { backgroundColor: colors.primary[400], color: colors.grey[100] },
                },
              },
            },
          }}
        >
          <MenuItem value="lte">{"≤"}</MenuItem>
          <MenuItem value="gte">{"≥"}</MenuItem>
          <MenuItem value="eq">{"="}</MenuItem>
        </TextField>
        <TextField
          fullWidth
          sx={{
            backgroundColor: colors.primary[400],
            color: colors.grey[100],
            '& input[type=number]': {
              '-moz-appearance': 'textfield',
            },
            '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
              '-webkit-appearance': 'none',
              margin: 0,
            },
          }}
          label="Miss Distance (m)"
          variant="outlined"
          size="small"
          type="number"
          value={filterMissDistance}
          onChange={(e) => setFilterMissDistance(e.target.value === '' ? '' : Number(e.target.value))}
        />
        <TextField
          fullWidth
          sx={{
            backgroundColor: colors.primary[400],
            color: colors.grey[100],
          }}
          select
          label="Operator"
          variant="outlined"
          size="small"
          value={collisionProbabilityOperator}
          onChange={(e) => setCollisionProbabilityOperator(e.target.value as NumericOperator)}
          slotProps={{
            select: {
              MenuProps: {
                PaperProps: {
                  sx: { backgroundColor: colors.primary[400], color: colors.grey[100] },
                },
              },
            },
          }}
        >
          <MenuItem value="lte">{"≤"}</MenuItem>
          <MenuItem value="gte">{"≥"}</MenuItem>
          <MenuItem value="eq">{"="}</MenuItem>
        </TextField>
        <TextField
          fullWidth
          sx={{
            backgroundColor: colors.primary[400],
            color: colors.grey[100],
          }}
          label="Collision Probability"
          variant="outlined"
          size="small"
          type="number"
          value={filterCollisionProbability}
          onChange={(e) => setFilterCollisionProbability(e.target.value === '' ? '' : Number(e.target.value))}
        />
        <TextField
          fullWidth
          sx={{
            backgroundColor: colors.primary[400],
            color: colors.grey[100],
          }}
          label="Operator Organization"
          variant="outlined"
          size="small"
          value={filterOperatorOrganization}
          onChange={(e) => setFilterOperatorOrganization(e.target.value)}
        />
        <Button
          fullWidth
          sx={{
            backgroundColor: colors.primary[400],
            color: colors.grey[100],
            width: '50%',
            whiteSpace: 'nowrap',
          }}
          variant="outlined"
          onClick={() => {
            setFilterMissDistance('');
            setMissDistanceOperator('lte');
            setFilterCollisionProbability('');
            setCollisionProbabilityOperator('lte');
            setFilterOperatorOrganization('');
          }}
        >
          Reset Filters
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: colors.primary[400],
          color: colors.grey[100],
        }}
      >
        <Table>
          <TableHead
            sx={{
              '& .MuiTableCell-root': { fontSize: '0.9rem' },
            }}
          >
            <TableRow>
              <TableCell>Event Name</TableCell>
              <TableCell>Primary Object Name</TableCell>
              <TableCell>Primary Object Designator</TableCell>
              <TableCell>Secondary Object Name</TableCell>
              <TableCell>Secondary Object Designator</TableCell>
              <TableCell>
                <TableSortLabel
                  active
                  direction={order}
                  onClick={handleRequestSort}
                >
                  TCA [UTC]
                </TableSortLabel>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              '& .MuiTableCell-root': { fontSize: '0.85rem' },
            }}
          >
            {filteredEvents
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((eventItem, index) => (
                <TableRow
                  key={index}
                  sx={{
                    cursor: 'pointer',
                    backgroundColor: 
                      selectedEvent && eventItem._id === selectedEvent._id
                        ? theme.palette.background.default
                        : undefined,
                    '&:hover': {
                      backgroundColor: theme.palette.background.default,
                    },
                  }}
                  onClick={() => onEventClick(eventItem)}
                >
                  <TableCell>{eventItem.eventName}</TableCell>
                  <TableCell>{eventItem.primaryObjectName}</TableCell>
                  <TableCell>{eventItem.primaryObjectDesignator}</TableCell>
                  <TableCell>{eventItem.secondaryObjectName}</TableCell>
                  <TableCell>{eventItem.secondaryObjectDesignator}</TableCell>
                  <TableCell>{new Date(eventItem.tca).toISOString()}</TableCell>
                  <TableCell>
                    <CustomTooltip title="Add this event to your watchlist">
                      <Button 
                        variant="contained"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSubscribe(eventItem);
                        }}
                        sx={{ backgroundColor: colors.primary[400], color: colors.grey[100] }}
                      >
                        Subscribe
                      </Button>
                    </CustomTooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={filteredEvents.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default EventTable;
