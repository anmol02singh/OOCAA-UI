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
import { CDM } from '../types';

type Order = 'asc' | 'desc';

interface CDMTableProps {
  cdms: CDM[];
  onRowClick?: (cdm: CDM) => void;
  selectedCDM?: CDM | null;
}

const CDMTable: React.FC<CDMTableProps> = ({ cdms, onRowClick, selectedCDM }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof CDM>('creationDate');

  const handleRequestSort = (property: keyof CDM) => {
    if (property === 'messageId') return;
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedCDMs = useMemo(() => {
    const cdmsCopy = [...cdms];
    cdmsCopy.sort((a, b) => {
      let aValue = a[orderBy];
      let bValue = b[orderBy];

      if (orderBy === 'creationDate' || orderBy === 'tca') {
        aValue = new Date(aValue as string).getTime();
        bValue = new Date(bValue as string).getTime();
      } else if (typeof aValue === 'string' && typeof bValue === 'string') {
        return order === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return order === 'asc'
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });
    return cdmsCopy;
  }, [cdms, order, orderBy]);

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
              <TableCell>Message ID</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'creationDate'}
                  direction={orderBy === 'creationDate' ? order : 'asc'}
                  onClick={() => handleRequestSort('creationDate')}
                >
                  Creation Date [UTC]
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'tca'}
                  direction={orderBy === 'tca' ? order : 'asc'}
                  onClick={() => handleRequestSort('tca')}
                >
                  TCA [UTC]
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'missDistance'}
                  direction={orderBy === 'missDistance' ? order : 'asc'}
                  onClick={() => handleRequestSort('missDistance')}
                >
                  Miss Distance [m]
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'collisionProbability'}
                  direction={orderBy === 'collisionProbability' ? order : 'asc'}
                  onClick={() => handleRequestSort('collisionProbability')}
                >
                  Collision Probability
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              '& .MuiTableCell-root': { fontSize: '0.85rem' },
            }}
          >
            {sortedCDMs
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((cdm, index) => {
                const isSelected = selectedCDM && cdm._id === selectedCDM._id;
                return (
                  <TableRow
                    key={index}
                    sx={{
                      cursor: 'pointer',
                      backgroundColor: isSelected ? theme.palette.background.default : undefined,
                      '&:hover': {
                        backgroundColor: theme.palette.background.default,
                      },
                    }}
                    onClick={() => onRowClick && onRowClick(cdm)}
                  >
                    <TableCell>{cdm.messageId}</TableCell>
                    <TableCell>{new Date(cdm.creationDate).toISOString()}</TableCell>
                    <TableCell>{new Date(cdm.tca).toISOString()}</TableCell>
                    <TableCell>{cdm.missDistance.toFixed(2)}</TableCell>
                    <TableCell>{cdm.collisionProbability.toExponential(2)}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={cdms.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default CDMTable;
