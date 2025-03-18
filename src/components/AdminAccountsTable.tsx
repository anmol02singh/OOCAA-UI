import React, { useState, useMemo, useEffect } from 'react';
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
import { getAccounts } from '../API/account.tsx';
import { Account } from '../types.tsx';

interface EventTableProps {
    token: string | null;
    filterRole: {
        min: number | '',
        max: number | '',
    };
    setFilterRole: React.Dispatch<React.SetStateAction<{
        min: number | "";
        max: number | "";
    }>>
    searchBar: {
        criterion: string;
        value: string;
    };
}

type SortDirection = 'asc' | 'desc';
type SortColumn = 'username' | 'name' | 'role' | 'email';

const AdminAccountsTable: React.FC<EventTableProps> = ({
    token,
    filterRole,
    setFilterRole,
    searchBar,
}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [allAccounts, setAllAccounts] = useState<Account[]>([]);
    const [accounts, setAccounts] = useState<Account[]>([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [order, setOrder] = useState<SortDirection>('asc');
    const [orderBy, setOrderBy] = useState<SortColumn>('username');
    const columns: SortColumn[] = ['username', 'name', 'role', 'email'];

    const handleRequestSort = (event) => {
        const column = columns.find((columnClassName) =>
            event.currentTarget.className.includes(columnClassName)
        ) as SortColumn | undefined;
        if (!column) return;
        setOrder(order === 'asc' ? 'desc' : 'asc');
        setOrderBy(column);
    };

    useEffect(() => {
        if (token) {
            getAccounts(token)
                .then(accounts => {
                    accounts.sort((a, b) => {
                        const aValue = a[orderBy];
                        const bValue = b[orderBy];
                        if (aValue === undefined || bValue === undefined) return 0;

                        return aValue.localeCompare(bValue);
                    });
                    setAllAccounts(accounts);
                    setAccounts(accounts);
                });
        }
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        setFilterRole({ min: '', max: '' });
        setAccounts(sortedAccounts(searchedAccounts()));
    }, [searchBar.value]);

    useEffect(() => {
        setAccounts(sortedAccounts());
    }, [order]);

    const searchedAccounts = () => {
        return allAccounts.filter(account => {
            if (!account
                || !account.username
                || !account.email) return false;
            if (!account.name || !account.phoneNumber) return true;
            const value = searchBar.value.toLowerCase().trim();
            if (searchBar.criterion === '' || value === '') return true;
            switch (searchBar.criterion) {
                case ('username'): {
                    if (account.username.toLowerCase().includes(value)) return true;
                    break;
                }
                case ('name'): {
                    if (account.name.toLowerCase().includes(value)) return true;
                    break;
                }
                case ('email'): {
                    if (account.email.toLowerCase().includes(value)) return true;
                    break;
                }
                case ('phoneNumber'): {
                    if (account.phoneNumber.toLowerCase().includes(value)) return true;
                    break;
                }
            }
            return false;
        })
    };

    const filteredAccounts = useMemo(() => {
        return accounts.filter(account => {
            if (!account || account.roleNum === undefined) return false;
            if (filterRole.min === '' && filterRole.max === '') return true;
            if (filterRole.min !== '' && account.roleNum < filterRole.min) return false;
            if (filterRole.max !== '' && account.roleNum > filterRole.max) return false;
            return true;
        });
    }, [
        accounts,
        filterRole,
    ]);

    const sortedAccounts = (prevAccounts?: Account[]) => {
        const newAccounts = prevAccounts ? prevAccounts : [...accounts];        
        return newAccounts.sort((a, b) => {
            const aValue = a[orderBy];
            const bValue = b[orderBy];
            if (aValue === undefined || bValue === undefined) return 0;

            return order === 'asc'
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
        });
    }

    const handleChangePage = (event, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
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
                            <TableCell>
                                <TableSortLabel
                                    className='username'
                                    active={orderBy === 'username'}
                                    direction={orderBy === 'username' ? order : 'asc'}
                                    onClick={handleRequestSort}
                                >
                                    Username
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    className='name'
                                    active={orderBy === 'name'}
                                    direction={orderBy === 'name' ? order : 'asc'}
                                    onClick={handleRequestSort}
                                >
                                    Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    className='role'
                                    active={orderBy === 'role'}
                                    direction={orderBy === 'role' ? order : 'asc'}
                                    onClick={handleRequestSort}
                                >
                                    Role
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    className='email'
                                    active={orderBy === 'email'}
                                    direction={orderBy === 'email' ? order : 'asc'}
                                    onClick={handleRequestSort}
                                >
                                    Email
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>Phone Number</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody
                        sx={{
                            '& .MuiTableCell-root': { fontSize: '0.85rem' },
                        }}
                    >
                        {filteredAccounts
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((account, index) => (
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
                                // onClick={() => onEventClick(eventItem)}
                                >
                                    <TableCell>{account.username}</TableCell>
                                    <TableCell>{account.name}</TableCell>
                                    <TableCell>{account.role}</TableCell>
                                    <TableCell>{account.email}</TableCell>
                                    <TableCell>{account.phoneNumber}</TableCell>
                                </TableRow>
                            ))}
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