import React, { useState, useEffect } from 'react';
import {
    Box,
    useTheme,
} from '@mui/material';
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import { tokens } from '../theme.tsx';
import { getAccounts, deleteAccounts, updateAccountsRole, userdata } from '../API/account.tsx';
import { Account } from '../types.tsx';
import { useGeneralStyling } from '../pages/Admin/AdminUtilities.tsx';

interface AccountTableProps {
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
    setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
    newRole: number;
    submitSearch: boolean;
    setSubmitSearch: React.Dispatch<React.SetStateAction<boolean>>;
    submitFilter: boolean;
    setSubmitFilter: React.Dispatch<React.SetStateAction<boolean>>;
    submitEdit: boolean;
    setSubmitEdit: React.Dispatch<React.SetStateAction<boolean>>;
    submitDelete: boolean;
    setSubmitDelete: React.Dispatch<React.SetStateAction<boolean>>;
    submitReset: boolean;
    setSubmitReset: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminAccountsTable: React.FC<AccountTableProps> = ({
    token,
    pageWidth,
    filterRole,
    setFilterRole,
    searchBar,
    setDisabled,
    newRole,
    submitSearch,
    setSubmitSearch,
    submitFilter,
    setSubmitFilter,
    submitEdit,
    setSubmitEdit,
    submitDelete,
    setSubmitDelete,
    submitReset,
    setSubmitReset,
}) => {

    const {
        accountsTableContainer,
    } = useGeneralStyling();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [searchedAccounts, setSearchedAccounts] = useState<Account[]>([]);
    const [filteredAccounts, setFilteredAccounts] = useState<Account[]>([]);
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [currentUser, setCurrentUser] = useState<Account>();

    useEffect(() => {
        if (token) {
            userdata(token)
                .then(account => {
                    setCurrentUser(account);
                });
            getAccounts(token)
                .then(accounts => {
                    setSearchedAccounts(accounts);
                    setFilteredAccounts(accounts);
                });
        }
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        updateButtons(selectedRows);
    }, [selectedRows]);

    useEffect(() => {
        handleSearch();
    }, [submitSearch]);

    useEffect(() => {
        handleFilter();
    }, [submitFilter]);

    useEffect(() => {
        handleEdit();
    }, [submitEdit]);

    useEffect(() => {
        handleDelete();
    }, [submitDelete]);

    useEffect(() => {
        handleReset();
    }, [submitReset]);

    const updateButtons = (selectedRows) => {
        if (selectedRows.length > 0) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }

    const handleSearch = () => {
        if (submitSearch) {
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
    }

    const handleFilter = () => {
        if (submitFilter) {
            //Filter current account list and disable submit flag.
            setFilteredAccounts(getFilteredAccounts(searchedAccounts));
            setSubmitFilter(false);
        }
    }

    const handleEdit = () => {
        if (submitEdit) {
            if (token) {
                updateAccountsRole(
                    token,
                    selectedRows.filter(username => filteredAccounts.map(account => {
                        if (!account || !account.username) return false;
                        return account.username.includes(username);
                    })),
                    newRole,
                )
                    .then(result => {
                        if (!result) return;
                        setSubmitReset(true);
                    });
            }
            setSubmitEdit(false);
        }
    }

    const handleDelete = () => {
        if (submitDelete) {
            if (token) {
                deleteAccounts(token, selectedRows.filter(username => filteredAccounts.map(account => {
                    if (!account || !account.username) return false;
                    return account.username.includes(username);
                })))
                    .then(result => {
                        if (!result) return;
                        setSubmitReset(true);
                    });
            }
            setSubmitDelete(false);
        }
    }

    const handleReset = () => {
        if (submitReset) {
            if (token) {
                getAccounts(token)
                    .then(accounts => {
                        setSearchedAccounts(accounts);
                        setFilteredAccounts(accounts);
                    });
            }
            setSelectedRows([]);
            setSubmitReset(false);
        }
    }

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
                return accounts;
            });
    };

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

    const columns: GridColDef[] = [
        {
            field: 'username',
            headerName: 'Username',
            headerClassName: 'username',
            flex: 1,
            minWidth: 150,
            resizable: false,
            filterable: false,
            hideable: false,
        },
        {
            field: 'name',
            headerName: 'Name',
            headerClassName: 'name',
            flex: 1,
            minWidth: 150,
            resizable: false,
            filterable: false,
        },
        {
            field: 'role',
            headerName: 'Role',
            headerClassName: 'role',
            flex: 1,
            minWidth: 130,
            resizable: false,
            filterable: false,
        },
        {
            field: 'email',
            headerName: 'Email',
            headerClassName: 'email',
            flex: 1,
            minWidth: 150,
            resizable: false,
            filterable: false,
        },
        {
            field: 'phoneNumber',
            headerName: 'Phone Number',
            headerClassName: 'phoneNumber',
            minWidth: 130,
            flex: 1,
            sortable: false,
            resizable: false,
            filterable: false,
        },
    ];

    const getRowId = (row: Account): GridRowId => {
        return (row && row.username) ? row.username : filteredAccounts.indexOf(row);
    }

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
            <DataGrid
                rows={filteredAccounts}
                getRowId={getRowId}
                columns={columns}
                rowSelectionModel={selectedRows}
                onRowSelectionModelChange={(newSelection) => setSelectedRows(newSelection as string[])}
                getRowClassName={(params) =>
                    currentUser !== undefined && params.row.username === currentUser.username
                        ? 'currentUser'
                        : ''
                }
                pageSizeOptions={[5, 10, 25, 50, 100]}
                initialState={{
                    pagination: {
                        paginationModel: {
                            page: 0, pageSize: 5
                        }
                    }
                }}
                checkboxSelection
                sx={{
                    ...accountsTableContainer(pageWidth),
                    "& .MuiDataGrid-columnHeader": {
                        flexShrink: 0,
                        color: colors.blueAccent[400],
                        '& .MuiDataGrid-sortIcon': {
                            color: colors.blueAccent[400],
                        },
                        '&.phoneNumber:hover': {
                            color: colors.blueAccent[400],
                        },
                        '&:hover': {
                            color: colors.blueAccent[500],
                            '& .MuiDataGrid-sortIcon': {
                                color: colors.blueAccent[500],
                            },
                        },
                        "&:focus": {
                            outline: "none",
                        },
                        "&:focus-within": {
                            outline: "none",
                        }
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-columnSeparator": {
                        display: "none",
                    },
                    "& .MuiDataGrid-row": {
                        cursor: 'pointer',
                        '&.currentUser': {
                            color: '#f44336',
                        },
                        '&.Mui-selected': {
                            backgroundColor: colors.primary[500],
                            '&:hover': {
                                backgroundColor: colors.primary[500],
                            },
                        },
                        '&:hover': {
                            backgroundColor: colors.primary[500],
                        },
                    },
                    "& .MuiDataGrid-checkboxInput": {
                        color: colors.grey[100],
                        '&.Mui-checked': {
                            color: colors.greenAccent[500],
                        },
                    },
                    "& .MuiDataGrid-cell": {
                        flexShrink: 0,
                        "&:focus": {
                            outline: "none",
                        },
                        "&:focus-within": {
                            outline: "none",
                        }
                    },
                }}
            />
        </Box>
    );
};

export default AdminAccountsTable;