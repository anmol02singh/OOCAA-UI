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
import PhoneInput from "react-phone-input-2";
import { containsExtraSpaces, formatPhoneNumber, isEmailFormat, preventEnterSubmit } from "./Profile/ProfileUtilities.tsx";
import { isValidPhoneNumber } from "libphonenumber-js";

type registerErrorMessage = (
    undefined |
    "backEndError" |
    "invalidEmailFormat" |
    "invalidPhoneFormat" |
    "invalidUsernameFormat" |
    "shortUsername" |
    "invalidPasswordFormat" |
    "shortPassword"
);

const UserSignUp = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [errorMessageType, setErrorMessageType] = useState<registerErrorMessage>(undefined);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    async function handleRegister() {
        if (!isValidEmail()) return;
        if (!isValidPhoneNumber()) return;
        if (!isValidUsername()) return;
        if (!isValidPassword()) return;

        const response = await register(
            name.replace(containsExtraSpaces, ' ').trim(),
            email,
            phone,
            username,
            password
        );
        if (response.success) {
            setErrorMessageType(undefined);
            localStorage.setItem("accountToken", response.token);
            window.location.replace("/");
        } else {
            setErrorMessageType('backEndError');
            setError(response.error);
        }
    }


    const isValidEmail = (): boolean => {
        let invalidInput = false;
        setErrorMessageType(undefined);

        if (!email.match(isEmailFormat)) {
            invalidInput = true;
            setErrorMessageType('invalidEmailFormat');
        }

        return !(invalidInput);
    }

    const isValidPhoneNumber = (): boolean => {
        let invalidInput = false;
        setErrorMessageType(undefined);

        const { success } = formatPhoneNumber(phone);

        if (!success) {
            invalidInput = true;
            setErrorMessageType('invalidPhoneFormat');
        }

        return !(invalidInput);
    }

    const isValidUsername = (): boolean => {
        let invalidInput = false;
        setErrorMessageType(undefined);

        if (username.length < 4) {
            invalidInput = true;
            setErrorMessageType('shortUsername');
        } else if (!username.match(/^[a-zA-Z0-9_.]+$/)) {
            invalidInput = true;
            setErrorMessageType('invalidUsernameFormat');
        }

        return !(invalidInput);
    }

    const isValidPassword = (): boolean => {
        let invalidInput = false;
        setErrorMessageType(undefined);

        if (password.length < 8) {
            invalidInput = true;
            setErrorMessageType('shortPassword');
        } else if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)) {
            invalidInput = true;
            setErrorMessageType('invalidPasswordFormat');
        }

        return !(invalidInput);
    }


    const handleChangeName = (event) => {
        const fieldValue = event.target.value;

        if (fieldValue.length > 150) return;
        
        setName(fieldValue);
    }
    
    const handleChangeEmail = (event) => {
        const fieldValue = event.target.value;

        if (fieldValue.length > 254) return;

        setEmail(fieldValue);
    }

    const handleChangePhone = (event) => {
        setPhone(event);
    }

    const handleChangeUsername = (event) => {
        const fieldValue = event.target.value.trim();

        if (fieldValue.length > 150) return;

        setUsername(fieldValue);
    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value.trim());
    }


    const errorMessage = {
        backEndError: error,
        invalidEmailFormat: "Please enter a valid email address.",
        invalidPhoneFormat: "Please enter a valid phone number.",
        invalidUsernameFormat: "Username can only contain letters, numbers, underscores, and periods.",
        shortUsername: "Username must contain at least 4 characters.",
        invalidPasswordFormat: "Password must contain 1+ lowercase and 1+ uppercase letters, 1+ number, and 1+ special characters.",
        shortPassword: "Password must contain at least 8 characters.",
    };

    const errorMessageStyle: React.CSSProperties = {
        margin: '0 0.1rem',
        gap: '0.2rem',
        color: '#f44336',
        display: 'flex',
        alignItems: 'center',
    }
    

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundColor: colors.primary[600],
                backgroundImage: `
                    linear-gradient(240deg,rgba(23, 29, 52, 1) 0%,
                    rgba(16, 22, 36, 1) 40%, rgba(16, 22, 36, 1) 60%,
                    rgba(21, 36, 46, 1) 100%)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                overflowX: "hidden",
                overflowY: "auto",
            }}
        >
            <Box
                sx={{
                    p: 3,
                    border: `1px solid ${colors.blueAccent[300]}`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "75%",
                    maxWidth: "600px",
                    minWidth: "350px",
                    backgroundColor: colors.primary[400],
                    color: colors.grey[100],
                    borderRadius: "9px",
                    backdropFilter: "blur(4px)",
                }}
            >
                <SatelliteAltOutlinedIcon sx={{ fontSize: "80px", mb: 2, color: colors.blueAccent[300] }} />

                <Grid2
                    direction="column"
                    minWidth="19rem"
                    width="85%"
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

                    {errorMessageType &&
                        <Typography variant='h6' sx={errorMessageStyle}>
                            <ErrorIcon /> {errorMessage[errorMessageType]}
                        </Typography>
                    }

                    <Grid2>
                        <TextField
                            id="name"
                            onChange={handleChangeName}
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
                                        borderColor: colors.blueAccent[400],
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
                                    color: colors.grey[100],
                                },
                            }}
                        />
                    </Grid2>

                    <Grid2>
                        <TextField
                            id="email"
                            onChange={handleChangeEmail}
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
                                        borderColor: colors.blueAccent[400],
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
                                    color: colors.grey[100],
                                },
                            }}
                        />
                    </Grid2>

                    <Grid2>
                        <style> {/*For styling inaccessible components*/}
                            {`
                                .react-tel-input .special-label {
                                    color: ${colors.blueAccent[300]} !important;
                                    background-color: ${colors.primary[400]} !important;
                                    font-size: 10px;
                                    transform: translate(-14px, 0);
                                }
                                
                                .react-tel-input .country:hover {
                                    background-color: ${colors.primary[500]} !important;
                                }

                                .react-tel-input .country.highlight {
                                    background-color: ${colors.primary[500]} !important;
                                }

                                .react-tel-input .form-control {
                                    border: 1px solid ${colors.blueAccent[300]};
                                    borderRadius: 4px;
                                    transition: none;
                                    cursor: text !important;
                                }

                                .react-tel-input .form-control:hover {
                                    border-color: ${colors.blueAccent[400]};
                                }

                                .react-tel-input .form-control:focus {
                                    border: 1px solid ${colors.blueAccent[300]};
                                    box-shadow:
                                        inset 1px 1px 0 0 ${colors.blueAccent[300]},
                                        inset -1px -1px 0 0 ${colors.blueAccent[300]};
                                }

                                .country-list .country .dial-code {
                                    color: ${colors.grey[300]} !important;
                                }

                                .react-tel-input .flag-dropdown{
                                    cursor: pointer;
                                }

                                .react-tel-input .selected-flag .arrow{
                                    border-top: 4px solid ${colors.blueAccent[200]};
                                }

                                .react-tel-input .selected-flag:focus .arrow{
                                    border-left-width: 3px;
                                    border-right-width: 3px;
                                    border-top: 4px solid ${colors.blueAccent[400]};
                                }

                                .react-tel-input .selected-flag .arrow.up{
                                    border-top: none;
                                    border-bottom: 4px solid ${colors.blueAccent[400]};
                                }
                            `}
                        </style>
                        <PhoneInput
                            country={'ca'}
                            preferredCountries={['us', 'ca']}
                            countryCodeEditable={false}
                            value={phone}
                            specialLabel='Phone'
                            onChange={handleChangePhone}
                            onKeyDown={preventEnterSubmit}
                            inputStyle={{
                                cursor: 'pointer',
                                borderRadius: '4px',
                                color: colors.grey[100],
                                backgroundColor: colors.primary[400],
                                fontSize: '13px',
                                width: '100%',
                            }}
                            dropdownStyle={{
                                color: colors.grey[100],
                                backgroundColor: colors.primary[400],
                                borderRadius: '6px',
                                width: '20rem',
                            }}
                        >
                        </PhoneInput>
                    </Grid2>

                    <Grid2>
                        <TextField
                            id="username"
                            onChange={handleChangeUsername}
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
                                        borderColor: colors.blueAccent[400],
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
                                    color: colors.grey[100],
                                },
                            }}
                        />
                    </Grid2>

                    <Grid2>
                        <FormControl
                            sx={{
                                width: '100%',
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": { borderColor: colors.blueAccent[300], },
                                    "&:hover fieldset": { borderColor: colors.blueAccent[400], },
                                    "&.Mui-focused fieldset": { borderColor: colors.blueAccent[300], },
                                },
                                "& .MuiInputLabel-root": { color: colors.blueAccent[300], },
                                "& .MuiInputLabel-root.Mui-focused": { color: colors.blueAccent[300], },
                                input: { color: colors.grey[100], },
                            }}
                        >
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <OutlinedInput
                                id="password"
                                onChange={handleChangePassword}
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
                                            sx={{
                                                color: colors.blueAccent[200],
                                            }}
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
                                color: colors.primary[500],
                                "&:hover": {
                                    backgroundColor: colors.blueAccent[400],
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
