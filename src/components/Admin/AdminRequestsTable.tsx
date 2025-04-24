import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    useTheme,
} from '@mui/material';
import { DataGrid, GridColDef, GridRowId, GridSortItem } from '@mui/x-data-grid';
import { tokens } from '../../theme.tsx';
import { getAccounts, updateAccountsRole } from '../../API/account.tsx';
import { useGeneralStyling, useRoleChangeRequestsStyling } from '../../pages/Admin/AdminUtilities.tsx';
import { deleteRoleChangeRequest, getRoleChangeRequests } from '../../API/roleChangeRequest.tsx';

interface AccountTableProps {
    token: string | null;
    pageWidth: number;
    filterRole: {
        min: number | '',
        max: number | '',
    };
    setFilterRole: React.Dispatch<React.SetStateAction<{
        min: number | '';
        max: number | '';
    }>>;
    newFilterRole: {
        min: number | '',
        max: number | '',
    };
    setNewFilterRole: React.Dispatch<React.SetStateAction<{
        min: number | '';
        max: number | '';
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

interface RCRTableRow {
    _id: string,
    accountId: string,
    creationTime: string,
    username: string,
    name: string,
    role: string,
    roleNum: number,
    newRole: string,
    newRoleNum: number,
}

const AdminRequestsTable: React.FC<AccountTableProps> = ({
    token,
    pageWidth,
    filterRole,
    setFilterRole,
    newFilterRole,
    setNewFilterRole,
    searchBar,
    submitSearch,
    setSubmitSearch,
    submitFilter,
    setSubmitFilter,
    submitReset,
    setSubmitReset,
}) => {

    const {
        accountsDataGridContainer,
        accountsTableContainer,
        button_hover
    } = useGeneralStyling();

    const {
        acceptButton,
        denyButton,
    } = useRoleChangeRequestsStyling();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [searchedRows, setSearchedRows] = useState<RCRTableRow[]>([]);
    const [filteredRows, setFilteredRows] = useState<RCRTableRow[]>([]);
    const [sortedColumns, setSortedColumns] = useState<GridSortItem[]>([]);

    const getAllRCRRows = async () => {
        if (!token) return;

        const roleReqs = await getRoleChangeRequests(token);
        const rows: RCRTableRow[] = [];

        const promises = roleReqs.map(async (roleReq) => {
            if (!roleReq) return;

            const accounts = await getAccounts(token, roleReq.accountId);
            for (const account of accounts) {
                if (!account) continue;

                const row: RCRTableRow = {
                    _id: roleReq._id,
                    accountId: roleReq.accountId,
                    creationTime: roleReq.creationTime,
                    username: account.username ?? "",
                    name: account.name ?? "",
                    role: account.role ?? "",
                    roleNum: account.roleNum ?? -1,
                    newRole: roleReq.newRole,
                    newRoleNum: roleReq.newRoleNum,
                };

                rows.push(row);
            }
        });

        await Promise.all(promises);
        setSearchedRows(rows);
        setFilteredRows(rows);
    };

    useEffect(() => {
        getAllRCRRows();
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        handleSearch();
        //eslint-disable-next-line
    }, [submitSearch]);

    useEffect(() => {
        handleFilter();
        //eslint-disable-next-line
    }, [submitFilter]);

    useEffect(() => {
        handleReset();
        //eslint-disable-next-line
    }, [submitReset]);

    const handleSearch = () => {
        if (!submitSearch) return;

        //Reset filtering
        setFilterRole({ min: '', max: '' });
        setNewFilterRole({ min: '', max: '' });

        //Set requests to those that match the search.
        getSearchedRows().then((roleReqs) => {
            setSearchedRows(roleReqs);
            setFilteredRows(roleReqs);
        });

        //Disable submit flag.
        setSubmitSearch(false);
    }

    const handleFilter = () => {
        if (!submitFilter) return;

        //Filter current account list and disable submit flag.
        setFilteredRows(getFilteredRows(searchedRows));
        setSubmitFilter(false);
    }

    const handleAccept = async (params) => {
        if (!token) return;

        const row = params.row;

        updateAccountsRole(
            token,
            [row.username],
            row.newRoleNum,
        )
            .then(updateResult => {
                if (!updateResult) return;
                deleteRoleChangeRequest(token, row._id)
                    .then(deleteResult => {
                        if (!deleteResult) return;
                        setSubmitReset(true);
                    });
            });
    }

    const handleDeny = (params) => {
        if (!token) return;

        const row = params.row;
        deleteRoleChangeRequest(token, row._id)
            .then(deleteResult => {
                if (!deleteResult) return;
                setSubmitReset(true);
            });
    }

    const handleReset = () => {
        if (!submitReset) return;
        getAllRCRRows()
        setSortedColumns([]);
        setFilterRole({ min: '', max: '' });
        setNewFilterRole({ min: '', max: '' });
        setSubmitReset(false);
    }

    const getSearchedRows = async (): Promise<RCRTableRow[]> => {
        if (!token) return searchedRows;

        const value = searchBar.value.toLowerCase().trim();
        if (searchBar.criterion === '') return searchedRows;

        const params: {
            creationTime?: string,
            username?: string,
            name?: string,
            role?: undefined,
            newRole?: undefined,
        } = {}
        if (!(value === undefined
            || ((searchBar.criterion !== 'name') && value === ''))) {
            params.creationTime = searchBar.criterion === 'creationTime' ? value : undefined;
            params.username = searchBar.criterion === 'username' ? value : undefined;
            params.name = searchBar.criterion === 'name' ? value : undefined;
            params.role = undefined;
            params.newRole = undefined;
        }

        const roleReqs = await getRoleChangeRequests(token, ...Object.values(params));
        const rows: RCRTableRow[] = [];

        const promises = roleReqs.map(async (roleReq) => {
            if (!roleReq) return;

            const accounts = await getAccounts(token, roleReq.accountId);
            for (const account of accounts) {
                if (!account) continue;

                const row: RCRTableRow = {
                    _id: roleReq._id,
                    accountId: roleReq.accountId,
                    creationTime: roleReq.creationTime,
                    username: account.username ?? "",
                    name: account.name ?? "",
                    role: account.role ?? "",
                    roleNum: account.roleNum ?? -1,
                    newRole: roleReq.newRole,
                    newRoleNum: roleReq.newRoleNum,
                };

                rows.push(row);
            }
        });

        await Promise.all(promises);
        return rows;
    };

    const getFilteredRows = (prevRows?: RCRTableRow[]) => {
        const newRows = prevRows ? prevRows : filteredRows;

        if (filterRole.min === ''
            && filterRole.max === ''
            && newFilterRole.min === ''
            && newFilterRole.max === ''
        ) return newRows;

        return newRows.filter(row => {
            if (!row || row.roleNum === undefined || row.newRoleNum === undefined) return false;
            if (filterRole.min !== '' && row.roleNum < filterRole.min) return false;
            if (filterRole.max !== '' && row.roleNum > filterRole.max) return false;
            if (newFilterRole.min !== '' && row.newRoleNum < newFilterRole.min) return false;
            if (newFilterRole.max !== '' && row.newRoleNum > newFilterRole.max) return false;
            return true;
        });
    };

    const columns: GridColDef[] = [
        {
            field: 'creationTime',
            headerName: 'Created (UTC)',
            headerClassName: 'creationTime',
            flex: 1,
            minWidth: 150,
            resizable: false,
            filterable: false,
        },
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
            headerName: 'Current Role',
            headerClassName: 'role',
            flex: 1,
            minWidth: 130,
            resizable: false,
            filterable: false,
        },
        {
            field: 'newRole',
            headerName: 'New Role',
            headerClassName: 'newRole',
            flex: 1,
            minWidth: 130,
            resizable: false,
            filterable: false,
        },
        {
            field: 'Accept',
            headerName: '',
            headerClassName: 'accept',
            flex: 1,
            minWidth: 100,
            sortable: false,
            resizable: false,
            filterable: false,
            hideable: false,
            disableColumnMenu: true,
            renderCell: (params) => (
                <Button
                    onClick={() => handleAccept(params)}
                    sx={{
                        ...acceptButton,
                        '&:hover': {
                            ...button_hover
                        },
                    }}
                >
                    Accept
                </Button>
            ),
        },
        {
            field: 'Deny',
            headerName: '',
            headerClassName: 'deny',
            minWidth: 92,
            flex: 1,
            sortable: false,
            resizable: false,
            filterable: false,
            hideable: false,
            disableColumnMenu: true,
            renderCell: (params) => (
                <Button
                    onClick={() => handleDeny(params)}
                    sx={{
                        ...denyButton,
                        '&:hover': {
                            ...button_hover
                        },
                    }}
                >
                    Deny
                </Button>
            ),
        },
    ];

    const getRowId = (row: RCRTableRow): GridRowId => {
        return (row && row.username) ? row.username : filteredRows.indexOf(row);
    }

    return (
        <Box
            sx={accountsDataGridContainer}
        >
            <DataGrid
                rows={filteredRows}
                getRowId={getRowId}
                columns={columns}
                disableRowSelectionOnClick
                isRowSelectable={() => false}
                sortModel={sortedColumns}
                onSortModelChange={(newSortedColumns) =>
                    setSortedColumns(newSortedColumns as GridSortItem[])}
                pageSizeOptions={[5, 10, 25, 50, 100]}
                initialState={{
                    pagination: {
                        paginationModel: {
                            page: 0, pageSize: 5
                        }
                    }
                }}
                slotProps={{
                    columnMenu: {
                        style: {
                            backgroundColor: colors.primary[350],
                            borderRadius: '4px',
                        }
                    },
                    columnsPanel: {
                        style: {
                            backgroundColor: colors.primary[350],
                            borderRadius: '4px',
                        }
                    },
                    panel: {
                        sx: {
                            "& .MuiOutlinedInput-root": {
                                "&.Mui-focused fieldset": {
                                    borderColor: colors.primary[350],
                                },
                            },
                            "& .MuiCheckbox-root": {
                                color: colors.grey[100],
                                "&.Mui-checked": {
                                    color: colors.greenAccent[500],
                                },
                                "&.MuiCheckbox-indeterminate": {
                                    color: colors.greenAccent[500],
                                },
                                "&.Mui-disabled": {
                                    color: colors.grey[400],
                                },
                            },
                            "& .MuiButton-root": {
                                color: colors.blueAccent[400],
                                "&:hover": {
                                    color: colors.blueAccent[500],
                                },
                            },
                        },
                    },
                    pagination: {
                        SelectProps: {
                            MenuProps: {
                                PaperProps: {
                                    sx: {
                                        backgroundColor: colors.primary[350],
                                        backgroundImage: 'none',
                                    },
                                },
                            },
                        },
                    },
                }}
                sx={{
                    ...accountsTableContainer(pageWidth),
                    '& .MuiDataGrid-columnHeader': {
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
                        '&:focus': {
                            outline: 'none',
                        },
                        '&:focus-within': {
                            outline: 'none',
                        }
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        borderBottom: 'none',
                    },
                    '& .MuiDataGrid-columnSeparator': {
                        display: 'none',
                    },
                    '& .MuiDataGrid-row': {
                        cursor: 'pointer',
                        '&:hover': {
                            backgroundColor: "inherit",
                        },
                    },
                    '& .MuiDataGrid-cell': {
                        flexShrink: 0,
                        '&:focus': {
                            outline: 'none',
                        },
                        '&:focus-within': {
                            outline: 'none',
                        },
                    },
                }}
            />
        </Box>
    );
};

export default AdminRequestsTable;