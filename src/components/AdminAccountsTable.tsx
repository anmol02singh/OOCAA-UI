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
import { userdata } from '../API/account.tsx';

type Order = 'asc' | 'desc';

interface EventTableProps {
    events: Event[];
    onEventClick: (eventItem: Event) => void;
    selectedEvent?: Event | null;
}

const AdminAccountsTable: React.FC<EventTableProps> = ({ events, onEventClick, selectedEvent }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [order, setOrder] = useState<Order>('asc');
    const handleRequestSort = () => {
        setOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    };

    // const isApproximatelyEqual = (
    //     a: number,
    //     b: number,
    //     tolerance: number = 0.05
    // ): boolean => {
    //     if (b === 0) return Math.abs(a) < tolerance;
    //     return Math.abs(a - b) / Math.abs(b) <= tolerance;
    // };

    // const sortedEvents = useMemo(() => {
    //     const eventsCopy = [...events];
    //     eventsCopy.sort((a, b) => {
    //         const dateA = new Date(a.tca).getTime();
    //         const dateB = new Date(b.tca).getTime();
    //         return order === 'asc' ? dateA - dateB : dateB - dateA;
    //     });
    //     return eventsCopy;
    // }, [events, order]);

    // const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
    //     <Tooltip {...props} arrow classes={{ popper: className }} />
    // ))(({ theme }) => ({
    //     [`& .${tooltipClasses.tooltip}`]: {
    //         backgroundColor: colors.primary[400],
    //         color: 'white',
    //         fontSize: '0.75rem',
    //     },
    //     [`& .${tooltipClasses.arrow}`]: {
    //         color: colors.primary[400],
    //     },
    // }));

    // const filteredEvents = useMemo(() => {
    //     return sortedEvents.filter(event => {
    //         let valid = true;

    //         if (filterMissDistance !== '') {
    //             const threshold = Number(filterMissDistance);
    //             switch (missDistanceOperator) {
    //                 case 'lte':
    //                     valid = valid && event.missDistances.some(val => val <= threshold);
    //                     break;
    //                 case 'gte':
    //                     valid = valid && event.missDistances.some(val => val >= threshold);
    //                     break;
    //                 case 'eq':
    //                     valid = valid && event.missDistances.some(val => val === threshold);
    //                     break;
    //                 default:
    //                     break;
    //             }
    //         }

    //         if (filterCollisionProbability !== '') {
    //             const threshold = Number(filterCollisionProbability);
    //             switch (collisionProbabilityOperator) {
    //                 case 'lte':
    //                     valid = valid && event.collisionProbabilities.some(val => val <= threshold);
    //                     break;
    //                 case 'gte':
    //                     valid = valid && event.collisionProbabilities.some(val => val >= threshold);
    //                     break;
    //                 case 'eq': {
    //                     valid = valid && event.collisionProbabilities.some(val => isApproximatelyEqual(val, threshold));
    //                     break;
    //                 }
    //                 default:
    //                     break;
    //             }
    //         }

    //         if (filterOperatorOrganization.trim() !== '') {
    //             const orgFilter = filterOperatorOrganization.toLowerCase();
    //             valid =
    //                 valid &&
    //                 (event.primaryOperatorOrganization.toLowerCase().includes(orgFilter) ||
    //                     event.secondaryOperatorOrganization.toLowerCase().includes(orgFilter));
    //         }

    //         return valid;
    //     });
    // }, [
    //     sortedEvents,
    //     filterMissDistance,
    //     missDistanceOperator,
    //     filterCollisionProbability,
    //     collisionProbabilityOperator,
    //     filterOperatorOrganization,
    // ]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box>
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
                        {/* {filteredEvents
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((eventItem, index) => (
                                <TableRow
                                    key={index}
                                    sx={{
                                        cursor: 'pointer',
                                        // backgroundColor: 
                                        //   selectedEvent && eventItem._id === selectedEvent._id
                                        //     ? theme.palette.background.default
                                        //     : undefined,
                                        '&:hover': {
                                            backgroundColor: theme.palette.background.default,
                                        },
                                    }}
                                    onClick={() => onEventClick(eventItem)}
                                >
                                    <TableCell>a</TableCell>
                                    <TableCell>b</TableCell>
                                    <TableCell>c</TableCell>
                                    <TableCell>d</TableCell>
                                    <TableCell>e</TableCell>
                                    <TableCell>f</TableCell>
                                </TableRow>
                            ))} */}
                            <TableRow
                                    // key={index}
                                    sx={{
                                        cursor: 'pointer',
                                        // backgroundColor: 
                                        //   selectedEvent && eventItem._id === selectedEvent._id
                                        //     ? theme.palette.background.default
                                        //     : undefined,
                                        '&:hover': {
                                            backgroundColor: theme.palette.background.default,
                                        },
                                    }}
                                    // onClick={() => onEventClick(eventItem)}
                                >
                                    <TableCell>a</TableCell>
                                    <TableCell>b</TableCell>
                                    <TableCell>c</TableCell>
                                    <TableCell>d</TableCell>
                                    <TableCell>e</TableCell>
                                    <TableCell>f</TableCell>
                                </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={1}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    );
};

export default AdminAccountsTable;