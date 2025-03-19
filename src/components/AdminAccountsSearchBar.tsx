import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, InputBase, MenuItem, Select, TextField, Typography, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import FilterListIcon from '@mui/icons-material/FilterList';
import { tokens } from '../theme.tsx';
import { useStyling } from '../pages/Admin/AdminUtilities.tsx';

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
    setSubmitSearch: React.Dispatch<React.SetStateAction<boolean>>;
    setSubmitFilter: React.Dispatch<React.SetStateAction<boolean>>;
    setSubmitReset: React.Dispatch<React.SetStateAction<boolean>>;
}

const AccountSearchBar: React.FC<SearchBarProps> = ({
    pageWidth,
    filterRole,
    setFilterRole,
    searchBar,
    setSearchBar,
    setSubmitSearch,
    setSubmitFilter,
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
        filterTextField,
        fixFilterTextField,
        filterTextField_input,
        filterTextField_outline,
        button,
        button_hover,
        fieldLabel,
    } = useStyling();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const handleCriterionChange = (criterion: string) => {
        setSearchBar({ ...searchBar, criterion: criterion });
    };

    const handleValueChange = (value: string) => {
        setSearchBar({ ...searchBar, value: value });
    };

    const handleSearch = () => {
        setSubmitSearch(true);
    }

    const handleFilter = () => {
        setSubmitFilter(true);
    }

    const handleFilterChange = (event) => {
        const filterName = event.target.name;
        if (filterName !== 'min' && filterName !== 'max') return;

        const filterValue = event.target.value;
        if (Number.isNaN(filterValue) || filterValue < 0 || filterValue > 2) return;
        if (filterValue !== ''
            && filterName === 'min'
            && filterRole.max !== ''
            && filterValue > filterRole.max) return;
        if (filterValue !== ''
            && filterName === 'max'
            && filterRole.min !== ''
            && filterValue < filterRole.min) return;
        setFilterRole({ ...filterRole, [filterName]: (filterValue === '') ? '' : filterValue })
    }

    const handleReset = () => {
        setFilterRole({ min: '', max: '' });
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
                <Typography variant='h6' sx={fieldLabel}>
                    Role =
                </Typography>
                <TextField
                    name='min'
                    label='Min (0-2)'
                    type='number'
                    value={filterRole.min}
                    onChange={handleFilterChange}
                    sx={{
                        ...filterTextField,
                        '& .MuiInputBase-root': {
                            ...fixFilterTextField,
                        },
                        '& .MuiInputBase-input': {
                            ...filterTextField_input,
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            ...filterTextField_outline,
                            '&:hover': {
                                borderColor: colors.grey[100],
                            },
                            '&.Mui-focused': {
                                border: 'none',
                            },
                        },
                        '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                            '-webkit-appearance': 'none',
                            margin: 0,
                        },
                        '& input[type=number]': {
                            '-moz-appearance': 'textfield',
                        },
                        '& .MuiInputLabel-root': {
                            display: 'flex',
                            flex: 'none',
                            justifyContent: 'left',
                            alignItems: 'center',
                            width: '100%',
                            height: '100%',
                            top: '50%',
                            transform: 'translateX(0.5rem) translateY(-50%)',
                        },
                    }}
                />
                <TextField
                    name='max'
                    label='Max (0-2)'
                    type='number'
                    value={filterRole.max}
                    onChange={handleFilterChange}
                    sx={{
                        ...filterTextField,
                        '& .MuiInputBase-root': {
                            ...fixFilterTextField,
                        },
                        '& .MuiInputBase-input': {
                            ...filterTextField_input,
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            ...filterTextField_outline,
                            '&:hover': {
                                borderColor: colors.grey[100],
                            },
                            '&.Mui-focused': {
                                border: 'none',
                            },
                        },
                        '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                            '-webkit-appearance': 'none',
                            margin: 0,
                        },
                        '& input[type=number]': {
                            '-moz-appearance': 'textfield',
                        },
                        '& .MuiInputLabel-root': {
                            display: 'flex',
                            flex: 'none',
                            justifyContent: 'left',
                            alignItems: 'center',
                            width: '100%',
                            height: '100%',
                            top: '50%',
                            transform: 'translateX(0.5rem) translateY(-50%)',
                        },
                    }}
                />
                <Button
                    onClick={handleFilter}
                    sx={{
                        ...button,
                        '&:hover': {
                            ...button_hover
                        },
                    }}
                >
                    <FilterListIcon sx={{ color: colors.grey[100] }} />
                </Button>
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