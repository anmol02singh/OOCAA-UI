import React from 'react';
import { Box, TextField, Button, MenuItem, useTheme } from '@mui/material';
import { tokens } from '../theme.tsx';

export type NumericOperator = 'lte' | 'gte' | 'eq';

export interface ExtraFilters {
  missDistanceValue?: number;
  missDistanceOperator: NumericOperator;
  collisionProbabilityValue?: number;
  collisionProbabilityOperator: NumericOperator;
  operatorOrganization: string;
}

interface EventFiltersProps {
  filters: ExtraFilters;
  setFilters: React.Dispatch<React.SetStateAction<ExtraFilters>>;
}

const EventFilters: React.FC<EventFiltersProps> = ({ filters, setFilters }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box display="flex" gap={2} mb={2} mt={2}>
        <TextField
            fullWidth
            sx={{
                backgroundColor: colors.primary[400],
                color: colors.grey[100],
            }}
            select
            label="Miss Distance Operator"
            variant="outlined"
            size="small"
            value={filters.missDistanceOperator}
            onChange={(e) =>
            setFilters((prev) => ({
                ...prev,
                missDistanceOperator: e.target.value as NumericOperator,
            }))
            }
            slotProps={{
                select: {
                  MenuProps: {
                    PaperProps: {
                      sx: { backgroundColor: colors.primary[400], color: colors.grey[100] },
                    },
                  },
                },
              }}
        >
            <MenuItem value="lte">{"≤"}</MenuItem>
            <MenuItem value="gte">{"≥"}</MenuItem>
            <MenuItem value="eq">{"="}</MenuItem>
      </TextField>
      <TextField
        fullWidth
        sx={{
          backgroundColor: colors.primary[400],
          color: colors.grey[100],
          '& input[type=number]': {
            '-moz-appearance': 'textfield',
          },
          '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0,
          },
        }}
        label="Miss Distance (m)"
        variant="outlined"
        size="small"
        type="number"
        value={filters.missDistanceValue !== undefined ? filters.missDistanceValue : ''}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            missDistanceValue: e.target.value === '' ? undefined : Number(e.target.value),
          }))
        }
      />
      <TextField
        fullWidth
        sx={{
          backgroundColor: colors.primary[400],
          color: colors.grey[100],
        }}
        select
        label="Collision Probability Operator"
        variant="outlined"
        size="small"
        value={filters.collisionProbabilityOperator}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            collisionProbabilityOperator: e.target.value as NumericOperator,
          }))
        }
        slotProps={{
            select: {
              MenuProps: {
                PaperProps: {
                  sx: { backgroundColor: colors.primary[400], color: colors.grey[100] },
                },
              },
            },
          }}
      >
        <MenuItem value="lte">{"≤"}</MenuItem>
        <MenuItem value="gte">{"≥"}</MenuItem>
        <MenuItem value="eq">{"="}</MenuItem>
      </TextField>
      <TextField
        fullWidth
        sx={{
            backgroundColor: colors.primary[400],
            color: colors.grey[100],
            '& input[type=number]': {
              '-moz-appearance': 'textfield',
            },
            '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
              '-webkit-appearance': 'none',
              margin: 0,
            },
        }}
        label="Collision Probability"
        variant="outlined"
        size="small"
        type="number"
        value={
          filters.collisionProbabilityValue !== undefined ? filters.collisionProbabilityValue : ''
        }
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            collisionProbabilityValue: e.target.value === '' ? undefined : Number(e.target.value),
          }))
        }
      />
      <TextField
        fullWidth
        sx={{
          backgroundColor: colors.primary[400],
          color: colors.grey[100],
        }}
        label="Operator Organization"
        variant="outlined"
        size="small"
        value={filters.operatorOrganization}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            operatorOrganization: e.target.value,
          }))
        }
      />
      <Button
        fullWidth
        sx={{
            backgroundColor: colors.primary[400],
            color: colors.grey[100],
            width: '50%',
            whiteSpace: 'nowrap',
        }}
        variant="outlined"
        onClick={() => {
            setFilters({
                missDistanceValue: undefined,
                missDistanceOperator: 'lte',
                collisionProbabilityValue: undefined,
                collisionProbabilityOperator: 'gte',
                operatorOrganization: '',
              })
        }}
        >
        Reset Filters
        </Button>
    </Box>
  );
};

export default EventFilters;
