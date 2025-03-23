import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, ClickAwayListener, InputBase, MenuItem, Popper, Select, TextField, Typography, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import FilterListIcon from '@mui/icons-material/FilterList';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { tokens } from '../theme.tsx';
import { useStyling } from '../pages/Admin/AdminUtilities.tsx';
import AdminFilterPopper from './AdminFilterPopper.tsx';

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
    setSubmitSearch: React.Dispatch<React.SetStateAction<boolean>>;
    setSubmitFilter: React.Dispatch<React.SetStateAction<boolean>>;
    setSubmitEdit: React.Dispatch<React.SetStateAction<boolean>>;
    setSubmitDelete: React.Dispatch<React.SetStateAction<boolean>>;
    setSubmitReset: React.Dispatch<React.SetStateAction<boolean>>;
}

const AccountSearchBar: React.FC<SearchBarProps> = ({
    pageWidth,
    filterRole,
    setFilterRole,
    searchBar,
    setSearchBar,
    disabled,
    setSubmitSearch,
    setSubmitFilter,
    setSubmitEdit,
    setSubmitDelete,
    setSubmitReset,
}) => {

    const {
        searchAndFilterContainer,
        searchContainer,
        searchField,
        searchField_outline,
        searchField_hover,
        searchField_focused,
        filterContainer,
        filterDropdown,
        button,
        button_hover,
    } = useStyling();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null)
    const open = Boolean(anchorEl);

    const handleCriterionChange = (criterion: string) => {
        setSearchBar({ ...searchBar, criterion: criterion });
    };

    const handleValueChange = (value: string) => {
        setSearchBar({ ...searchBar, value: value });
    };

    const handleSearch = () => {
        setSubmitSearch(true);
    }

    const handleToggleFilter = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    }

    const handleEdit = () => {
        setSubmitEdit(true);
    }

    const handleDelete = () => {
        setSubmitDelete(true);
    }

    const handleReset = () => {
        setFilterRole({ min: '', max: '' });
        setSearchBar({ criterion: 'username', value: '' })
        setSubmitReset(true);
    }

    return (
        <Box sx={searchAndFilterContainer(pageWidth)}>
            <Box sx={searchContainer(pageWidth)}>
                <Select
                    value={searchBar.criterion}
                    onChange={(event) => handleCriterionChange(event.target.value)}
                    sx={filterDropdown}
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                backgroundColor: colors.primary[400],
                            },
                        },
                    }}
                >
                    <MenuItem value='username'>Username</MenuItem>
                    <MenuItem value='name'>Name</MenuItem>
                    <MenuItem value='email'>Email</MenuItem>
                    <MenuItem value='phoneNumber'>Phone Number</MenuItem>
                </Select>
                <Box sx={searchField}>
                    <InputBase
                        placeholder='Search accounts here'
                        value={searchBar.value}
                        onChange={(e) => handleValueChange(e.target.value)}
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
                        ...button,
                        '&:hover': {
                            ...button_hover
                        },
                    }}
                >
                    <SearchIcon sx={{ color: colors.grey[100] }} />
                </Button>
            </Box>
            <Box sx={filterContainer(pageWidth)}>
                <Button
                    onClick={handleToggleFilter}
                    sx={{
                        ...button,
                        '&:hover': {
                            ...button_hover
                        },
                    }}
                >
                    <FilterListIcon sx={{ color: colors.grey[100] }} />
                </Button>
                <AdminFilterPopper
                    pageWidth={pageWidth}
                    handleToggleFilter={handleToggleFilter}
                    open={open}
                    anchorEl={anchorEl}
                    setAnchorEl={setAnchorEl}
                    filterRole={filterRole}
                    setFilterRole={setFilterRole}
                    searchBar={searchBar}
                    setSearchBar={setSearchBar}
                    setSubmitSearch={setSubmitSearch}
                    setSubmitFilter={setSubmitFilter}
                    setSubmitEdit={setSubmitEdit}
                    setSubmitDelete={setSubmitDelete}
                    setSubmitReset={setSubmitReset}
                />

                {!disabled && (
                    <>
                        <Button
                            onClick={handleEdit}
                            sx={{
                                ...button,
                                '&:hover': {
                                    ...button_hover
                                },
                            }}
                        >
                            <EditIcon sx={{ color: colors.grey[100] }} />
                        </Button>
                        
                        <Button
                            onClick={handleDelete}
                            sx={{
                                ...button,
                                '&:hover': {
                                    ...button_hover
                                },
                            }}
                        >
                            <DeleteIcon sx={{ color: colors.grey[100] }} />
                        </Button>
                    </>
                )}

                <Button
                    onClick={handleReset}
                    sx={{
                        ...button,
                        '&:hover': {
                            ...button_hover
                        },
                    }}
                >
                    <RestartAltIcon sx={{ color: colors.grey[100] }} />
                </Button>
            </Box>
        </Box>
    );
};

export default AccountSearchBar;