import React from "react";
import { Box } from "@mui/material";
import Header from "../../components/Header.tsx";
import BarChart from "../../components/BarChart.tsx";

const Bar = () => {
 return(
    <Box m = "20px"> 
        <Header title = "Bar Chart" subtitle = "Simple Bar Chart" />
        <Box sx = {{height: "75vh"}}> 
           <BarChart/> 
        </Box>
    </Box>
 )
}

export default Bar;