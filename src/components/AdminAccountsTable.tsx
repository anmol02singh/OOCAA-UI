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
    Checkbox,
} from '@mui/material';
import { tokens } from '../theme.tsx';
import { getAccounts } from '../API/account.tsx';
import { Account } from '../types.tsx';
import { useStyling } from '../pages/Admin/AdminUtilities.tsx';

interface EventTableProps {
    token: string | null;
    pageWidth: number;
    filterRole: {
        min: number | '',
        max: number | '',
    };
    setFilterRole: React.Dispatch<React.SetStateAction<{
        min: number | "";
        max: number | "";
    }>>;
    searchBar: {
        criterion: string;
        value: string;
    };
    submitSearch: boolean;
    setSubmitSearch: React.Dispatch<React.SetStateAction<boolean>>;
    submitFilter: boolean;
    setSubmitFilter: React.Dispatch<React.SetStateAction<boolean>>;
    submitReset: boolean;
    setSubmitReset: React.Dispatch<React.SetStateAction<boolean>>;
}

type SortDirection = 'asc' | 'desc';
type SortColumn = 'username' | 'name' | 'role' | 'email';

const AdminAccountsTable: React.FC<EventTableProps> = ({
    token,
    pageWidth,
    filterRole,
    setFilterRole,
    searchBar,
    submitSearch,
    setSubmitSearch,
    submitFilter,
    setSubmitFilter,
    submitReset,
    setSubmitReset,
}) => {

    const {
        accountsTableContainer,
    } = useStyling();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [searchedAccounts, setSearchedAccounts] = useState<Account[]>([]);
    const [filteredAccounts, setFilteredAccounts] = useState<Account[]>([]);

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
                    setSearchedAccounts(accounts);
                    setFilteredAccounts(accounts);
                });
        }
        //eslint-disable-next-line
    }, []);

    //When you submit a search, reset sorting and filtering, then list the matching accounts.
    useEffect(() => {
        if (submitSearch) {
            //Reset sorting           
            setOrder('asc');

            //Reset filtering
            setFilterRole({ min: '', max: '' });

            //Set accounts to those that match the search.
            getSearchedAccounts().then((accounts) => {
                setSearchedAccounts(accounts);
                setFilteredAccounts(accounts);
            });

            //Disable submit flag.
            setSubmitSearch(false);
        }
    }, [submitSearch]);

    //When you submit filtering, filter the current account list. 
    useEffect(() => {
        if (submitFilter) {
            //Filter current account list and disable submit flag.
            setFilteredAccounts(getFilteredAccounts(getSortedAccounts(searchedAccounts)));
            setSubmitFilter(false);
        }
    }, [submitFilter]);

    //When you reset filtering, search and sort the original account list again.
    useEffect(() => {
        if (submitReset) {
            //Sort searched account list and disable reset flag.
            setFilteredAccounts(getSortedAccounts(searchedAccounts));
            setSubmitReset(false);
        }
    }, [submitReset]);

    //When you change the sort direction, sort the current account list.
    useEffect(() => {
        //Sort current account list.
        setFilteredAccounts(getSortedAccounts());
    }, [order]);

    const getSearchedAccounts = async (): Promise<Account[]> => {
        if (!token) return searchedAccounts;

        const value = searchBar.value.toLowerCase().trim();
        if (searchBar.criterion === '') return searchedAccounts;

        const params: {
            name?: string,
            username?: string,
            role?: undefined,
            email?: string,
            phoneNumber?: string,
        } = {}
        if (value !== '') {
            params.name = searchBar.criterion === "name" ? value : undefined;
            params.username = searchBar.criterion === "username" ? value : undefined;
            params.role = undefined;
            params.email = searchBar.criterion === "email" ? value : undefined;
            params.phoneNumber = searchBar.criterion === "phoneNumber" ? value : undefined;
        }

        return await getAccounts(token, ...Object.values(params))
            .then(accounts => {
                //Sort Accounts by username.
                accounts.sort((a, b) => {
                    const aValue = a[orderBy];
                    const bValue = b[orderBy];
                    if (aValue === undefined || bValue === undefined) return 0;

                    return aValue.localeCompare(bValue);
                });
                return accounts;
            });
    };

    const getSortedAccounts = (prevAccounts?: Account[]) => {
        const newAccounts = prevAccounts ? prevAccounts : [...filteredAccounts];
        return newAccounts.sort((a, b) => {
            const aValue = a[orderBy];
            const bValue = b[orderBy];
            if (aValue === undefined || bValue === undefined) return 0;

            return order === 'asc'
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
        });
    }

    const getFilteredAccounts = (prevAccounts?: Account[]) => {
        const newAccounts = prevAccounts ? prevAccounts : filteredAccounts;
        if (filterRole.min === '' && filterRole.max === '') return newAccounts;
        return newAccounts.filter(account => {
            if (!account || account.roleNum === undefined) return false;
            if (filterRole.min !== '' && account.roleNum < filterRole.min) return false;
            if (filterRole.max !== '' && account.roleNum > filterRole.max) return false;
            return true;
        });
    };

    const handleChangePage = (event, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                flexGrow: '1',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                mx: "auto",
                minWidth: 0,
            }}
        >
            <TableContainer
                component={Paper}
                sx={accountsTableContainer(pageWidth)}
            >
                <Table
                    sx={{
                        borderRadius: '4px',
                        minWidth: '30rem',
                        whiteSpace: 'nowrap',
                    }}
                >
                    <TableHead
                        sx={{
                            '& .MuiTableCell-root': {
                                fontSize: '0.9rem',
                                color: colors.blueAccent[400],
                                fontWeight: 'bold',
                            },
                        }}
                    >
                        <TableRow>
                            <TableCell />
                            <TableCell>
                                <TableSortLabel
                                    className='username'
                                    active={orderBy === 'username'}
                                    direction={orderBy === 'username' ? order : 'asc'}
                                    onClick={handleRequestSort}
                                    sx={{
                                        '&:hover': {
                                            color: colors.blueAccent[500],
                                        },
                                        '& .MuiTableSortLabel-icon': {
                                            color: 'inherit',
                                        },
                                        '&.MuiButtonBase-root.MuiTableSortLabel-root.Mui-active': {
                                            color: colors.blueAccent[400],
                                            '&:hover': {
                                                color: colors.blueAccent[500],
                                            },
                                            '& .MuiTableSortLabel-icon': {
                                                color: 'inherit',
                                            }
                                        }
                                    }}
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
                                    sx={{
                                        '&:hover': {
                                            color: colors.blueAccent[500],
                                        },
                                        '& .MuiTableSortLabel-icon': {
                                            color: 'inherit',
                                        },
                                        '&.MuiButtonBase-root.MuiTableSortLabel-root.Mui-active': {
                                            color: colors.blueAccent[400],
                                            '&:hover': {
                                                color: colors.blueAccent[500],
                                            },
                                            '& .MuiTableSortLabel-icon': {
                                                color: 'inherit',
                                            }
                                        }
                                    }}
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
                                    sx={{
                                        '&:hover': {
                                            color: colors.blueAccent[500],
                                        },
                                        '& .MuiTableSortLabel-icon': {
                                            color: 'inherit',
                                        },
                                        '&.MuiButtonBase-root.MuiTableSortLabel-root.Mui-active': {
                                            color: colors.blueAccent[400],
                                            '&:hover': {
                                                color: colors.blueAccent[500],
                                            },
                                            '& .MuiTableSortLabel-icon': {
                                                color: 'inherit',
                                            }
                                        }
                                    }}
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
                                    sx={{
                                        '&:hover': {
                                            color: colors.blueAccent[500],
                                        },
                                        '& .MuiTableSortLabel-icon': {
                                            color: 'inherit',
                                        },
                                        '&.MuiButtonBase-root.MuiTableSortLabel-root.Mui-active': {
                                            color: colors.blueAccent[400],
                                            '&:hover': {
                                                color: colors.blueAccent[500],
                                            },
                                            '& .MuiTableSortLabel-icon': {
                                                color: 'inherit',
                                            }
                                        }
                                    }}
                                >
                                    Email
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>Phone Number</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody
                        sx={{
                            '& .MuiTableCell-root': { fontSize: '0.9rem' },
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
                                            backgroundColor: colors.primary[500],
                                        },
                                    }}
                                // onClick={() => onEventClick(eventItem)}
                                >
                                    <TableCell>
                                        <Checkbox
                                            key={index}
                                            // checked={checked}
                                            // onChange={handleChange}
                                            sx={{
                                                color: colors.grey[100],
                                                '&.Mui-checked': {
                                                    color: colors.greenAccent[500],
                                                },
                                            }}
                                        />
                                    </TableCell>
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