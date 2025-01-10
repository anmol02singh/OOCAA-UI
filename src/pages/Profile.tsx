import React, { useContext, useState } from 'react';
import { Input, TextField, useTheme } from '@mui/material';
import { ColorModeContext, themeSettings, tokens } from '../theme.tsx';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ClearIcon from "@mui/icons-material/Clear";
import { IconButton } from "@mui/material";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';

import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';



const Profile = () => {
    //Temporary Placeholders
    const fName = 'John';
    const lName = 'Smith';
    const oUsername = 'JSmith';
    const oRole = "Admin";
    const oEmail = 'John.Smith@gmail.com';
    const oPhone = '+1 (416)-123-4567';


    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const [state, setState] = useState<string>('display');
    const [formData, setFormData] = useState({
        firstName: fName,
        lastName: lName,
        username: oUsername,
        email: oEmail,
        phoneNumber: oPhone,
    });

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     setEditMode(false);
    //     // const formData = new FormData(event.currentTarget);
    //     // console.log("Form submitted:", Object.fromEntries(formData));
    // };

    const handleEdit = () => {
        setState('edit');
    };

    const handleCancel = () => {
        setState('display');
    };

    const handleEditName = () => {
        setFormData({...formData, firstName: fName, lastName: lName});
        setState('editName');
    }

    const handleEditUsername = () => {
        setFormData({...formData, username: oUsername});
        setState('editUsername');
    }

    const handleEditEmail = () => {
        setFormData({...formData, email: oEmail});
        setState('editEmail');
    }

    const handleEditPhone = () => {
        setFormData({...formData, phoneNumber: oPhone});
        setState('editPhone');
    }
    
    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value});
    }

    const handleinputCancel = (event, data) => {
        const textField = event.target.closest("div").querySelector("input");
    
        if (textField) {
            setFormData({...formData, [textField.name]: data});
        }
    };
    
    const handleSave = (/*state*/) => {
        setState('edit');
    };
    

    /*==========General Styling==========*/
    const pageContainer: React.CSSProperties = {
        width: '100%',
        height: '100%',
        minHeight: '50rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: colors.primary[500],
    };

    const profileElements: React.CSSProperties = {
        width: '100%',
    };

    const profileItemContainer: React.CSSProperties = {
        padding: '3rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary[400],
        borderRadius: '9px',   
    };

    const pictureContainer: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    const profilePicture: React.CSSProperties = {
        cursor: "pointer",
        borderRadius: "50%"
    }

    const button: React.CSSProperties = {
        padding: '0.8rem',
        cursor: 'pointer',
        borderRadius: '6px',
        color: colors.grey[100],
        backgroundColor: colors.primary[500],
        textTransform: 'none',
        fontSize: '1rem',
        margin: '0.5rem',
    }

    const button_hover: React.CSSProperties = {
        backgroundColor: colors.primary[600],
        color: colors.blueAccent[500],
    }

    const button_click: React.CSSProperties = {
        color: colors.blueAccent[500],
    }
    
    /*==========Regular Profile Display==========*/    
    const regProfileContainer: React.CSSProperties = {
        width: '90%',
        maxWidth: '85rem',
        minWidth: '50rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        // backgroundColor: colors.primary[600],
        overflow: 'hidden',
        paddingTop: '5rem',
        gap: '1rem',
    };
    
    const regProfileInfoContainer: React.CSSProperties = {
        ...profileItemContainer,
        width: '65%',  
    };

    const regProfileCardContainer: React.CSSProperties = {
        ...profileItemContainer,
        width: '35%',
    };
    
    const regProfilePicture: React.CSSProperties = {
        ...profilePicture,
        width: '10rem',
        height: '10rem',
    }

    const regProfileCardText: React.CSSProperties = {
        color: colors.grey[100],
        textAlign: 'center',
    }    

    const regProfileInfoHeader: React.CSSProperties = {
        color: colors.blueAccent[400],
    };

    const regProfileFieldLabel: React.CSSProperties = {
        margin: '0.3rem 0.1rem',
        color: colors.grey[300]
    }

    const regProfileFieldValue: React.CSSProperties = {
        margin: '0.3rem 0.1rem',
        padding: '0 0.2rem 0.3rem',
        color: colors.grey[100],
        borderBottom: 'solid 1px '+colors.grey[300],        
    }

    const regButtonContainer: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'flex-end',
    }

    const regProfileButton: React.CSSProperties = {
        ...button,
        width: '7rem',
    }

    /*==========Edit Profile Display==========*/
    const editProfileContainer: React.CSSProperties = {
        ...profileItemContainer,
        width: '90%',
        maxWidth: '50rem',
        minWidth: '35rem',
        overflow: 'hidden',
        marginTop: '5rem'
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

    /*==========General Edit Item Displays==========*/
    const editItemContainer: React.CSSProperties = {
        ...profileItemContainer,
        width: '90%',
        maxWidth: '40rem',
        minWidth: '25rem',
        overflow: 'hidden',
        marginTop: '5rem'
    };
    
    const editItemTextField: React.CSSProperties = {
        height: '3.5rem',
        cursor: 'pointer',
        borderRadius: '9px',
        color: colors.grey[100],
        backgroundColor: colors.primary[500],
    }

    const fixEditItemTextField: React.CSSProperties = {
        height: '100%',
    }

    const editItemTextField_input: React.CSSProperties = {
        fontSize: '16px',
    }

    const editItemButtonContainer: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
    }

    const editItemSaveButton: React.CSSProperties = {
        ...button,
        width: '6rem',
    }


