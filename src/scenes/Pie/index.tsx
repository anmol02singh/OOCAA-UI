import React from "react";
import { Box } from "@mui/material";
import Header from "../../components/Header.tsx";
import PieChart from "../../components/PieChart.tsx";

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