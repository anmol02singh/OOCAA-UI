import React, { useState, useContext } from 'react';
import { Popover, Typography, Slider, IconButton,Button} from '@mui/material';
import { SettingsOutlined as SettingsOutlinedIcon } from '@mui/icons-material';
import { ColorModeContext } from './../theme.tsx';
import { Box, useTheme } from '@mui/material';
import { tokens } from './../theme.tsx';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
const SettingsPopover = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { textSize, setTextSize, toggleColorMode } = useContext(ColorModeContext);
  const [darkMode, setDarkMode] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTextSizeChange = (event, newValue) => {
    setTextSize(newValue);
    document.body.style.fontSize = `${newValue}px`;
  };
  const isPopoverOpen = Boolean(anchorEl);
  return (
    <div>
      <IconButton onClick={handleOpen}>
        <SettingsOutlinedIcon />
      </IconButton>
      <Popover
        open={isPopoverOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: {
            width: 300, // Set the width of the popover
            padding: 2, // Add some padding inside the popover
            borderRadius: 2, // Optional: make it rounded
            backgroundColor: colors.primary[400]
          }
        }}
      >
        <div className="settingsPopover">
          <Typography variant="h6" className="settingsTitle">Settings</Typography>
          <div>
            <Typography>Text Size</Typography>
            <Slider
              value={textSize}
              onChange={handleTextSizeChange}
              min={12}
              max={32}
              step={1}
            />
          </div>
          <div>
            <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === 'dark' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
            </IconButton>
          </div>
        </div>
        <div className="settingsOption">
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => alert('add changing password feature')}
            >
              Change Password
            </Button>
          </div>
      </Popover>
    </div>
  );
};

export default SettingsPopover;



{/* <div>
   <IconButton onClick={handleOpen}>
        <SettingsOutlinedIcon />
      </IconButton>
      <Popover
        open={isPopoverOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: {
            width: 300, // Set the width of the popover
            padding: 2, // Add some padding inside the popover
            borderRadius: 2, // Optional: make it rounded
            backgroundColor: colors.primary[400]
          }
        }}
      >
        <div className="settingsPopover">
          <Typography variant="h6" className="settingsTitle">
            Settings
          </Typography>
         
          <div className="settingsOption">
            <Typography>Text Size</Typography>
            <Slider
              value={textSize}
              onChange={handleTextSizeChange}
              min={12}
              max={32}
              step={1}
             
            />
          </div>
          <div className="settingsPopover">
          <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
        </IconButton>
          </div>
        </div>
        <div className="settingsOption">
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => alert('add changing password feature')}
            >
              Change Password
            </Button>
          </div>
      </Popover>
    </div> */}
