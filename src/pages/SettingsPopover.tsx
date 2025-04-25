import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, Slider, IconButton, Button, List, ListItemText, Divider, TextField, Alert, useTheme, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Grid2 as Grid } from "@mui/material";
import { ColorModeContext } from "./../theme.tsx";
import { tokens } from "./../theme.tsx";
import CloseIcon from '@mui/icons-material/Close';
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { SettingsOutlined as SettingsOutlinedIcon, Visibility, VisibilityOff } from "@mui/icons-material";
import ListItemButton from "@mui/material/ListItemButton";
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import { changePassword, changeUsername, deleteOwnAccount } from "../API/account.tsx";
import { useNavigate } from "react-router-dom";
import { useGeneralStyling, useDeleteItemStyling } from "./Admin/AdminUtilities.tsx";

const SettingsPopover = () => {

    const {
        adminElements,
        button_hover
    } = useGeneralStyling();

    const {
        deleteItemHeader,
        deleteItemContainer,
        deleteItemButtonContainer,
        deleteItemConfirmButton,
        cancelDeleteButton,
    } = useDeleteItemStyling();

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
    const [showPassword, setShowPassword] = useState<boolean[]>([false, false, false]);
    const [newPass, setNewPass] = useState("");
    const [confirmNewPass, setConfirmNewPass] = useState("");
    const [notificationChannels, setNotificationChannels] = useState(["SMS", "Email"]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

    const navigate = useNavigate();
    const token = localStorage.getItem("accountToken");
    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, []);

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

        } catch (error) {
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
                    setShowPassword([false, false, false])
                }, MESSAGE_DISPLAY_DURATION,);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setIsUpdatingPassword(false);
        }
    };

    const handleDelete = async () => {
        await deleteOwnAccount(token ?? "");
        localStorage.removeItem("accountToken");
        window.location.href = "/";
    }

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
                width: "100%",
                display: 'flex',
                flexDirection: 'row',
                justifyContent: "flex-start",
                alignItems: "flex-start",
                overflow: 'hidden',
                height: '100%',
            }}
        >

            {/* Sidebar */}
            <Box

                bgcolor={theme.palette.mode === 'dark' ? colors.primary[400] : colors.primary[400]}
                p={2}
                display="flex"
                flexDirection="column"
                boxShadow={2}
                sx={{
                    maxWidth: '250px',
                    width: '15vw',
                    height: "100%",
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    borderRight: `1px solid ${theme.palette.divider}`
                }}

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
                p={4}
                bgcolor={theme.palette.mode}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    height: '100%',
                    width: '60%',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    minWidth: '261px',
                }}
            >
                {selectedSection === "general" && (
                    <>
                        <Typography variant="h5" gutterBottom>
                            General Settings
                        </Typography>
                        <Divider sx={{ my: 1, width: '100%' }} />
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
                        <Typography variant="h5" gutterBottom sx={{ mb: 1 }}>
                            Account Preferences
                        </Typography>
                        <Divider sx={{ mb: 2, width: '100%' }} />
                        {usernameError && (
                            <Alert
                                severity="error"
                                sx={{
                                    mb: 1,
                                    width: '100%',
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
                                    width: '100%',
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
                                    width: '100%',
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
                                    width: '100%',
                                    maxWidth: '600px',
                                    whiteSpace: 'nowrap',
                                    mt: 1
                                }}
                            >
                                {success}
                            </Alert>
                        )}
                        <Box mb={2} width='100%'>
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
                                    <Box display="flex" gap={1}>
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

                        <Box mb={2} width='100%'>
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
                                        type={showPassword[0] ? "text" : "password"}
                                        value={curPassword}
                                        onChange={(e) => setCurPassword(e.target.value)}
                                        fullWidth
                                        sx={{ mb: 1 }}
                                        required
                                        slotProps={{
                                            input: {
                                                endAdornment: (
                                                    <IconButton
                                                        aria-label={
                                                            showPassword[0] ? 'hide password' : 'display password'
                                                        }
                                                        onClick={() => setShowPassword(prev => [!prev[0], prev[1], prev[2]])}
                                                        edge="end"
                                                        sx={{
                                                            color: colors.grey[200],
                                                        }}
                                                    >
                                                        {showPassword[0] ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                )
                                            }
                                        }}
                                    />

                                    <TextField
                                        label="New Password"
                                        type={showPassword[1] ? "text" : "password"}
                                        value={newPass}
                                        onChange={(e) => setNewPass(e.target.value)}
                                        fullWidth
                                        sx={{ mb: 1 }}
                                        required
                                        slotProps={{
                                            input: {
                                                endAdornment: (
                                                    <IconButton
                                                        aria-label={
                                                            showPassword[1] ? 'hide password' : 'display password'
                                                        }
                                                        onClick={() => setShowPassword(prev => [prev[0], !prev[1], prev[2]])}
                                                        edge="end"
                                                        sx={{
                                                            color: colors.grey[200],
                                                        }}
                                                    >
                                                        {showPassword[1] ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                )
                                            }
                                        }}
                                    />

                                    <TextField
                                        label="Confirm New Password"
                                        type={showPassword[2] ? "text" : "password"}
                                        value={confirmNewPass}
                                        onChange={(e) => setConfirmNewPass(e.target.value)}
                                        fullWidth
                                        sx={{ mb: 1 }}
                                        required
                                        slotProps={{
                                            input: {
                                                endAdornment: (
                                                    <IconButton
                                                        aria-label={
                                                            showPassword[2] ? 'hide password' : 'display password'
                                                        }
                                                        onClick={() => setShowPassword(prev => [prev[0], prev[1], !prev[2]])}
                                                        edge="end"
                                                        sx={{
                                                            color: colors.grey[200],
                                                        }}
                                                    >
                                                        {showPassword[2] ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                )
                                            }
                                        }}
                                    />

                                    <Box display="flex" gap={1} >
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
                                                setShowPassword([false, false, false])
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
                        <Box mb={2} width='100%'>
                            <Button
                                variant="contained"
                                onClick={() => setDeleteDialogOpen(true)}
                                color="secondary"
                                sx={{
                                    marginTop: "2rem",
                                    padding: "0.6rem 0.8rem",
                                    backgroundColor: colors.redAccent[500],
                                }}
                            >
                                Delete Account
                            </Button>
                        </Box>

                        <Dialog
                            open={deleteDialogOpen}
                            onClose={() => setDeleteDialogOpen(false)}
                            keepMounted
                            sx={{
                                '& .MuiPaper-root': {
                                    padding: '2rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    width: '50vw',
                                    minWidth: '22rem',
                                    maxWidth: '29rem',
                                    backgroundColor: colors.primary[400],
                                    borderRadius: '9px',
                                    backgroundImage: 'none',
                                    gap: '1rem',
                                    overflow: 'auto',
                                },
                                '& .css-kw13he-MuiDialogContent-root': {
                                    padding: 0,
                                },
                            }}
                        >
                            <Grid container sx={adminElements} rowSpacing={3} columnSpacing={2}>
                                <Grid size={2}>
                                    <IconButton onClick={() => setDeleteDialogOpen(false)}>
                                        <CloseIcon sx={{ fontSize: '1.8rem' }} />
                                    </IconButton>
                                </Grid>
                                <Grid size={8} sx={deleteItemHeader}>
                                    <Typography variant='h3' sx={{ color: colors.redAccent[400] }}>
                                        Delete Account?
                                    </Typography>
                                </Grid>

                                <Grid size={12} sx={deleteItemContainer}>
                                    <Typography variant='h4' sx={{ color: colors.grey[100] }}>
                                        Are you sure you want to delete your account?
                                    </Typography>
                                </Grid>

                                <Grid size={12} sx={deleteItemButtonContainer}>
                                    <Button
                                        type='submit'
                                        onClick={() => setDeleteDialogOpen(false)}
                                        sx={{
                                            ...cancelDeleteButton,
                                            '&:hover': {
                                                ...button_hover
                                            },
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type='submit'
                                        onClick={() => {
                                            setDeleteDialogOpen(false);
                                            handleDelete();
                                        }}
                                        sx={{
                                            ...deleteItemConfirmButton,
                                            '&:hover': {
                                                ...button_hover,
                                                color: '#f44336',
                                            },
                                        }}
                                    >
                                        Delete Account
                                    </Button>
                                </Grid>
                            </Grid>
                        </Dialog>
                    </>
                )}
                {selectedSection === "privacy" && (
                    <>
                        <Typography variant="h5" gutterBottom>
                            Notification Choice
                        </Typography>
                        <Divider sx={{ my: 1, width: '100%' }} />
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
        </Box >

    );
};

export default SettingsPopover;

