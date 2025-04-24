import React, { FC } from "react";
import { Box,Typography, useTheme } from "@mui/material";
import { tokens } from "../theme.tsx";

const SimpleStatBox = ({ title, subtitle, individual, icon }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    return (
      <Box width="100%" m="0 30px">
        <Box display="flex" justifyContent="space-between">
          <Box>
            {icon}
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ color: colors.grey[100] }}
            >
              {title}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" mt="2px">
          <Typography variant="h5" sx={{ color: colors.grey[200] }}>
            {individual}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" mt="2px">
          <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
            {subtitle}
          </Typography>
        </Box>
      </Box>
    );
  };

export default SimpleStatBox;

