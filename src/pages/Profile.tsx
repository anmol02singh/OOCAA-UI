import React, { useContext, useState } from 'react';
import { TextField, useTheme } from '@mui/material';
import { ColorModeContext, themeSettings, tokens } from '../theme.tsx';
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
        padding: '3rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary[400],
        borderRadius: "9px",
    };

    const profileElements: React.CSSProperties = {
        width: '100%',
        height: '100%',
        padding: '0',
        margin: '0',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const pictureContainer: React.CSSProperties = {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    const profilePicture: React.CSSProperties = {
        width: '10rem',
        height: '10rem',
        cursor: "pointer",
        borderRadius: "50%"
    }

    const profileButton: React.CSSProperties = {
        width: '50%',
        padding: '1rem',
        cursor: 'pointer',
        borderRadius: '6px',
        color: colors.grey[100],
        backgroundColor: colors.primary[500],
        textTransform: 'none',
        fontSize: '1rem',
        // border: '1px solid ' + colors.grey[500],
    }

    const profileTextField: React.CSSProperties = {
        width: '100%',
        cursor: 'pointer',
        borderRadius: '9px',
        color: colors.grey[100],
        backgroundColor: colors.primary[500],
        textTransform: 'none',
        fontSize: '1rem',
        borderWidth: '1px' //Make this work*****
    }

    return (
        <Box sx={pageContainer}>
            <Box component="form" noValidate autoComplete='off' sx={profileContainer}>
                <Grid container sx={profileElements} spacing={2}> {/* use Grid? */}
                    <Grid size={4}>
                        <Box sx={pictureContainer}>
                            <img
                                alt="profile-user"                            
                                src = "zuc.png"   
                                style={profilePicture}                             
                            />
                        </Box>
                    </Grid>
                    <Grid size={8}>
                        <Button 
                            sx={{
                                ...profileButton,
                                '&:hover': {
                                    backgroundColor: colors.primary[600],
                                    color: colors.blueAccent[500],
                                },
                            }}>
                            Save Profile
                        </Button>
                    </Grid>

                    <Grid size={6}>
                        <Typography>

                        </Typography>
                        <TextField fullWidth sx={profileTextField}>
                        </TextField>
                    </Grid>
                    <Grid size={6}>
                        <TextField fullWidth>
                        </TextField>
                    </Grid>

                    <Grid size={6}>
                        <TextField fullWidth>
                        </TextField>
                    </Grid>
                    <Grid size={6}>
                        <TextField fullWidth>
                        </TextField>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
export default Profile;