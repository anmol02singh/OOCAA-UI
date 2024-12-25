import React from "react";
import { Box } from "@mui/material";
import Header from "../../components/Header.tsx";
import LineChart from "../../components/LineChart.tsx";

const Line = () => {
 return(
    <Box m = "20px"> 
        <Header title = "Line Chart" subtitle = "Simple Line Chart" />
        <Box sx = {{height: "75vh"}}> 
           <LineChart/> 
        </Box>
    </Box>
 )
}

export default Line;