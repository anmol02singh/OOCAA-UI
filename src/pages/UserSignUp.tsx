import React from "react";
import Box from "@mui/material/Box";
import { Button, Grid2, TextField, Typography } from "@mui/material";

import logo from "../images/logo.png";

const UserSignUp = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#0D1B2A",
        backgroundImage:
          "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
    >
      <Box
        sx={{
          p: 3,
          border: "1px solid #59D0EE",
          boxShadow: "0px 4px 8px rgba(89, 208, 238, 0.6)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "50%",
          maxWidth: "400px",
          backgroundColor: "#112240",
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
            <Typography variant="h3" color="#59D0EE">
              OOCAA
            </Typography>
          </Grid2>
          <Grid2>
            <TextField
              id="name"
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
              id="username"
              label="User Name"
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
              id="password"
              label="Password"
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
          <Grid2 sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#59D0EE", color: "#0D1B2A" }}
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
