import React, { useContext, useState } from 'react';
import { TextField, useTheme } from '@mui/material';
import { ColorModeContext, themeSettings, tokens } from '../theme.tsx';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";


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
    const [formValid, setFormValid] = useState(false);
    const [editMode, setEditMode] = useState(true);

    const handleChange = (event) => {
        setFormValid(event.target.form.checkValidity());
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setEditMode(false);
        // const formData = new FormData(event.currentTarget);
        // console.log("Form submitted:", Object.fromEntries(formData));
    };

    const handleEdit = (event) => {
        event.preventDefault();
        setEditMode(true);
    };

    const handleCancel = (event) => {
        event.preventDefault();
        setEditMode(false);
    };
    

    /*==========General Styling==========*/
    const pageContainer: React.CSSProperties = {
        width: '100%',
        height: '100%',
        minHeight: '50rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: colors.primary[500],
    };

    const profileContainer: React.CSSProperties = {
        top: 0,
        width: '90%',
        maxWidth: '55rem',
        minWidth: '35rem',
        padding: '3rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary[400],
        borderRadius: '9px',
        overflow: 'hidden',
        marginTop: '5rem'
    };

    const profileElements: React.CSSProperties = {
        width: '100%',
        padding: '0',
        margin: '0',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const pictureContainer: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
    
    /*==========Regular Profile Display==========*/    
    const profileRegInfoContainer: React.CSSProperties = {
        ...profileContainer,
        maxWidth: '55rem',
    };
    
    const profilePicture: React.CSSProperties = {
        width: '10rem',
        height: '10rem',
        cursor: "pointer",
        borderRadius: "50%"
    }

    const buttonContainer: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'flex-end',
    }

    const profileButton: React.CSSProperties = {
        width: '10rem',
        padding: '1rem',
        cursor: 'pointer',
        borderRadius: '6px',
        color: colors.grey[100],
        backgroundColor: colors.primary[500],
        textTransform: 'none',
        fontSize: '1rem',
        margin: '0.5rem',
        // border: '1px solid ' + colors.grey[500],
    }

    const profileButton_hover: React.CSSProperties = {
        backgroundColor: colors.primary[600],
        color: colors.blueAccent[500],
    }

    const profileFieldLabel: React.CSSProperties = {
        margin: '0.3rem 0.1rem',
        color: colors.grey[300]
    }

    const profileFieldInput: React.CSSProperties = {
        margin: '0.3rem 0.1rem',
        color: colors.grey[100],        
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

    /*==========Edit Profile Display==========*/
    const editProfileContainer: React.CSSProperties = {
        ...profileContainer,
        maxWidth: '50rem',
    };

    const editProfileHeader: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const editProfilePicture: React.CSSProperties = {
        ...profilePicture,
        width: '6rem',
        height: '6rem',
    }

    const profileFieldButton: React.CSSProperties = {
        height: '3.5rem',
        cursor: 'pointer',
        borderRadius: '6px',
        color: colors.grey[100],
        backgroundColor: colors.primary[500],
        textTransform: 'none',
        fontSize: '16px',
        justifyContent: 'flex-start',
        padding: '0 1rem',
    }

    const profileFieldButton_hover: React.CSSProperties = {
        backgroundColor: colors.primary[600],
        color: colors.blueAccent[400],
    }

    const profileFieldButton_click: React.CSSProperties = {
        color: colors.blueAccent[500],
    }

/* Form template
<Box component="form" onSubmit={handleSubmit} noValidate autoComplete='off' sx={profileContainer}>
</Box>*/

    return (
        <Box sx={pageContainer}>
            {editMode ? (
                <Box sx={editProfileContainer}>
                    <Grid container sx={profileElements} rowSpacing={3} columnSpacing={2}>
                        <Grid size={2}>
                            <IconButton onClick={handleCancel}>
                                <ArrowBackIcon sx={{fontSize: '1.8rem'}} />
                            </IconButton>
                        </Grid>
                        <Grid size={8} sx={editProfileHeader}>
                            <Typography variant='h2' sx={{color: colors.grey[100]}}>
                                Edit Profile
                            </Typography>
                        </Grid>
                        <Grid size={2}>
                            
                        </Grid>
                        
                        <Grid size={12} sx={pictureContainer}>
                            <img
                                alt="profile-user"                            
                                src = "zuc.png"   
                                style={editProfilePicture}                             
                            />
                        </Grid>

                        <Grid size={12}>
                            <Typography variant='h6' sx={profileFieldLabel}>
                                Full Name
                            </Typography>
                            <Button
                                fullWidth
                                onClick={() => {
                                    setEditMode(true)
                                }}
                                sx={{
                                    ...profileFieldButton,
                                    '&:hover': {
                                        ...profileFieldButton_hover
                                    },
                                    '&:active': {
                                        ...profileFieldButton_click
                                    },
                                }}
                            >
                                John Smith
                            </Button>
                        </Grid>

                        <Grid size={12}>
                            <Typography variant='h6' sx={profileFieldLabel}>
                                Username
                            </Typography>
                            <Button
                                fullWidth
                                onClick={() => {
                                    setEditMode(true)
                                }}
                                sx={{
                                    ...profileFieldButton,
                                    '&:hover': {
                                        ...profileFieldButton_hover
                                    },
                                    '&:active': {
                                        ...profileFieldButton_click
                                    },
                                }}
                            >
                                JSmith
                            </Button>
                        </Grid>                  

                        <Grid size={12}>
                            <Typography variant='h6' sx={profileFieldLabel}>
                                Email
                            </Typography>
                            <Button
                                fullWidth
                                onClick={() => {
                                    setEditMode(true)
                                }}
                                sx={{
                                    ...profileFieldButton,
                                    '&:hover': {
                                        ...profileFieldButton_hover
                                    },
                                    '&:active': {
                                        ...profileFieldButton_click
                                    },
                                }}
                            >
                                John.Smith@gmail.com
                            </Button>
                        </Grid> 

                        <Grid size={12}>
                            <Typography variant='h6' sx={profileFieldLabel}>
                                Phone Number
                            </Typography>
                            <Button
                                fullWidth
                                onClick={() => {
                                    setEditMode(true)
                                }}
                                sx={{
                                    ...profileFieldButton,
                                    '&:hover': {
                                        ...profileFieldButton_hover
                                    },
                                    '&:active': {
                                        ...profileFieldButton_click
                                    },
                                }}
                            >
                                +1 (416)-123-4567
                            </Button>
                        </Grid> 
                    </Grid>
                </Box>
            ):(
                <Box sx={profileRegInfoContainer}>
                    <Grid container sx={profileElements} rowSpacing={3} columnSpacing={2}>
                        <Grid size={4} sx={pictureContainer}>
                            <img
                                alt="profile-user"                            
                                src = "zuc.png"   
                                style={profilePicture}                             
                            />
                        </Grid>
                        <Grid size={8} sx={buttonContainer}>
                            <Button 
                                onClick={handleEdit}
                                sx={{
                                    ...profileButton,
                                    '&:hover': {
                                        ...profileButton_hover
                                    },
                                }}
                            >
                                Edit Profile
                            </Button>
                        </Grid>

                        <Grid size={12}>
                            <Typography variant='h5' sx={profileFieldLabel}>
                                Username
                            </Typography>
                            <Typography variant='h6' sx={profileFieldInput}>
                                Username
                            </Typography>
                        </Grid>

                        <Grid size={6}>
                            <Typography variant='h5' sx={profileFieldLabel}>
                                First Name
                            </Typography>
                            <Typography variant='h6' sx={profileFieldInput}>
                                John
                            </Typography>
                        </Grid>
                        <Grid size={6}>
                            <Typography variant='h5' sx={profileFieldLabel}>
                                Last Name
                            </Typography>
                            <Typography variant='h6' sx={profileFieldInput}>
                                Smith
                            </Typography>
                        </Grid>                    

                        <Grid size={12}>
                            <Typography variant='h5' sx={profileFieldLabel}>
                                Email
                            </Typography>
                            <Typography variant='h6' sx={profileFieldInput}>
                                john.smith@gmail.com
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            )}            
        </Box>
    );
}
export default Profile;