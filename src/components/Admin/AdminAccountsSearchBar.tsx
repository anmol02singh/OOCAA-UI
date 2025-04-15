import React, { useState } from 'react';
import { Box, Button, InputBase, MenuItem, Select, Tooltip, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import FilterListIcon from '@mui/icons-material/FilterList';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { tokens } from '../../theme.tsx';
import { useFilterStyling, useGeneralStyling, useSearchStyling } from '../../pages/Admin/AdminUtilities.tsx';
import AdminFilterPopper from './AdminFilterPopper.tsx';
import AdminEditRoleDialogue from './AdminEditRoleDialogue.tsx';
import { smWindowWidth } from '../../pages/Profile/ProfileUtilities.tsx';
import AdminDeleteAccountDialogue from './AdminDeleteAccountDialogue.tsx';

interface SearchBarProps {
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
    setSearchBar: React.Dispatch<React.SetStateAction<{
        criterion: string;
        value: string;
    }>>;
    disabled: boolean;
    newRole: number;
    selectedAccountsAmount: number;
    setNewRole: React.Dispatch<React.SetStateAction<number>>;
    setSubmitSearch: React.Dispatch<React.SetStateAction<boolean>>;
    setSubmitFilter: React.Dispatch<React.SetStateAction<boolean>>;
    setSubmitEdit: React.Dispatch<React.SetStateAction<boolean>>;
    setSubmitDelete: React.Dispatch<React.SetStateAction<boolean>>;
    setSubmitReset: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminAccountsSearchBar: React.FC<SearchBarProps> = ({
    pageWidth,
    filterRole,
    setFilterRole,
    searchBar,
    setSearchBar,
    disabled,
    newRole,
    selectedAccountsAmount,
    setNewRole,
    setSubmitSearch,
    setSubmitFilter,
    setSubmitEdit,
    setSubmitDelete,
    setSubmitReset,
}) => {

    const {
        searchAndFilterContainer,
        button,
        button_hover,
    } = useGeneralStyling();

    const {
        searchAndSelectContainer,
        searchContainer,
        filterDropdown,
        searchField,
        searchField_outline,
        searchField_hover,
        searchField_focused,
    } = useSearchStyling();

    const {
        filterContainer,
    } = useFilterStyling();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [roleDialogueOpen, setRoleDialogueOpen] = React.useState(false);
    const [deleteDialogueOpen, setDeleteDialogueOpen] = React.useState(false);

    const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null)
    const open = Boolean(anchorEl);

    const handleCriterionChange = (criterion: string) => {
        setSearchBar({ ...searchBar, criterion: criterion });
    };

    const handleValueChange = (value: string) => {
        setSearchBar({ ...searchBar, value: value });
    };

    const handleSearch = (event) => {
        if(!('key' in event) || event.key === 'Enter'){
            setSubmitSearch(true);
        }
    }

    const handleToggleFilter = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    }

    const handleEdit = () => {
        setRoleDialogueOpen(true);
    }

    const handleEditClose = () => {
        setRoleDialogueOpen(false);
    };

    const handleDelete = () => {
        // setSubmitDelete(true);
        setDeleteDialogueOpen(true);
    }

    const handleDeleteClose = () => {
        setDeleteDialogueOpen(false);
    };

    const handleReset = () => {
        setFilterRole({ min: '', max: '' });
        setSearchBar({ criterion: 'username', value: '' })
        setSubmitReset(true);
    }

    const filterSelectMenu = (
        <Select
            value={searchBar.criterion}
            onChange={(event) => handleCriterionChange(event.target.value)}
            sx={filterDropdown}
            MenuProps={{
                PaperProps: {
                    sx: {
                        backgroundColor: colors.primary[350],
                        backgroundImage: 'none',
                    },
                },
            }}
        >
            <MenuItem value='username'>Username</MenuItem>
            <MenuItem value='name'>Name</MenuItem>
            <MenuItem value='email'>Email</MenuItem>
            <MenuItem value='phoneNumber'>Phone Number</MenuItem>
        </Select>
    );

    return (
        <Box sx={searchAndFilterContainer(pageWidth)}>
            <Box sx={searchAndSelectContainer(pageWidth)}>
                <Box sx={searchContainer}>
                    {pageWidth >= smWindowWidth && filterSelectMenu}
                    <Box sx={searchField}>
                        <InputBase
                            placeholder='Search accounts here'
                            value={searchBar.value}
                            onChange={(e) => handleValueChange(e.target.value)}
                            onKeyDown={handleSearch}
                            sx={{
                                ...searchField_outline,
                                '&:hover': {
                                    ...searchField_hover,
                                },
                                '&.Mui-focused': {
                                    ...searchField_focused,
                                }
                            }}
                        />
                    </Box>
                    <Button
                        onClick={handleSearch}
                        sx={{
                            ...button(pageWidth),
                            '&:hover': {
                                ...button_hover
                            },
                        }}
                    >
                        <SearchIcon sx={{ color: colors.grey[100] }} />
                    </Button>
                </Box>
                {pageWidth < smWindowWidth && (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                        }}
                    >
                        {filterSelectMenu}
                    </Box>
                )}
            </Box>
            <Box sx={filterContainer(pageWidth)}>
                <Tooltip
                    title="Filter Accounts"
                    arrow
                    enterDelay={1000}
                    enterNextDelay={1000}
                    slotProps={{
                        popper: {
                            sx: {
                                zIndex: 3000,
                            }
                        },
                        tooltip: {
                            sx: {
                                backgroundColor: colors.primary[350],
                                fontSize: '12px',
                            },
                        },
                        arrow: {
                            sx: {
                                color: colors.primary[350],
                            }
                        }
                    }}
                >
                    <Button
                        onClick={handleToggleFilter}
                        sx={{
                            ...button(pageWidth),
                            '&:hover': {
                                ...button_hover
                            },
                        }}
                    >
                        <FilterListIcon sx={{ color: colors.grey[100] }} />
                    </Button>
                </Tooltip>
                <AdminFilterPopper
                    pageWidth={pageWidth}
                    handleToggleFilter={handleToggleFilter}
                    open={open}
                    anchorEl={anchorEl}
                    filterRole={filterRole}
                    setFilterRole={setFilterRole}
                    setSubmitFilter={setSubmitFilter}
                />

                {!disabled && (
                    <>
                        <Tooltip
                            title="Edit Accounts"
                            arrow
                            enterDelay={1000}
                            enterNextDelay={1000}
                            slotProps={{
                                popper: {
                                    sx: {
                                        zIndex: 3000,
                                    }
                                },
                                tooltip: {
                                    sx: {
                                        backgroundColor: colors.primary[350],
                                        fontSize: '12px',
                                    },
                                },
                                arrow: {
                                    sx: {
                                        color: colors.primary[350],
                                    }
                                }
                            }}
                        >
                            <Button
                                onClick={handleEdit}
                                sx={{
                                    ...button(pageWidth),
                                    '&:hover': {
                                        ...button_hover
                                    },
                                }}
                            >
                                <EditIcon sx={{ color: colors.grey[100] }} />
                            </Button>
                        </Tooltip>
                        <Tooltip
                            title="Delete Accounts"
                            arrow
                            enterDelay={1000}
                            enterNextDelay={1000}
                            slotProps={{
                                popper: {
                                    sx: {
                                        zIndex: 3000,
                                    }
                                },
                                tooltip: {
                                    sx: {
                                        backgroundColor: colors.primary[350],
                                        fontSize: '12px',
                                    },
                                },
                                arrow: {
                                    sx: {
                                        color: colors.primary[350],
                                    }
                                }
                            }}
                        >
                            <Button
                                onClick={handleDelete}
                                sx={{
                                    ...button(pageWidth),
                                    '&:hover': {
                                        ...button_hover
                                    },
                                }}
                            >
                                <DeleteIcon sx={{ color: colors.grey[100] }} />
                            </Button>
                        </Tooltip>
                    </>
                )}
                <Tooltip
                    title="Reset Table"
                    arrow
                    enterDelay={1000}
                    enterNextDelay={1000}
                    slotProps={{
                        popper: {
                            sx: {
                                zIndex: 3000,
                            }
                        },
                        tooltip: {
                            sx: {
                                backgroundColor: colors.primary[350],
                                fontSize: '12px',
                            },
                        },
                        arrow: {
                            sx: {
                                color: colors.primary[350],
                            }
                        }
                    }}
                >
                    <Button
                        onClick={handleReset}
                        sx={{
                            ...button(pageWidth),
                            '&:hover': {
                                ...button_hover
                            },
                        }}
                    >
                        <RestartAltIcon sx={{ color: colors.grey[100] }} />
                    </Button>
                </Tooltip>
            </Box>
            <AdminEditRoleDialogue
                open={roleDialogueOpen}
                onClose={handleEditClose}
                pageWidth={pageWidth}
                newRole={newRole}
                setNewRole={setNewRole}
                setSubmitEdit={setSubmitEdit}
            />
            <AdminDeleteAccountDialogue
                open={deleteDialogueOpen}
                onClose={handleDeleteClose}
                pageWidth={pageWidth}
                selectedAccountsAmount={selectedAccountsAmount}
                setSubmitDelete={setSubmitDelete}
            />
        </Box>
    );
};

export default AdminAccountsSearchBar;