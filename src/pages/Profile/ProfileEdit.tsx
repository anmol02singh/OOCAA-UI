import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
    useNavigation,
    useGeneralStyling,
    formatPhoneNumber,
    getPageWidth,
    useEditProfileStyling,

} from './ProfileUtilities.tsx';
import { userdata } from '../../API/account';
import { tokens } from '../../theme.tsx';
import routes from '../../routes.js';
import placeholderProfilePic from '../../assets/zuc.png';

const ProfileEdit = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("accountToken");
    if(!token){
        navigate('/login')
    }
    
    const { handleCancel } = useNavigation();
   
    const {
        pageContainer,
        profileElements,
        profilePictureContainer,
        profilePicture,
        button_hover,
        button_click,
        fieldLabel,
    } = useGeneralStyling();

    const {
        editProfileContainer,
        editProfileHeader,
        profileFieldButton,
        profileFieldButtonText,
        editImageContainer,
    } = useEditProfileStyling();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    //User data
    const [userData, setUserData] = useState({
        name: '',
        username: '',
        email: '',
        phoneNumber: '',
        role: '',
    });
    
    const boxRef = useRef<HTMLDivElement>(null);
    const [pageWidth, setPageWidth] = useState(getPageWidth(boxRef));

    const updatePageWidth = () => {
        setPageWidth(getPageWidth(boxRef));
    }

    useEffect(() => {
        updatePageWidth();
        window.addEventListener('resize', updatePageWidth);

        if (token) {
            userdata(token)
                .then(json => {
                    setUserData({
                        ...userData,                  
                        name: json.name,
                        username: json.username,
                        email: json.email,
                        phoneNumber: formatPhoneNumber(JSON.stringify(json.phoneNumber)).phoneNumber,
                        role: json.role,
                    });
                });
        }else{
            navigate('/login');
        }

        return () => {
            window.removeEventListener('resize', updatePageWidth);
        };
    }, []);

    const handleEditItem = (pageName: string) => {
        switch(pageName){
            case 'editName':
                navigate(routes.editProfileName)
                break;
            // case 'editUsername':
            //     navigate('/profile/edit/username')
            //     break;
            case 'editEmail':
                navigate(routes.editProfileEmail)
                break;
            case 'editPhone':
                navigate(routes.editProfilePhone)
                break;            
        }
    }

    return (
        <Box ref={boxRef} sx={pageContainer}>
            <Box sx={editProfileContainer(pageWidth)}>
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
                    
                    <Grid size={12} sx={profilePictureContainer}>
                            <Box sx={editImageContainer}>
                                <img
                                    alt='profile-user'
                                    src = {placeholderProfilePic}
                                    style={profilePicture}
                                />
                            </Box>
                        </Grid>

                    <Grid size={12}>
                        <Typography variant='h6' sx={fieldLabel}>
                            Name
                        </Typography>
                        <Button
                            fullWidth
                            onClick={()=>handleEditItem('editName')}
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
                            <Typography
                                sx={profileFieldButtonText}
                                onClick={()=>handleEditItem('editName')}
                            >
                                {userData.name}
                            </Typography>
                        </Button>                            
                    </Grid>

                    {/* <Grid size={12}>
                        <Typography variant='h6' sx={fieldLabel}>
                            Username
                        </Typography>
                        <Button
                            fullWidth
                            name="editUsername"
                            onClick={()=>handleEditItem(states.editUsername)}
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
                            <Typography sx={profileFieldButtonText}>
                                {userData.username}
                            </Typography>
                        </Button>
                    </Grid>                   */}

                    <Grid size={12}>
                        <Typography variant='h6' sx={fieldLabel}>
                            Email
                        </Typography>
                        <Button
                            fullWidth
                            onClick={()=>handleEditItem('editEmail')}
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
                            <Typography
                                sx={profileFieldButtonText}
                                onClick={()=>handleEditItem('editEmail')}
                            >
                                {userData.email}
                            </Typography>
                        </Button>
                    </Grid> 

                    <Grid size={12}>
                        <Typography variant='h6' sx={fieldLabel}>
                            Phone Number
                        </Typography>
                        <Button
                            fullWidth
                            onClick={()=>handleEditItem('editPhone')}
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
                            <Typography
                                sx={profileFieldButtonText}
                                onClick={()=>handleEditItem('editPhone')}
                            >
                                {userData.phoneNumber}
                            </Typography>
                        </Button>
                    </Grid> 
                </Grid>
            </Box>
        </Box>
    );
}
export default ProfileEdit;