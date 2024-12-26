import React, { useContext, useState } from 'react';
import { useTheme } from '@mui/material';
import { ColorModeContext, tokens } from '../theme.tsx';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Box';
import Typography from '@mui/material/Typography';


import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';

import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';





const Profile = () => {
    
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const navigate = useNavigate();
    const [selected, setSelected] = useState<string>('Dashboard');

    const pageContainer: React.CSSProperties = {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary[500],
    };
    
    const profileContainer: React.CSSProperties = {
        width: '80%',
        height: '80%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary[400],
        borderRadius: "9px",
    };

    // const profileElements: React.CSSProperties = {
    //     width: '90%',
    //     height: '90%',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: colors.primary[400],
    // };

    return (
        <Box sx={pageContainer}>
            <Box sx={profileContainer}> {/* use Grid? */}
            </Box>
        </Box>
    );
}
export default Profile;