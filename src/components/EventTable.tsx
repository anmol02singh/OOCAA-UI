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
  useTheme,
} from '@mui/material';
import { tokens } from '../theme.tsx';
import { Event } from '../types';

type Order = 'asc' | 'desc';

interface EventTableProps {
  events: Event[];
  onEventClick: (eventItem: Event) => void;
  selectedEvent?: Event | null;
}

const EventTable: React.FC<EventTableProps> = ({ events, onEventClick, selectedEvent }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [order, setOrder] = useState<Order>('asc');
  const handleRequestSort = () => {
    setOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box mt={4}>

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
            {sortedEvents
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
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={sortedEvents.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default EventTable;
