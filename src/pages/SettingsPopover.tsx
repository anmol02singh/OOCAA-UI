import React, { useContext, useState } from "react";
import { Box, Typography, Slider, IconButton, Button, List, ListItem, ListItemText, Divider, useTheme } from "@mui/material";
import { ColorModeContext } from "./../theme.tsx";
import { tokens } from "./../theme.tsx";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { SettingsOutlined as SettingsOutlinedIcon } from '@mui/icons-material';

const SettingsPopover = () => {
  const { textSize, setTextSize, toggleColorMode } = useContext(ColorModeContext);
  const [selectedSection, setSelectedSection] = useState("general");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleTextSizeChange = (event, newValue) => {
    setTextSize(newValue);
    document.body.style.fontSize = `${newValue}px`;
  };
  const handleOpen = (event) => { setAnchorEl(event.currentTarget); };
  return (
    <div>
      <IconButton onClick={handleOpen}>
         <SettingsOutlinedIcon />
     </IconButton>
    <Box display="flex" height="100vh">
      {/* Sidebar */}
      <Box
        width="250px"
        bgcolor={colors.primary[400]}
        p={2}
        display="flex"
        flexDirection="column"
        boxShadow={2}
      >
        <Typography variant="h6" gutterBottom>
          Settings
        </Typography>
        <Divider />
        <List>
        <ListItem 
  component="button"
  selected={selectedSection === "account"} 
  onClick={() => setSelectedSection("account")} 
  sx={{ cursor: "pointer" }}
>
  <LockOutlinedIcon sx={{ mr: 1 }} />
  <ListItemText primary="Account Preferences" />
</ListItem>

<ListItem 
  component="button"
  selected={selectedSection === "privacy"} 
  onClick={() => setSelectedSection("privacy")} 
  sx={{ cursor: "pointer" }}
>
  <SecurityOutlinedIcon sx={{ mr: 1 }} />
  <ListItemText primary="Data & Privacy" />
</ListItem>

        </List>
      </Box>

      {/* Settings Content */}
      <Box flex={1} p={4} bgcolor={colors.primary[500]}>
        {selectedSection === "general" && (
          <>
            <Typography variant="h5" gutterBottom>General Settings</Typography>
            <Typography>Text Size</Typography>
            <Slider value={textSize} onChange={handleTextSizeChange} min={12} max={32} step={1} />
            <Typography>Theme</Typography>
            <IconButton onClick={toggleColorMode}>
              {theme.palette.mode === "dark" ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
            </IconButton>
          </>
        )}
        {selectedSection === "account" && (
          <>
            <Typography variant="h5" gutterBottom>Account Preferences</Typography>
            <Button variant="outlined" color="secondary" onClick={() => alert("Change username feature")}>
              Change Username
            </Button>
            <Button variant="outlined" color="secondary" sx={{ ml: 2 }} onClick={() => alert("Change email feature")}>
              Change Email
            </Button>
          </>
        )}
        {selectedSection === "privacy" && (
          <>
            <Typography variant="h5" gutterBottom>Data & Privacy</Typography>
            <Button variant="outlined" color="secondary" onClick={() => alert("Manage data feature")}>
              Manage Your Data
            </Button>
            <Button variant="outlined" color="error" sx={{ ml: 2 }} onClick={() => alert("Delete account feature")}>
              Delete Account
            </Button>
          </>
        )}
      </Box>
    </Box>
    </div>
    
  );
};
export default SettingsPopover;
