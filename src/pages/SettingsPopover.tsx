import React, { useContext, useState } from "react";
import { Box,Typography,Slider,IconButton, Button, List, ListItemText, Divider, TextField,Alert,useTheme,LinearProgress} from "@mui/material";
import { ColorModeContext } from "./../theme.tsx";
import { tokens } from "./../theme.tsx";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { SettingsOutlined as SettingsOutlinedIcon } from "@mui/icons-material";
import ListItemButton from "@mui/material/ListItemButton";
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import { userdata, changePassword } from "../API/account.js";

const SettingsPopover = () => {
  const { textSize, setTextSize, toggleColorMode } = useContext(ColorModeContext);
  const [selectedSection, setSelectedSection] = useState("general");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [loading, setLoading] = useState(false);

  // For display settings (General)
  const handleTextSizeChange = (event: Event, newValue: number | number[]) => {
    const value = typeof newValue === "number" ? newValue : newValue[0];
    setTextSize(value);
    document.body.style.fontSize = `${value}px`;
  };

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // States for account preferences updates
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

  const handleUsernameUpdate = () => {
    setError("");
    setSuccess("");
    if (!newUsername) {
      setError("Please enter a new username.");
      setTimeout(() => setError(""), 3000);

      return;
    }
    setSuccess("Username updated successfully!");
    setShowUsernameField(false);
    setNewUsername("");
   
  };

  const handlePasswordUpdate = async(e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!curPassword || !newPass || !confirmNewPass) {
      setError("Please fill in all password fields.");
      setTimeout(() => setError(""), 3000);

      return;
    }
    if (newPass !== confirmNewPass) {
      setError("New passwords do not match.");
      setTimeout(() => setError(""), 3000);

      return;
    }
    if (curPassword == newPass) {
      setError("Enter New Password.");
      setTimeout(() => setError(""), 3000);

      return;
    }
    setSuccess("Password updated successfully!");
    setTimeout(() => setSuccess(""), 3000);
    setShowPasswordField(false);
    setCurPassword("");
    setNewPass("");
    setConfirmNewPass("");
    try {
      setLoading(true);
      const token = localStorage.getItem("accountToken");
      if (!token) throw new Error("Authentication required");

      await changePassword(token, curPassword, newPass);
      
      setSuccess("Password updated successfully!");
      setTimeout(() => {
        setShowPasswordField(false);
        setCurPassword("");
        setNewPass("");
        setConfirmNewPass("");
      }, 2000);
    } catch (error) {
      setError(error.message || "Failed to update password");
    } finally {
      setLoading(false);
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
        minHeight: "100vh",
        width: "100vw",
      }}
    >
      <IconButton onClick={handleOpen} sx={{ color: theme.palette.mode }}>
        <SettingsOutlinedIcon />
      </IconButton>
      <Box display="flex" height="calc(100vh - 48px)">
        {/* Sidebar */}
        <Box
          width="250px"
          bgcolor={theme.palette.mode  ? colors.primary[400] : colors.primary[100]}
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
              <LockOutlinedIcon />
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
                max={32}
                step={1}
                color="secondary"
                sx={{ width: 300 }}
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
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Box mb={2}>
        {!showPasswordField ? (
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setShowPasswordField(true)}
          >
            Change Password
          </Button>
        ) : (
          <Box component="form" onSubmit={handlePasswordUpdate}>
            <TextField
              label="Current Password"
              type="password"
              value={curPassword}
              onChange={(e) => setCurPassword(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
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
              sx={{ mb: 2 }}
              required
            />

            <Box>
              <Button 
                type="submit" 
                variant="contained" 
                color="secondary"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Password"}
              </Button>
              <Button
                onClick={() => {
                  setShowPasswordField(false);
                  setCurPassword("");
                  setNewPass("");
                  setConfirmNewPass("");
                }}
                sx={{ ml: 2 }}
                disabled={loading}
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
