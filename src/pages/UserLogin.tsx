import React, { useState } from "react";
import Box from "@mui/material/Box";
import { login } from "../API/account.tsx";
import {
  Button,
  Grid2,
  TextField,
  OutlinedInput,
  Typography,
  IconButton,
  InputAdornment,
  InputLabel,
  FormControl,
  Divider,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useTheme } from "@mui/material";
import SatelliteAltOutlinedIcon from "@mui/icons-material/SatelliteAltOutlined";
import ErrorIcon from "@mui/icons-material/Error";
import { tokens } from "../theme.tsx";

const UserLogin = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginFailed, setLoginFailed] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  async function handleLogin() {
    if (!usernameOrEmail || !password) {
      return;
    }

    let processedUsernameOrEmail = usernameOrEmail;
    if (usernameOrEmail.includes("@")) {
      processedUsernameOrEmail = processedUsernameOrEmail.toLowerCase();
    }

    const response = await login(processedUsernameOrEmail, password);
    if (response.success) {
      localStorage.setItem("accountToken", response.token);
      window.location.replace("/");
    } else {
      setLoginFailed(true);
    }
  }

  const handleChangeUsernameOrEmail = (event) => {
    const fieldValue = event.target.value;

    if (fieldValue.length > 254) return;

    setUsernameOrEmail(fieldValue);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value.replace(" ", ""));
  };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "100%",
                height: "100%",
                backgroundColor: colors.primary[600],
                backgroundImage: `
                    linear-gradient(240deg,rgba(23, 29, 52, 1) 0%,
                    rgba(16, 22, 36, 1) 40%, rgba(16, 22, 36, 1) 60%,
                    rgba(23, 29, 52, 1) 100%)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                overflowX: "hidden",
                overflowY: "auto",
            }}
        >
            {/* Spacer */}
            <Box
                sx={{
                    display: "flex",
                    width: "100%",
                    height: "33vh",
                }}
            />

      <Box
        sx={{
          p: 3,
          border: `1px solid ${colors.blueAccent[300]}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "75%",
          maxWidth: "37rem",
          minWidth: "22rem",
          margin: "2rem 0",
          backgroundColor: colors.primary[400],
          borderRadius: "9px",
          boxShadow: "0px 5px 1.25rem rgba(0, 0, 0, 0.34)",
        }}
      >
        <Grid2
          direction="column"
          minWidth="19rem"
          width="85%"
          container
          sx={{ alignContent: "center" }}
          spacing={3}
        >
          <Grid2
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
              textAlign: "center",
            }}
          >
            <SatelliteAltOutlinedIcon
              sx={{
                fontSize: "64px",
                color: colors.blueAccent[400],
              }}
            />
            <Divider
              orientation="horizontal"
              sx={{
                width: "100%",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  color: colors.blueAccent[300],
                  fontWeight: "bold",
                }}
              >
                OOCAA
              </Typography>
            </Divider>
            <Typography
              variant="h2"
              sx={{
                color: colors.blueAccent[400],
              }}
            >
              Sign In
            </Typography>
          </Grid2>

          {loginFailed && (
            <Typography
              variant="h6"
              sx={{
                margin: "0 0.1rem",
                gap: "0.2rem",
                color: "#f44336",
                display: "flex",
                alignItems: "flex-start",
              }}
            >
              <ErrorIcon /> Sign In Failed. Please Try Again
            </Typography>
          )}

          <Grid2>
            <TextField
              id="usernameOrEmail"
              onChange={handleChangeUsernameOrEmail}
              value={usernameOrEmail}
              label="Username or Email"
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
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: colors.blueAccent[300] },
                  "&:hover fieldset": { borderColor: colors.blueAccent[300] },
                  "&.Mui-focused fieldset": {
                    borderColor: colors.blueAccent[300],
                  },
                },
                "& .MuiInputLabel-root": { color: colors.blueAccent[300] },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: colors.blueAccent[300],
                },
                input: { color: "#FFFFFF" },
              }}
            >
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                onChange={handleChangePassword}
                value={password}
                fullWidth
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword ? "hide password" : "display password"
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

          <Typography sx={{ width: "100%", textAlign: "center" }}>
            {"Don't have an account? "}
            <a href="/signup" style={{ color: colors.blueAccent[300] }}>
              Sign up
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
              onClick={handleLogin}
            >
              Sign In
            </Button>
          </Grid2>
        </Grid2>
      </Box>

      {/* Spacer */}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "33vh",
        }}
      />
    </Box>
  );
};

export default UserLogin;
