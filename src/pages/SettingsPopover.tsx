import React, { useContext, useEffect, useState } from "react";
import { Box,Typography,Slider,IconButton, Button, List, ListItemText, Divider, TextField,Alert,useTheme} from "@mui/material";
import { ColorModeContext } from "./../theme.tsx";
import { tokens } from "./../theme.tsx";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { SettingsOutlined as SettingsOutlinedIcon } from "@mui/icons-material";
import ListItemButton from "@mui/material/ListItemButton";
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import { userdata, changePassword,changeUsername } from "../API/account.tsx";

const SettingsPopover = () => {
  const { textSize, setTextSize, toggleColorMode } = useContext(ColorModeContext);
  const [selectedSection, setSelectedSection] = useState("general");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isUpdatingUsername, setIsUpdatingUsername] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const MESSAGE_DISPLAY_DURATION = 3000;
  // For display settings (General)
  const handleTextSizeChange = (event: Event, newValue: number | number[]) => {
    const value = typeof newValue === "number" ? newValue : newValue[0];
    setTextSize(value);
    document.body.style.fontSize = `${value}px`;
  };


  // States for account preferences updates
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [usernameSuccess, setUsernameSuccess] = useState("");

  // Username update states
  const [showUsernameField, setShowUsernameField] = useState(false);
  const [newUsername, setNewUsername] = useState("");

  // Password update states
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [curPassword, setCurPassword] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [notificationChannels, setNotificationChannels] = useState(["SMS", "Email"]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setUsernameSuccess("");
      setUsernameError("");
      setSuccess("");
      setError("");
    }, MESSAGE_DISPLAY_DURATION);
  
    return () => clearTimeout(timer);
  }, [usernameSuccess, usernameError, success, error]);
  const handleUsernameUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUsernameError("");
    setUsernameSuccess("");
 
    try {
      if (!newUsername) {
        throw new Error("Please enter a new username");
      }
      if (newUsername.length < 4) {
        throw new Error("Username must be at least 4 characters");
      }
      if (!/^[a-zA-Z0-9_.]+$/.test(newUsername)) {
        throw new Error("Username can only contain letters, numbers, underscores or periods");
        
    }
    if (/\.\./.test(newUsername)) {
      throw new Error("Username cannot contain consecutive periods.");
    }
    if (/^\.|\.$/.test(newUsername)) {
      throw new Error("Username cannot start or end with a period.");
    }
      
      setIsUpdatingUsername(true);
      const token = localStorage.getItem("accountToken");
      if (!token) throw new Error("Authentication required");
      console.log("Token from localStorage:", token);
      if (!token) {
         console.error("No token found in localStorage!");
         setUsernameError("Authentication token not found. Please log in again."); 
         setIsUpdatingUsername(false); 
         return; 
      }
      const result = await changeUsername(token, newUsername);
  
      if (result && result.success) { 
        setUsernameSuccess(result.message || "Username updated successfully!"); 
        localStorage.setItem("accountToken", result.token);
    
        setShowUsernameField(false);
        setNewUsername("");
        setTimeout(() => setUsernameSuccess(""), MESSAGE_DISPLAY_DURATION);
    
      } else {
        setUsernameError(result?.message || "Failed to update username. Please try again.");
        setTimeout(() => setUsernameError(""), MESSAGE_DISPLAY_DURATION);
      }
    
    } catch (error: any) { 
        console.error("Error during username update:", error);
        setUsernameError(error.message || "An unexpected error occurred.");
        setTimeout(() => setUsernameError(""), MESSAGE_DISPLAY_DURATION);
    } finally {
      setIsUpdatingUsername(false);
    }
  }
  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (!curPassword || !newPass || !confirmNewPass) {
        throw new Error("All fields are required");
      }
      if (newPass !== confirmNewPass) {
        throw new Error("New passwords do not match");
      }
      if (curPassword === newPass) {
        throw new Error("New password must be different");
      }

      setIsUpdatingPassword(true);
      const token = localStorage.getItem("accountToken");
      if (!token) throw new Error("Authentication required");

      const result = await changePassword(token, curPassword, newPass);
      
      if (result.success) {
        setSuccess(result.message);
        setTimeout(() => {
          setShowPasswordField(false);
          setCurPassword("");
          setNewPass("");
          setConfirmNewPass("");
        }, MESSAGE_DISPLAY_DURATION,);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsUpdatingPassword(false);
    }
  };
  
  const toggleNotificationChannel = (channel: string) => {
    if (notificationChannels.includes(channel)) {
      setNotificationChannels(notificationChannels.filter(c => c !== channel));
    } else {
      setNotificationChannels([...notificationChannels, channel]);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.mode,
    color: theme.palette.mode,
    height: "100vh", // Full viewport height
    width: "100%",
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'hidden',
    overflowY: 'auto', // Prevent overall scrolling
      }}
    >
      <Box display="flex" sx={{ minHeight: '100%' /* Ensure flex container tries to fill height */ }}>
        {/* Sidebar */}
        <Box
          width="250px"
          bgcolor={theme.palette.mode  ? colors.primary[400] : colors.primary[100]}
          p={2}
          display="flex"
          flexDirection="column"
          boxShadow={2}
          sx={{overflowY: 'auto', overflowX: 'hidden', height: "100vh",}}
          
        >
          <Typography variant="h6" gutterBottom>
            Settings
          </Typography>
          <Divider />
          <List>
            <ListItemButton
              component="button"
              selected={selectedSection === "general"}
              onClick={() => setSelectedSection("general")}
              sx={{ cursor: "pointer" }}
            >
              <SettingsOutlinedIcon sx={{ mr: 1 }} />
              <ListItemText primary="General Settings" />
            </ListItemButton>
            <ListItemButton
              component="button"
              selected={selectedSection === "account"}
              onClick={() => setSelectedSection("account")}
              sx={{ cursor: "pointer" }}
            >
              <LockOutlinedIcon sx={{ mr: 1 }} />
              <ListItemText primary="Account Preferences" />
            </ListItemButton>
            <ListItemButton
              component="button"
              selected={selectedSection === "privacy"}
              onClick={() => setSelectedSection("privacy")}
              sx={{ cursor: "pointer" }}
            >
              <NotificationsActiveOutlinedIcon sx={{ mr: 1 }} />
              <ListItemText primary="Notification Preferences" />
            </ListItemButton>
          </List>
        </Box>

        {/* Settings Content */}
        <Box
          flex={1}
          p={4}
          bgcolor={theme.palette.mode}        
        >
          {selectedSection === "general" && (
            <>
              <Typography variant="h5" gutterBottom>
                General Settings
              </Typography>
              <Typography>Text Size</Typography>
              <Slider
                value={textSize}
                onChange={handleTextSizeChange}
                min={12}
                max={25}
                step={1}
                color="secondary"
                sx={{ width: '100%', maxWidth: 500, }}
              />
              <Typography>Theme</Typography>
              <IconButton onClick={toggleColorMode} sx={{ color: theme.palette.text.primary }}>
                {theme.palette.mode === "dark" ? (
                  <DarkModeOutlinedIcon />
                ) : (
                  <LightModeOutlinedIcon />
                )}
              </IconButton>
            </>
          )}
        {selectedSection === "account" && (
      <>
        <Typography variant="h5" gutterBottom>
          Account Preferences
        </Typography>
        {usernameError && (
      <Alert 
        severity="error" 
        sx={{ 
          mb: 1,
          maxWidth: '600px',
          whiteSpace: 'nowrap',
         mt: 1 
        }}
      >
        {usernameError}
      </Alert>
    )}
    
    {usernameSuccess && (
      <Alert 
        severity="success" 
        sx={{ 
          mb: 1,
          maxWidth: '600px',
          whiteSpace: 'nowrap',
         mt: 1 
        }}
      >
        {usernameSuccess}
      </Alert>
    )}
        {error && (
      <Alert 
        severity="error" 
        sx={{ 
          mb: 1,
          maxWidth: '600px',
          whiteSpace: 'nowrap',
          mt: 1 
        }}
      >
        {error}
      </Alert>
    )}
    
    {success && (
      <Alert 
        severity="success" 
        sx={{ 
          mb: 1,
          maxWidth: '600px',
          whiteSpace: 'nowrap',
          mt: 1 
        }}
      >
        {success}
      </Alert>
    )} 
        <Box mb={2}>
          {!showUsernameField ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setShowUsernameField(true)}
            >
              Change Username
            </Button>
          ) : (
            <Box component="form" onSubmit={handleUsernameUpdate} sx={{ maxWidth: 600 }}>
              <TextField
                label="New Username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                fullWidth
                sx={{ mb: 1 }}
              />
              <Box>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  disabled={isUpdatingUsername}
                >
                  {isUpdatingUsername ? "Updating..." : "Update Username"}
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    setShowUsernameField(false);
                    setNewUsername("");
                  }}
                  sx={{ ml: 1 }}
                  disabled={isUpdatingUsername}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          )}
        </Box>

        <Box mb={2}>
      {!showPasswordField ? (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setShowPasswordField(true)}
        >
          Change Password
        </Button>
      ) : (
        <Box component="form" onSubmit={handlePasswordUpdate} sx={{ maxWidth: 600 }}>
          <TextField
            label="Current Password"
            type="password"
            value={curPassword}
            onChange={(e) => setCurPassword(e.target.value)}
            fullWidth
            sx={{ mb: 1 }}
            required
          />
          
          <TextField
            label="New Password"
            type="password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            fullWidth
            sx={{ mb: 1 }}
            required
          />
          
          <TextField
            label="Confirm New Password"
            type="password"
            value={confirmNewPass}
            onChange={(e) => setConfirmNewPass(e.target.value)}
            fullWidth
            sx={{ mb: 1 }}
            required
          />

          <Box>
            <Button 
              type="submit" 
              variant="contained" 
              color="secondary"
              disabled={isUpdatingPassword}
            >
              {isUpdatingPassword ? "Updating..." : "Update Password"}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                setShowPasswordField(false);
                setCurPassword("");
                setNewPass("");
                setConfirmNewPass("");
              }}
              sx={{ ml: 1 }}
              disabled={isUpdatingPassword}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  </>
)}
          {selectedSection === "privacy" && (
            <>
              <Typography variant="h5" gutterBottom>
                Notification Choice
              </Typography>
              <Box display="flex" gap={1}>
                {["SMS", "Email"].map((channel) => (
                  <Button
                    key={channel}
                    variant="outlined"
                    color={notificationChannels.includes(channel) ? "secondary" : "inherit"}
                    onClick={() => toggleNotificationChannel(channel)}
                  >
                    {channel}
                  </Button>
                ))}
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SettingsPopover;
