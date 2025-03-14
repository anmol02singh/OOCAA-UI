import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { tokens } from '../theme.tsx';

dayjs.extend(utc); 

interface TcaPickerProps {
  tcaRange: [number, number]; 
  onTcaChange: (newRange: [number, number]) => void;
}

const TcaPicker: React.FC<TcaPickerProps> = ({ tcaRange, onTcaChange }) => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleStartChange = (newValue: Dayjs | null) => {
    if (newValue) {
      const newStart = newValue.utc().valueOf(); 
      onTcaChange([newStart, tcaRange[1]]);
    }
  };

  const handleEndChange = (newValue: Dayjs | null) => {
    if (newValue) {
      const newEnd = newValue.utc().valueOf(); 
      onTcaChange([tcaRange[0], newEnd]);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box mt={4}>
            <Typography variant="h5" mb={2}>
                Filter by TCA Range [UTC]:
            </Typography>

            <Box display="flex" gap={2} mt={3}>
                <DateTimePicker
                    label="Start TCA"
                    value={dayjs.utc(tcaRange[0])}
                    onChange={handleStartChange}
                    ampm={false}
                    slotProps={{
                        desktopPaper: {
                          sx: {
                            backgroundColor: colors.primary[400],
                          },
                        },
                        actionBar: {
                            sx: {
                              '& .MuiButton-root': {
                                backgroundColor: theme.palette.background.default, 
                                color: colors.grey[100],
                              },
                            },
                          },
                      }}
                    sx={{
                        width: '100%', 
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: colors.primary[400], 
                        },
                    }}
                />
                <DateTimePicker
                    label="End TCA"
                    value={dayjs.utc(tcaRange[1])}
                    onChange={handleEndChange}
                    ampm={false}
                    slotProps={{
                        desktopPaper: {
                          sx: {
                            backgroundColor: colors.primary[400],
                          },
                        },
                        actionBar: {
                            sx: {
                              '& .MuiButton-root': {
                                backgroundColor: theme.palette.background.default, 
                                color: colors.grey[100],
                              },
                            },
                          },
                      }}
                    sx={{
                        width: '100%', 
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: colors.primary[400], 
                        },
                    }}
                />
            </Box>
        </Box>
    </LocalizationProvider>
  );
};

export default TcaPicker;
