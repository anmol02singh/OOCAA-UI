import React from "react";
import Box from "@mui/material/Box";
import { Button, Grid2, TextField, Typography } from "@mui/material";

import logo from "../images/logo-2.jpg";
import spacebg from "../images/space_bg2.jpg";

const UserLogin = () => {
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
          border: "1px solid #A46EF7",
          boxShadow: "0px 4px 30px rgba(164, 110, 247, 1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "50%",
          maxWidth: "400px",
          backgroundColor: "#1a0033",
          color: "#FFFFFF",
          borderRadius: "8px",
          backdropFilter: "blur(6px)",
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
                WebkitTextStroke: "2px #A46EF7",
              }}
            >
              OOCAA
            </Typography>
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
                    borderColor: "#A46EF7",
                  },
                  "&:hover fieldset": {
                    borderColor: "#A46EF7",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#A46EF7",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#A46EF7",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#A46EF7",
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
                    borderColor: "#A46EF7",
                  },
                  "&:hover fieldset": {
                    borderColor: "#A46EF7",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#A46EF7",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#A46EF7",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#A46EF7",
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
              sx={{
                backgroundColor: "#A46EF7",
                color: "#0A1E3D",
                "&:hover": {
                  backgroundColor: "#8F5ACB",
                },
              }}
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