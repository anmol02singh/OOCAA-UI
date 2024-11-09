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
        backgroundColor: "black",
      }}
    >
      <Box
        sx={{
          p: 2,
          border: "1px dashed grey",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "50%",
          maxWidth: "400px",
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
          spacing={5}
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
              }}
            />
          </Grid2>
          <Grid2 sx={{ display: "flex", justifyContent: "center" }}>
            <Button variant="contained">Sign up</Button>
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
};

export default UserSignUp;
