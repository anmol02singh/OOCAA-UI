import React, { useState } from "react";
import Box from "@mui/material/Box";
import { register } from "../API/account.tsx";
import {
    Button,
    Grid2,
    TextField,
    OutlinedInput,
    Typography,
    IconButton,
    InputAdornment,
    InputLabel,
    FormControl
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useTheme } from "@mui/material";
import SatelliteAltOutlinedIcon from "@mui/icons-material/SatelliteAltOutlined";
import { tokens } from "../theme.tsx";
import ErrorIcon from '@mui/icons-material/Error';

type registerErrorMessage = (
    undefined |
    "backEndError" |
    "invalidPhoneNumberFormat" |
    "invalidEmailFormat" |
    "invalidUsernameFormat" |
    "invalidPasswordFormat"
);

const UserSignUp = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [errorMessageType, setErrorMessageType] = useState<registerErrorMessage> ();
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    async function handleRegister() {
        if (!username || !password) { return; }

        const response = await register(name, email, phone, username, password);
        if (response.success) {
            localStorage.setItem("accountToken", response.token);
            window.location.replace("/");
        } else {
            setError(response.error);
        }
    }

    const errorMessageStyle: React.CSSProperties = {
        margin: '0.3rem 0.1rem',
        gap: '0.2rem',
        color: '#f44336',
        display: 'flex',
        alignItems: 'center',
    }

    const errorMessageElements = {
        none: undefined
        , backEndError:
            <Typography variant='h6' sx={errorMessageStyle}>
                <ErrorIcon /> {error}
            </Typography>
        , invalidPhoneNumberFormat:
            <Typography variant='h6' sx={errorMessageStyle}>
                <ErrorIcon /> Please enter a valid phone number.
            </Typography>
        , invalidEmailFormat:
            <Typography variant='h6' sx={errorMessageStyle}>
                <ErrorIcon /> Please enter a valid email.
            </Typography>
        , invalidUsernameCharacters:
            <Typography variant='h6' sx={errorMessageStyle}>
                <ErrorIcon /> Usernames can only contain letters, numbers, underscores, and periods.
            </Typography>
        , shortUsername:
            <Typography variant='h6' sx={errorMessageStyle}>
                <ErrorIcon /> Usernames must contain at least 4 characters.
            </Typography>
        , invalidPasswordFormat:
            <Typography variant='h6' sx={errorMessageStyle}>
                <ErrorIcon /> Passwords can only contain letters, numbers, underscores, and periods.
            </Typography>
        , shortPassword:
            <Typography variant='h6' sx={errorMessageStyle}>
                <ErrorIcon /> Passwords must contain at least 8 characters.
            </Typography>
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundColor: colors.primary[600],
                backgroundSize: "cover",
                backgroundPosition: "center",
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    p: 3,
                    border: `1px solid ${colors.blueAccent[300]}`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "50%",
                    maxWidth: "400px",
                    backgroundColor: colors.primary[400],
                    color: colors.grey[100],
                    borderRadius: "8px",
                    backdropFilter: "blur(4px)",
                }}
            >
                <SatelliteAltOutlinedIcon sx={{ fontSize: "80px", mb: 2, color: colors.blueAccent[300] }} />

                <Grid2
                    direction="column"
                    container
                    sx={{ alignContent: "center" }}
                    spacing={3}
                >
                    <Grid2 container sx={{ justifyContent: "center" }} mb={0}>
                        <Typography
                            variant="h3"
                            sx={{
                                color: colors.blueAccent[300],
                                fontWeight: "bold",
                                fontSize: "3rem",
                            }}
                        >
                            OOCAA
                        </Typography>
                    </Grid2>

                    {error !== "" &&
                        <Typography
                            sx={{
                                margin: '0.3rem 0.1rem',
                                gap: '0.2rem',
                                color: '#f44336',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <ErrorIcon /> {error}
                        </Typography>
                    }

                    <Grid2>
                        <TextField
                            id="name"
                            onChange={event => setName(event.target.value)}
                            value={name}
                            label="Name"
                            variant="outlined"
                            fullWidth
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: colors.blueAccent[300],
                                    },
                                    "&:hover fieldset": {
                                        borderColor: colors.blueAccent[300],
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: colors.blueAccent[300],
                                    },
                                },
                                "& .MuiInputLabel-root": {
                                    color: colors.blueAccent[300],
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                    color: colors.blueAccent[300],
                                },
                                input: {
                                    color: "#FFFFFF",
                                },
                            }}
                        />
                    </Grid2>

                    <Grid2>
                        <TextField
                            id="email"
                            onChange={event => setEmail(event.target.value)}
                            value={email}
                            label="Email"
                            variant="outlined"
                            required
                            fullWidth
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: colors.blueAccent[300],
                                    },
                                    "&:hover fieldset": {
                                        borderColor: colors.blueAccent[300],
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: colors.blueAccent[300],
                                    },
                                },
                                "& .MuiInputLabel-root": {
                                    color: colors.blueAccent[300],
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                    color: colors.blueAccent[300],
                                },
                                input: {
                                    color: "#FFFFFF",
                                },
                            }}
                        />
                    </Grid2>

                    <Grid2>
                        <TextField
                            id="phoneNumber"
                            onChange={event => setPhone(event.target.value)}
                            value={phone}
                            label="Phone Number"
                            variant="outlined"
                            fullWidth
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: colors.blueAccent[300],
                                    },
                                    "&:hover fieldset": {
                                        borderColor: colors.blueAccent[300],
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: colors.blueAccent[300],
                                    },
                                },
                                "& .MuiInputLabel-root": {
                                    color: colors.blueAccent[300],
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                    color: colors.blueAccent[300],
                                },
                                input: {
                                    color: "#FFFFFF",
                                },
                            }}
                        />
                    </Grid2>

                    <Grid2>
                        <TextField
                            id="username"
                            onChange={event => setUsername(event.target.value)}
                            value={username}
                            label="User Name"
                            variant="outlined"
                            fullWidth
                            required
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: colors.blueAccent[300],
                                    },
                                    "&:hover fieldset": {
                                        borderColor: colors.blueAccent[300],
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: colors.blueAccent[300],
                                    },
                                },
                                "& .MuiInputLabel-root": {
                                    color: colors.blueAccent[300],
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                    color: colors.blueAccent[300],
                                },
                                input: {
                                    color: "#FFFFFF",
                                },
                            }}
                        />
                    </Grid2>

                    <Grid2>
                        <FormControl
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": { borderColor: colors.blueAccent[300], },
                                    "&:hover fieldset": { borderColor: colors.blueAccent[300], },
                                    "&.Mui-focused fieldset": { borderColor: colors.blueAccent[300], },
                                },
                                "& .MuiInputLabel-root": { color: colors.blueAccent[300], },
                                "& .MuiInputLabel-root.Mui-focused": { color: colors.blueAccent[300], },
                                input: { color: "#FFFFFF", },
                            }}
                        >
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <OutlinedInput
                                id="password"
                                onChange={event => setPassword(event.target.value)}
                                value={password}
                                fullWidth
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={
                                                showPassword ? 'hide password' : 'display password'
                                            }
                                            onClick={() => setShowPassword((show) => !show)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                    </Grid2>

                    <Typography sx={{ width: '100%', textAlign: 'center' }}>
                        Have an account already? <a href="/login" style={{ color: colors.blueAccent[300] }}>
                            Login
                        </a>
                    </Typography>

                    <Grid2 sx={{ display: "flex", justifyContent: "center" }}>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: colors.blueAccent[300],
                                color: "#0A1E3D",
                                "&:hover": {
                                    backgroundColor: colors.blueAccent[200],
                                },
                            }}
                            onClick={handleRegister}
                        >
                            Sign up
                        </Button>
                    </Grid2>
                </Grid2>
            </Box>
        </Box>
    );
};

export default UserSignUp;