/* Form template
<Box component="form" onSubmit={handleSubmit} noValidate autoComplete='off' sx={profileContainer}>
</Box>*/

    const contentMap = {
        display:
            <Box sx={regProfileContainer}>
                <Box sx={regProfileInfoContainer}>
                    <Grid container sx={profileElements} rowSpacing={3} columnSpacing={2}>
                        <Grid size={12}>
                            <Typography variant='h2' sx={regProfileInfoHeader}>
                                User Info
                            </Typography>
                        </Grid>
                        
                        <Grid size={12}>
                            <Typography variant='h6' sx={regProfileFieldLabel}>
                                Name
                            </Typography>
                            <Typography variant='h5' sx={regProfileFieldValue}>
                                {fName+' '+lName}
                            </Typography>
                        </Grid> 
                        
                        <Grid size={12}>
                            <Typography variant='h6' sx={regProfileFieldLabel}>
                                Username
                            </Typography>
                            <Typography variant='h5' sx={regProfileFieldValue}>
                                {oUsername}
                            </Typography>
                        </Grid>                   

                        <Grid size={12}>
                            <Typography variant='h6' sx={regProfileFieldLabel}>
                                Email
                            </Typography>
                            <Typography variant='h5' sx={regProfileFieldValue}>
                                {oEmail}
                            </Typography>
                        </Grid>

                        <Grid size={12}>
                            <Typography variant='h6' sx={regProfileFieldLabel}>
                                Phone Number
                            </Typography>
                            <Typography variant='h5' sx={regProfileFieldValue}>
                                {oPhone}
                            </Typography>
                        </Grid>

                        <Grid size={12} sx={regButtonContainer}>
                            <Button 
                                onClick={handleEdit}
                                sx={{
                                    ...regProfileButton,
                                    '&:hover': {
                                        ...button_hover
                                    },
                                }}
                            >
                                Edit Profile
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={regProfileCardContainer}>
                    <Grid container sx={profileElements} spacing={1}>
                        <Grid size={12} sx={pictureContainer}>
                            <img
                                alt="profile-user"                            
                                src = "zuc.png"   
                                style={regProfilePicture}                             
                            />
                        </Grid>

                        <Grid size={12}>
                            <Typography
                                variant='h2'
                                sx={{
                                    ...regProfileCardText,
                                    fontWeight: 'bold',
                                }}
                            >
                                {fName+' '+lName}
                            </Typography>
                            <Typography
                                variant='h5'
                                sx={{
                                    ...regProfileCardText,
                                    color: colors.greenAccent[500]
                                }}
                            >
                                {oRole.toUpperCase()}
                            </Typography>                                
                        </Grid>

                        <Grid size={12}>
                            <Typography
                                variant='h6'
                                sx={{
                                    ...regProfileCardText,
                                    color: colors.grey[300]
                                }}
                            >
                                {oEmail}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        , edit:
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
                        <Typography variant='h6' sx={regProfileFieldLabel}>
                            Name
                        </Typography>
                        <Button
                            fullWidth
                            onClick={handleEditName}
                            sx={{
                                ...profileFieldButton,
                                '&:hover': {
                                    ...button_hover
                                },
                                '&:active': {
                                    ...button_click
                                },
                            }}
                        >
                            {fName+' '+lName}
                        </Button>                            
                    </Grid>

                    <Grid size={12}>
                        <Typography variant='h6' sx={regProfileFieldLabel}>
                            Username
                        </Typography>
                        <Button
                            fullWidth
                            onClick={handleEditUsername}
                            sx={{
                                ...profileFieldButton,
                                '&:hover': {
                                    ...button_hover
                                },
                                '&:active': {
                                    ...button_click
                                },
                            }}
                        >
                            {oUsername}
                        </Button>
                    </Grid>                  

                    <Grid size={12}>
                        <Typography variant='h6' sx={regProfileFieldLabel}>
                            Email
                        </Typography>
                        <Button
                            fullWidth
                            onClick={handleEditEmail}
                            sx={{
                                ...profileFieldButton,
                                '&:hover': {
                                    ...button_hover
                                },
                                '&:active': {
                                    ...button_click
                                },
                            }}
                        >
                            {oEmail}
                        </Button>
                    </Grid> 

                    <Grid size={12}>
                        <Typography variant='h6' sx={regProfileFieldLabel}>
                            Phone Number
                        </Typography>
                        <Button
                            fullWidth
                            onClick={handleEditPhone}
                            sx={{
                                ...profileFieldButton,
                                '&:hover': {
                                    ...button_hover
                                },
                                '&:active': {
                                    ...button_click
                                },
                            }}
                        >
                            {oPhone}
                        </Button>
                    </Grid> 
                </Grid>
            </Box>
        , editName:            
            <Box sx={editItemContainer}>
                <Grid container sx={profileElements} rowSpacing={3} columnSpacing={2}>
                    <Grid size={2}>
                        <IconButton onClick={handleEdit}>
                            <ArrowBackIcon sx={{fontSize: '1.8rem'}} />
                        </IconButton>
                    </Grid>
                    <Grid size={8} sx={editProfileHeader}>
                        <Typography variant='h3' sx={{color: colors.grey[100]}}>
                            Edit Name
                        </Typography>
                    </Grid>
                    <Grid size={2}>                            
                    </Grid>

                    <Grid size={12}>
                        <Typography variant='h6' sx={regProfileFieldLabel}>
                            First Name
                        </Typography>
                        <TextField
                            fullWidth
                            name='firstName'
                            value={formData.firstName}
                            onChange={handleChange}
                            slotProps={{
                                input:{
                                    endAdornment: formData.firstName!==fName ? (
                                        <IconButton size="small" onClick={(event) => handleinputCancel(event, fName)}>
                                            <ClearIcon />
                                        </IconButton>
                                    ) : undefined
                                }
                            }}
                            sx={{
                                ...editItemTextField,
                                "& .MuiInputBase-root": {
                                    ...fixEditItemTextField
                                },
                                "& .MuiInputBase-input": {
                                    ...editItemTextField_input
                                }
                            }}
                        >
                        </TextField>                            
                    </Grid>

                    <Grid size={12}>
                        <Typography variant='h6' sx={regProfileFieldLabel}>
                            Last Name
                        </Typography>
                        <TextField
                            fullWidth
                            name='lastName'
                            value={formData.lastName}
                            onChange={handleChange}
                            slotProps={{
                                input:{
                                    endAdornment: formData.lastName!==lName ? (
                                        <IconButton size="small" onClick={(event) => handleinputCancel(event, lName)}>
                                            <ClearIcon />
                                        </IconButton>
                                    ) : undefined
                                }
                            }}
                            sx={{
                                ...editItemTextField,
                                "& .MuiInputBase-root": {
                                    ...fixEditItemTextField
                                },
                                "& .MuiInputBase-input": {
                                    ...editItemTextField_input
                                }
                            }}
                        >
                        </TextField> 
                    </Grid>                  

                    <Grid size={12} sx={editItemButtonContainer}>
                        <Button 
                            onClick={handleSave/*(state)*/}
                            sx={{
                                ...editItemSaveButton,
                                '&:hover': {
                                    ...button_hover
                                },
                            }}
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        , editUsername:
        <Box sx={editItemContainer}>
            <Grid container sx={profileElements} rowSpacing={3} columnSpacing={2}>
                <Grid size={2}>
                    <IconButton onClick={handleEdit}>
                        <ArrowBackIcon sx={{fontSize: '1.8rem'}} />
                    </IconButton>
                </Grid>
                <Grid size={8} sx={editProfileHeader}>
                    <Typography variant='h3' sx={{color: colors.grey[100]}}>
                        Edit Username
                    </Typography>
                </Grid>
                <Grid size={2}>                            
                </Grid>

                <Grid size={12}>
                    <Typography variant='h6' sx={regProfileFieldLabel}>
                        Username
                    </Typography>
                    <TextField
                        fullWidth
                        name='username'
                        value={formData.username}
                        onChange={handleChange}
                        slotProps={{
                            input:{
                                endAdornment: formData.username!==oUsername ? (
                                    <IconButton size="small" onClick={(event) => handleinputCancel(event, oUsername)}>
                                        <ClearIcon />
                                    </IconButton>
                                ) : undefined
                            }
                        }}
                        sx={{
                            ...editItemTextField,
                            "& .MuiInputBase-root": {
                                ...fixEditItemTextField
                            },
                            "& .MuiInputBase-input": {
                                ...editItemTextField_input
                            }
                        }}
                    >
                    </TextField>                            
                </Grid>                                

                <Grid size={12} sx={editItemButtonContainer}>
                    <Button 
                        onClick={handleSave/*(state)*/}
                        sx={{
                            ...editItemSaveButton,
                            '&:hover': {
                                ...button_hover
                            },
                        }}
                    >
                        Save
                    </Button>
                </Grid>
            </Grid>
        </Box>

        // , editEmail:

        // , editPhone:

    }

    return (
        <Box sx={pageContainer}>
            {contentMap[state]}           
        </Box>
    );
}
export default Profile;