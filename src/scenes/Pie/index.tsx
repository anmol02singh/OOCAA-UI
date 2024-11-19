import React from "react";
import { Box } from "@mui/material";
import Header from "/Users/san/OOCAA-UI/src/components/Header.tsx";
import PieChart from "/Users/san/OOCAA-UI/src/components/PieChart.tsx";

const Pie = () => {
 return(
    <Box m = "20px"> 
        <Header title = "Pie Chart" subtitle = "Simple Pie Chart" />
        <Box sx = {{height: "75vh"}}> 
           <PieChart/> 
        </Box>
    </Box>
 )
}

export default Pie;