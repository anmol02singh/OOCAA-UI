import React, { FC } from "react";
import { Box,Typography, useTheme } from "@mui/material";
import { tokens } from "/Users/san/OOCAA-UI/src/theme.tsx";
import ProgressCircle from "/Users/san/OOCAA-UI/src/components/ProgressCircle.tsx";

const StatBox = ({title, subtitle, icon, progress, increase}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box width = "100%"  m = "0 30px"  > 
            <Box sx = {{ display : "flex" , justifyContent : "space-between"}}>
                <Box>
                   {icon}
                   <Typography variant = "h4" fontWeight= "bold" sx = {{color: colors.grey[100]}}>
                    {title}
                   </Typography>
                </Box>
            <Box>
                <ProgressCircle progress = "progress" />
            </Box>
            </Box>

            <Box sx = {{ display : "flex" , justifyContent : "space-between"}}>
                <Typography variant = "h5" sx = {{color: colors.greenAccent[500]}}>
                    {subtitle}
                </Typography>

                <Typography variant = "h5" fontStyle= "italic" sx = {{color: colors.greenAccent[600]}}>
                    {increase}
                </Typography>
            </Box>
            
        </Box>
    );

};

export default StatBox;
