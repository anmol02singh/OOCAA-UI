import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, InputBase, MenuItem, Select, TextField, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';
import { tokens } from '../theme.tsx';
import { useGeneralStyling } from '../pages/Admin/AdminUtilities.tsx';

interface SearchBarProps {
    pageWidth: number;
    criterion: string;
    value: string;
    onCriteriaChange: (value: string) => void;
    onValueChange: (value: string) => void;
    onSearch: () => void;
}

const SearchBox = styled(Box)<{ backgroundColor: string; }>(
    ({ backgroundColor }) => ({
        display: 'flex',
        alignItems: 'center',
        backgroundColor,
        borderRadius: '4px',
        padding: '0 10px',
        height: '2.5rem',
    })
);


const AccountSearchBar: React.FC<SearchBarProps> = ({
    pageWidth,
    criterion,
    onCriteriaChange,
    value,
    onValueChange,
    onSearch,
}) => {

    const {
        searchAndFilterContainer,
        searchContainer,
        filterContainer,
        filterTextField,
        fixFilterTextField,
        filterTextField_input,
        filterTextField_outline,
        button,
        button_hover,
    } = useGeneralStyling();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    //Accounts
    const [filterRole, setFilterRole] = useState<{ min: number | '', max: number | '' }>({
        min: '',
        max: '',
    });

    const handleReset = () => {
        setFilterRole({ min: '', max: '' });
    }

    const handleFilterChange = (event) => {
        const filterName = event.target.name;
        if (filterName !== 'min' || filterName !== 'max') return;
        setFilterRole({ ...filterRole, [filterName]: (event.target.value === '') ? '' : event.target.value })
    }

    return (
        <Box sx={searchAndFilterContainer(pageWidth)}>
            <Box sx={searchContainer}>
                <Select
                    value={criterion}
                    onChange={(event) => onCriteriaChange(event.target.value)}
                    sx={{
                        backgroundColor: colors.primary[400],
                        color: colors.grey[100],
                        height: '2.5rem',
                        borderRadius: '4px',
                    }}
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                backgroundColor: colors.primary[400],
                            },
                        },
                    }}
                >
                    <MenuItem value='Username'>Username</MenuItem>
                    <MenuItem value='Name'>Name</MenuItem>
                    <MenuItem value='Email'>Email</MenuItem>
                    <MenuItem value='PhoneNumber'>Phone Number</MenuItem>
                </Select>
                <SearchBox flex={1} backgroundColor={colors.primary[400]}>
                    <SearchIcon sx={{ color: colors.grey[100] }} />
                    <InputBase
                        placeholder='Search accounts here'
                        value={value}
                        onChange={(e) => onValueChange(e.target.value)}
                        sx={{
                            marginLeft: 1,
                            flex: 1,
                            color: colors.grey[100],
                            height: '100%',
                        }}
                    />
                </SearchBox>
            </Box>
            <Box sx={filterContainer}>
                <TextField
                    name='min'
                    label='Min'
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
                    label='Max'
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
                    }}
                />
                <Button
                    onClick={handleReset}
                    sx={{
                        ...button,
                        '&:hover': {
                            ...button_hover
                        },
                    }}
                >
                    Reset Filters
                </Button>
            </Box>
        </Box>
    );
};

export default AccountSearchBar;