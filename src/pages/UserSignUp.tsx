import React, { useState } from "react";
import Box from "@mui/material/Box";
import { register } from "../API/account.tsx";
import { Button, Grid2, TextField, OutlinedInput, Typography, IconButton, InputAdornment, InputLabel, FormControl } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import logo from "../assets/logo.png";
import spacebg from "../assets/space_bg.jpg";

const UserSignUp = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

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

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: `url(${spacebg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          p: 3,
          border: "1px solid #59D0EE",
          boxShadow: "0px 4px 30px rgba(89, 208, 238, 0.9)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "50%",
          maxWidth: "400px",
          backgroundColor: "#0A1E3D",
          color: "#FFFFFF",
          borderRadius: "8px",
          backdropFilter: "blur(4px)",
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{
            width: "100px",
            height: "auto",
            mb: 2,
          }}
        />

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
                color: "transparent",
                fontWeight: "bold",
                fontSize: "3rem",
                WebkitTextStroke: "2px #59D0EE",
              }}
            >
              OOCAA
            </Typography>
          </Grid2>

          { error !== "" ? <Typography
            variant="p"
            sx={{
              color: "red",
            }}
          >
            <em>{error}</em>
          </Typography> : null }

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
                    borderColor: "#59D0EE",
                  },
                  "&:hover fieldset": {
                    borderColor: "#59D0EE",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#59D0EE",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#59D0EE",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#59D0EE",
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
                    borderColor: "#59D0EE",
                  },
                  "&:hover fieldset": {
                    borderColor: "#59D0EE",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#59D0EE",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#59D0EE",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#59D0EE",
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
                    borderColor: "#59D0EE",
                  },
                  "&:hover fieldset": {
                    borderColor: "#59D0EE",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#59D0EE",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#59D0EE",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#59D0EE",
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
                    borderColor: "#59D0EE",
                  },
                  "&:hover fieldset": {
                    borderColor: "#59D0EE",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#59D0EE",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#59D0EE",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#59D0EE",
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
                  "& fieldset": { borderColor: "#59D0EE", },
                  "&:hover fieldset": { borderColor: "#59D0EE", },
                  "&.Mui-focused fieldset": { borderColor: "#59D0EE", },
                },
                "& .MuiInputLabel-root": { color: "#59D0EE", },
                "& .MuiInputLabel-root.Mui-focused": { color: "#59D0EE", },
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

          <Typography>
            Have an account already? <a href="/login">Login</a>
          </Typography>

          <Grid2 sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#59D0EE", color: "#0A1E3D" }}
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
