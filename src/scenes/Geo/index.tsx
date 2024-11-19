import React from "react";
import { Box, colors } from "@mui/material";
import Header from "/Users/san/OOCAA-UI/src/components/Header.tsx";
import GeographyChart from "/Users/san/OOCAA-UI/src/components/GeographyChart.tsx";
import { tokens } from "/Users/san/OOCAA-UI/src/theme.tsx";
import { useTheme } from "@mui/material";

const Geo = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
 return(
    <Box m = "20px"> 
        <Header title = "Geography Chart" subtitle = "Simple Geo Chart" />
        <Box sx = {{height: "75vh" ,  border : `1px solid ${colors.grey[100]}`, borderRadius: "4px"}}> 
           <GeographyChart/> 
        </Box>
    </Box>
 )
}

export default Geo;