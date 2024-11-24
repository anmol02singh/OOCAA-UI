import React from "react";
import {
  Box,
  Select,
  MenuItem,
  SelectChangeEvent,
  TextField,
  InputAdornment,
  Button,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  label: string;
  searchType: string;
  onSearchTypeChange: (value: string) => void;
  placeholder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  label,
  searchType,
  onSearchTypeChange,
  placeholder,
}) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography
        variant="h6"
        sx={{
          color: "#B0B0B0",
          mb: 1,
        }}
      >
        {label}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          bgcolor: "#2A2A2A",
          p: 1.5,
          borderRadius: "5px",
        }}
      >
        <Select
          value={searchType}
          onChange={(event: SelectChangeEvent) =>
            onSearchTypeChange(event.target.value)
          }
          sx={{
            color: "#b0b0b0",
            bgcolor: "#3A3A3A",
            ".MuiSelect-icon": { color: "#b0b0b0" },
            borderRadius: "5px",
            minWidth: "fit-content",
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: "#2A2A2A",
                color: "#B0B0B0",
              },
            },
          }}
        >
          <MenuItem value="Object Name">Object Name</MenuItem>
          <MenuItem value="Object Type">Object Type</MenuItem>
          <MenuItem value="Object Designator">Object Designator</MenuItem>
        </Select>
        <TextField
          placeholder={placeholder}
          variant="outlined"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#B0B0B0" }} />
              </InputAdornment>
            ),
            sx: {
              bgcolor: "#3A3A3A",
              borderRadius: "8px",
              color: "#FFFFFF",
            },
          }}
          sx={{
            flexGrow: 1,
          }}
        />
        <Button
          variant="contained"
          sx={{
            bgcolor: "#2979FF",
            color: "#FFFFFF",
            "&:hover": { bgcolor: "#1E63D9" },
            textTransform: "none",
            borderRadius: "8px",
            width: "7rem",
          }}
        >
          Search
        </Button>
      </Box>
    </Box>
  );
};

export default SearchBar;
