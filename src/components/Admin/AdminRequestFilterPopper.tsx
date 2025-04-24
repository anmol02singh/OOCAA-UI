import React from 'react';
import { Box, ClickAwayListener, IconButton, Popper, TextField, Tooltip, Typography, useTheme } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { tokens } from '../../theme.tsx';
import { useFilterStyling } from '../../pages/Admin/AdminUtilities.tsx';

interface FilterPopperProps {
    pageWidth: number;
    handleToggleFilter: (event) => void;
    open: boolean;
    anchorEl: HTMLButtonElement | null;
    filterRole: {
        min: number | '',
        max: number | '',
    };
    setFilterRole: React.Dispatch<React.SetStateAction<{
        min: number | "";
        max: number | "";
    }>>;
    newFilterRole: {
        min: number | '',
        max: number | '',
    };
    setNewFilterRole: React.Dispatch<React.SetStateAction<{
        min: number | '';
        max: number | '';
    }>>;
    setSubmitFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminRequestFilterPopper: React.FC<FilterPopperProps> = ({
    handleToggleFilter,
    open,
    anchorEl,
    filterRole,
    setFilterRole,
    newFilterRole,
    setNewFilterRole,
    setSubmitFilter,
}) => {

    const {
        filterPopperContentContainer,
        reqFilterPopperContentSubcontainer,
        reqFilterSectionContainer,
        reqFilterInputContainer,
        reqFilterButtonContainer,
        filterTextField,
        fixFilterTextField,
        filterTextField_input,
        filterTextField_outline,
        fieldLabel,
    } = useFilterStyling();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const handleFilter = () => {
        setSubmitFilter(true);
    }

    const handleResetFilters = () => {
        setFilterRole({ min: '', max: '' });
        setNewFilterRole({ min: '', max: '' });
        setSubmitFilter(true);
    }

    const validateFilters = (filter, filterName, filterValue): boolean => {

        if (filterName !== 'min' && filterName !== 'max') return false;

        if (Number.isNaN(filterValue) || filterValue < 0 || filterValue > 2) return false;
        if (filterValue !== ''
            && filterName === 'min'
            && filter.max !== ''
            && filterValue > filter.max) return false;
        if (filterValue !== ''
            && filterName === 'max'
            && filter.min !== ''
            && filterValue < filter.min) return false;
        return true;
    }

    const handleCurrentFilterChange = (event) => {
        const filterName = event.target.name;
        const filterValue = event.target.value;

        if (!validateFilters(filterRole, filterName, filterValue)) return;
        setFilterRole({ ...filterRole, [filterName]: (filterValue === '') ? '' : filterValue })
    }

    const handleNewFilterChange = (event) => {
        const filterName = event.target.name;
        const filterValue = event.target.value;

        if (!validateFilters(newFilterRole, filterName, filterValue)) return;
        setNewFilterRole({ ...newFilterRole, [filterName]: (filterValue === '') ? '' : filterValue })
    }

    return (
        <Popper
            open={open}
            anchorEl={anchorEl}
            placement='bottom-end'
            sx={{
                zIndex: 2000,
                // transition: 'opacity 261ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            }}
        >
            <Box
                sx={filterPopperContentContainer}
            >
                <ClickAwayListener onClickAway={handleToggleFilter}>
                    <Box
                        sx={reqFilterPopperContentSubcontainer}
                    >
                        <Box
                            sx={reqFilterSectionContainer}
                        >
                            <Typography variant='h6' sx={fieldLabel}>
                                Current Role
                            </Typography>
                            <Box
                                sx={reqFilterInputContainer}
                            >
                                <TextField
                                    name='min'
                                    placeholder='Min (0-2)'
                                    type='number'
                                    value={filterRole.min}
                                    onChange={handleCurrentFilterChange}
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
                                <TextField
                                    name='max'
                                    placeholder='Max (0-2)'
                                    type='number'
                                    value={filterRole.max}
                                    onChange={handleCurrentFilterChange}
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
                            </Box>
                        </Box>
                        <Box
                            sx={reqFilterSectionContainer}
                        >
                            <Typography variant='h6' sx={fieldLabel}>
                                New Role
                            </Typography>
                            <Box
                                sx={reqFilterInputContainer}
                            >
                                <TextField
                                    name='min'
                                    placeholder='Min (0-2)'
                                    type='number'
                                    value={newFilterRole.min}
                                    onChange={handleNewFilterChange}
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
                                <TextField
                                    name='max'
                                    placeholder='Max (0-2)'
                                    type='number'
                                    value={newFilterRole.max}
                                    onChange={handleNewFilterChange}
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
                            </Box>
                        </Box>
                        <Box
                            sx={reqFilterButtonContainer}
                        >
                            <Tooltip
                                title="Save Filters"
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
                                <IconButton onClick={handleFilter}>
                                    <CheckIcon sx={{ color: colors.grey[100] }} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip
                                title="Reset Filters"
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
                                <IconButton onClick={handleResetFilters}>
                                    <RestartAltIcon sx={{ color: colors.grey[100] }} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
                </ClickAwayListener>
            </Box>
        </Popper>
    );
}
export default AdminRequestFilterPopper;