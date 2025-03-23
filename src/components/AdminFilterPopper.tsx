import React from 'react';
import { Box, ClickAwayListener, IconButton, Popper, TextField, Typography, useTheme } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { tokens } from '../theme.tsx';
import { useStyling } from '../pages/Admin/AdminUtilities.tsx';

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
    setSubmitFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminFilterPopper: React.FC<FilterPopperProps> = ({
    handleToggleFilter,
    open,
    anchorEl,
    filterRole,
    setFilterRole,
    setSubmitFilter,
}) => {

    const {
        filterTextField,
        fixFilterTextField,
        filterTextField_input,
        filterTextField_outline,
        fieldLabel,
    } = useStyling();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const handleFilter = () => {
        setSubmitFilter(true);
    }

    const handleResetFilters = () => {
        setFilterRole({ min: '', max: '' });
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
                sx={{
                    display: 'flex',
                    flex: '0 1 0',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flext-start',
                    padding: '0.5rem',
                    gap: '0.25rem',
                    borderRadius: '4px',
                    backgroundColor: colors.primary[400],
                    boxShadow: `
                        0px 5px 5px -3px rgba(0,0,0,0.2),
                        0px 8px 10px 1px rgba(0,0,0,0.14),
                        0px 3px 14px 2px rgba(0,0,0,0.12)`,
                    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.119), rgba(255, 255, 255, 0.119))',
                }}
            >
                <ClickAwayListener onClickAway={handleToggleFilter}>
                    <div>
                        <Typography variant='h6' sx={fieldLabel}>
                            Role
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flex: '0 1 0',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '0.5rem',
                            }}
                        >
                            <TextField
                                name='min'
                                placeholder='Max (0-2)'
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
                                }}
                            />
                            <TextField
                                name='max'
                                placeholder='Max (0-2)'
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
                            <IconButton onClick={handleFilter}>
                                <CheckIcon sx={{ color: colors.grey[100] }} />
                            </IconButton>
                            <IconButton onClick={handleResetFilters}>
                                <RestartAltIcon sx={{ color: colors.grey[100] }} />
                            </IconButton>
                        </Box>
                    </div>
                </ClickAwayListener>
            </Box>
        </Popper>
    );
}
export default AdminFilterPopper;