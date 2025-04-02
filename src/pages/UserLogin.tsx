import React, { useState } from "react";
import Box from "@mui/material/Box";
import { login } from "../API/account.tsx";
import { Button, Grid2, TextField, OutlinedInput, Typography, IconButton, InputAdornment, InputLabel, FormControl } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useTheme } from "@mui/material";
import SatelliteAltOutlinedIcon from "@mui/icons-material/SatelliteAltOutlined";
import { tokens } from "../theme.tsx";


const UserLogin = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginFailed, setLoginFailed] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  async function handleLogin() {
    if (!username || !password) { return; }

    const response = await login(username, password);
    if (response.success) {
      localStorage.setItem("accountToken", response.token);
      window.location.replace("/");
    } else {
      setLoginFailed(true);
    }
  }

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
          backdropFilter: "blur(6px)",
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

          { loginFailed ? <Typography
            variant="p"
            sx={{
              color: "red",
            }}
          >
            <em>Login failed.  Please try again.</em>
          </Typography> : null }

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
            Don't have an account?{" "}
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
              Log In
            </Button>
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
};

export default UserLogin;