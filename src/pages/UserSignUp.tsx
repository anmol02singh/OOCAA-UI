import React from "react";
import Box from "@mui/material/Box";
import { Button, Grid2, TextField, Typography } from "@mui/material";

const UserSignUp = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh", // Full viewport height
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
          maxWidth: "400px", // Optional: limits width for responsiveness
        }}
      >
        {/* Add the image here */}
        <Box
          component="img"
          src="/path/to/your/image.png" // Replace with the path to your image
          alt="Logo"
          sx={{
            width: "100px", // Set the image width as needed
            height: "auto",
            mb: 2, // Optional: adds some space below the image
          }}
        />

        <Grid2
          direction="column"
          container
          sx={{ alignContent: "center" }}
          spacing={5}
        >
          <Grid2 container sx={{ justifyContent: "center" }} mb={0}>
            <Typography variant="h3">OOCAA</Typography>
          </Grid2>
          <Grid2>
            <TextField id="name" label="Name" variant="outlined" fullWidth />
          </Grid2>
          <Grid2>
            <TextField
              id="username"
              label="User Name"
              variant="outlined"
              fullWidth
            />
          </Grid2>
          <Grid2>
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              fullWidth
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
