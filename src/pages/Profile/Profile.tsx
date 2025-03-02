import React, { useEffect, useRef, useState } from 'react';
import { Button, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import {
    useNavigation,
    useGeneralStyling,
    formatPhoneNumber,
    getPageWidth,
    mdWindowWidth,
    useProfileDisplayStyling,

} from './ProfileUtilities.tsx';
import { userdata } from '../../API/account';
import { tokens } from '../../theme.tsx';
import placeholderProfilePic from '../../assets/zuc.png';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("accountToken");
    if(!token){
        navigate('/login')
    }
    
    const { handleEdit } = useNavigation();
   
    const {
        pageContainer,
        profileElements,
        profilePictureContainer,
        profilePicture,
        button_hover,
        fieldLabel,
    } = useGeneralStyling();

    const {
        regProfileContainer,
        regProfileInfoContainer,
        regProfileCardContainer,
        regImageContainer,
        regProfileCardText,
        regProfileInfoHeader,
        regProfileFieldValue,
        regButtonContainer,
        regProfileButton,
    } = useProfileDisplayStyling();

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
            }
    
            return () => {
                window.removeEventListener('resize', updatePageWidth);
            };
        }, []);
    
    const regProfileInfoElements = (
        <Box sx={regProfileInfoContainer(pageWidth)}>
            <Grid container sx={profileElements} rowSpacing={3} columnSpacing={2}>
                <Grid size={12}>
                    <Typography variant='h2' sx={regProfileInfoHeader}>
                        User Info
                    </Typography>
                </Grid>
                
                <Grid size={12}>
                    <Typography variant='h6' sx={fieldLabel}>
                        Name
                    </Typography>
                    <Typography variant='h5' sx={regProfileFieldValue}>
                        {userData.name}
                    </Typography>
                </Grid> 
                
                <Grid size={12}>
                    <Typography variant='h6' sx={fieldLabel}>
                        Username
                    </Typography>
                    <Typography variant='h5' sx={regProfileFieldValue}>
                        {userData.username}
                    </Typography>
                </Grid>                   

                <Grid size={12}>
                    <Typography variant='h6' sx={fieldLabel}>
                        Email
                    </Typography>
                    <Typography variant='h5' sx={regProfileFieldValue}>
                        {userData.email}
                    </Typography>
                </Grid>

                <Grid size={12}>
                    <Typography variant='h6' sx={fieldLabel}>
                        Phone Number
                    </Typography>
                    <Typography variant='h5' sx={regProfileFieldValue}>
                        {userData.phoneNumber}
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
    );

    return (
        <Box ref={boxRef} sx={pageContainer}>
            <Box sx={regProfileContainer(pageWidth)}>
                {pageWidth >= mdWindowWidth ? regProfileInfoElements : undefined}
                <Box sx={regProfileCardContainer(pageWidth)}>
                    <Grid container sx={profileElements} spacing={1}>
                        <Grid size={12} sx={profilePictureContainer}>
                            <Box sx={regImageContainer(pageWidth)}>
                                <img
                                    alt='profile-user'
                                    src = {placeholderProfilePic}
                                    style={profilePicture}
                                />
                            </Box>
                        </Grid>

                        <Grid size={12}>
                            <Typography
                                variant='h2'
                                sx={{
                                    ...regProfileCardText,
                                    fontWeight: 'bold',
                                }}
                            >
                                {userData.name}
                            </Typography>
                            <Typography
                                variant='h5'
                                sx={{
                                    ...regProfileCardText,
                                    color: colors.greenAccent[500]
                                }}
                            >
                                {userData.role.toUpperCase()}
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
                                {userData.email}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
                {pageWidth < mdWindowWidth ? regProfileInfoElements : undefined}
            </Box>
        </Box>
    );
}
export default Profile;