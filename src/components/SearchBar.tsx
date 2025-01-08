import React from 'react';
import { Box, InputBase, MenuItem, Select, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';

interface SearchBarProps {
  criteria: string;
  backgroundColor: string;
  textColor: string;
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

const SearchBar: React.FC<SearchBarProps> = ({
  criteria,
  onCriteriaChange,
  backgroundColor,
  textColor,
  value,
  onValueChange,
  onSearch,
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
        <MenuItem value="objectName">Object Name</MenuItem>
        <MenuItem value="objectType">Object Type</MenuItem>
        <MenuItem value="objectDesignator">Object Designator</MenuItem>
      </Select>
      <SearchBox flex={1} backgroundColor={backgroundColor}>
        <SearchIcon sx={{ color: textColor }} />
        <InputBase
          placeholder="Search objects here"
          value={value} 
          onChange={(e) => onValueChange(e.target.value)} 
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
        onClick={onSearch}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
