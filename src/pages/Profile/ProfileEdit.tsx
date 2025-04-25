import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import {
    useNavigation,
    useGeneralStyling,
    formatPhoneNumber,
    getPageWidth,
    useEditProfileStyling,

} from './ProfileUtilities.tsx';
import { userdata } from '../../API/account.tsx';
import { tokens } from '../../theme.tsx';
import routes from '../../routes.js';
import ProfileImageEditor from '../../components/ProfileImageEditor.tsx';
import { Account } from '../../types.tsx';

const ProfileEdit = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem("accountToken");
    if (!token) {
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
    const [userData, setUserData] = useState<Account>({
        name: '',
        username: '',
        email: '',
        phoneNumber: '',
        role: '',
        profileImage: {
            publicId: '',
            url: undefined,
        },
    });

    const [dialogueOpen, setDialogueOpen] = React.useState(false);

    const handleClose = () => {
        setDialogueOpen(false);
    };

    const boxRef = useRef<HTMLDivElement>(null);
    const [pageWidth, setPageWidth] = useState(getPageWidth(boxRef));

    const updatePageWidth = () => {
        const newPageWidth = getPageWidth(boxRef);
        setPageWidth(newPageWidth);
    }

    useEffect(() => {
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
                        profileImage: json.profileImage,
                    });
                });
        }
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        updatePageWidth();
        window.addEventListener('resize', updatePageWidth);

        return () => {
            window.removeEventListener('resize', updatePageWidth);
        };
    }, [pageWidth]);

    const handleEditItem = (pageName: string) => {
        switch (pageName) {
            case 'editPhoto':
                setDialogueOpen(true);
                break;
            case 'editName':
                navigate(routes.editProfileName);
                break;
            case 'editEmail':
                navigate(routes.editProfileEmail);
                break;
            case 'editPhone':
                navigate(routes.editProfilePhone);
                break;
        }
    }

    return (
        <Box ref={boxRef} sx={pageContainer}>
            <Box sx={editProfileContainer(pageWidth)}>
                <Grid container sx={profileElements} rowSpacing={3} columnSpacing={2}>
                    <Grid size={2}>
                        <IconButton onClick={handleCancel}>
                            <ArrowBackIcon sx={{ fontSize: '1.8rem' }} />
                        </IconButton>
                    </Grid>
                    <Grid size={8} sx={editProfileHeader}>
                        <Typography variant='h2' sx={{ color: colors.grey[100] }}>
                            Edit Profile
                        </Typography>
                    </Grid>

                    <Grid size={12} sx={profilePictureContainer}>

                        <Box
                            onClick={() => handleEditItem('editPhoto')}
                            sx={{
                                ...editImageContainer,
                                "&:hover #editProfileImageOverlay": {
                                    opacity: 1,
                                },
                                "&:hover .icon": {
                                    opacity: 1,
                                },
                            }}
                        >
                            {userData.profileImage?.url && (
                                <>
                                    <img
                                        alt='profile-user'
                                        src={userData.profileImage.url}
                                        style={{
                                            ...profilePicture,
                                        }}
                                    />
                                    <Box
                                        id="editProfileImageOverlay"
                                        sx={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            width: "100%",
                                            height: "100%",
                                            backgroundColor: "rgba(0, 0, 0, 0.4)",
                                            opacity: 0,
                                            transition: "opacity 0.3s ease",
                                        }}
                                    />
                                    <Box
                                        className="icon"
                                        sx={{
                                            position: "absolute",
                                            top: "50%",
                                            left: "50%",
                                            transform: "translate(-50%, -50%) scale(1)",
                                            opacity: 0,
                                            transition: "opacity 0.3s ease, transform 0.3s ease",
                                            color: colors.greenAccent[500],
                                        }}
                                    >
                                        <EditIcon sx={{ fontSize: '3rem' }} />
                                    </Box>
                                </>
                            )}
                        </Box>
                    </Grid>

                    <Grid size={12}>
                        <Typography variant='h6' sx={fieldLabel}>
                            Name
                        </Typography>
                        <Button
                            fullWidth
                            onClick={() => handleEditItem('editName')}
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
                                onClick={() => handleEditItem('editName')}
                            >
                                {userData.name}
                            </Typography>
                        </Button>
                    </Grid>

                    <Grid size={12}>
                        <Typography variant='h6' sx={fieldLabel}>
                            Email
                        </Typography>
                        <Button
                            fullWidth
                            onClick={() => handleEditItem('editEmail')}
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
                                onClick={() => handleEditItem('editEmail')}
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
                            onClick={() => handleEditItem('editPhone')}
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
                                onClick={() => handleEditItem('editPhone')}
                            >
                                {userData.phoneNumber}
                            </Typography>
                        </Button>

                        
                    </Grid>
                </Grid>
                <ProfileImageEditor
                    open={dialogueOpen}
                    onClose={handleClose}
                    pageWidth={pageWidth}
                    profileImage={userData.profileImage}
                />
            </Box>
        </Box>
    );
}
export default ProfileEdit;
