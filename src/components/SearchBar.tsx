import React from 'react';
import { Box, InputBase, MenuItem, Select, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';

interface SearchBarProps {
  criteria: string;
  onCriteriaChange: (value: string) => void;
  backgroundColor: string;
  textColor: string;
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

const SearchBar: React.FC<SearchBarProps> = ({
  criteria,
  onCriteriaChange,
  backgroundColor,
  textColor,
}) => {
  return (
    <Box display="flex" alignItems="center" gap={2} mb={2}>
      <Select
        value={criteria}
        onChange={(e) => onCriteriaChange(e.target.value)}
        sx={{
          backgroundColor,
          color: textColor,
          height: '2.5rem',
          borderRadius: '4px',
        }}
      >
        <MenuItem value="name">Object Name</MenuItem>
        <MenuItem value="type">Object Type</MenuItem>
        <MenuItem value="designator">Object Designator</MenuItem>
      </Select>
      <SearchBox flex={1} backgroundColor={backgroundColor}>
        <SearchIcon sx={{ color: textColor }} />
        <InputBase
          placeholder="Search satellites here"
          sx={{
            ml: 1,
            flex: 1,
            color: textColor,
            height: '100%',
          }}
        />
      </SearchBox>
      <Button
        variant="contained"
        sx={{
          height: '2.5rem',
          backgroundColor: backgroundColor,
          color: textColor,
          boxShadow: 'none',
        }}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
