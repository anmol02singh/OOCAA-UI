import React, { useEffect, useRef, useState } from 'react';
import { Button, Tooltip, useTheme } from '@mui/material';
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
import { userdata } from '../../API/account.tsx';
import { tokens } from '../../theme.tsx';
import { useNavigate } from 'react-router-dom';
import { Account } from '../../types.tsx';
import RoleChangeRequestDialog from '../../components/RoleChangeRequestDialog.tsx';
import { createRoleChangeRequest } from '../../API/roleChangeRequest.tsx';

const Profile = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("accountToken");
    if (!token) {
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
        regProfileInfoSubheader,
        regProfileCardText,
        regProfileInfoHeader,
        regProfileFieldContainer,
        regProfileFieldValue,
        regButtonContainer,
        regProfileButton,
    } = useProfileDisplayStyling();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    //User data
    const [userData, setUserData] = useState<Account>({
        name: '',
        username: '',
        email: '',
        phoneNumber: '',
        role: '',
        roleNum: undefined,
        profileImage: {
            publicId: '',
            url: undefined,
        },
    });

    const boxRef = useRef<HTMLDivElement>(null);
    const [pageWidth, setPageWidth] = useState(getPageWidth(boxRef));

    const updatePageWidth = () => {
        const newPageWidth = getPageWidth(boxRef);
        setPageWidth(newPageWidth);
    }

    const isDisabled: boolean = !(userData.roleNum !== undefined && userData.roleNum > 0);
    const [submitRequest, setSubmitRequest] = useState<boolean>(false);
    const [dialogueOpen, setDialogueOpen] = React.useState(false);

    const handleClose = () => {
        setDialogueOpen(false);
    };

    const handleRequest = () => {
        setDialogueOpen(true);
    };

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
                        roleNum: json.roleNum,
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

    useEffect(() => {
        handleSubmitRequest();
    }, [submitRequest]);

    const handleSubmitRequest = () => {
        if (!submitRequest) return;
        if (!token) return;
        if (!userData) return;
        if (!userData.roleNum) return;
        if (isDisabled) return;

        createRoleChangeRequest(token, new Date().toISOString(), userData.roleNum - 1)
        setSubmitRequest(false);
    }

    const changeRoleButton = (
        <Button
            onClick={handleRequest}
            disabled={isDisabled}
            sx={{
                ...regProfileButton,
                '&:hover': {
                    ...button_hover
                },
            }}
        >
            Change Role
        </Button>
    )

    const regProfileInfoElements = (
        <Box sx={regProfileInfoContainer(pageWidth)}>
            <Grid container sx={profileElements} rowSpacing={3} columnSpacing={2}>
                <Grid size={12}>
                    <Typography variant='h2' sx={regProfileInfoHeader}>
                        User Info
                    </Typography>
                </Grid>

                <Grid size={12} sx={regProfileFieldContainer}>
                    <Typography variant='h6' sx={fieldLabel}>
                        Name
                    </Typography>
                    <Typography variant='h5' sx={regProfileFieldValue}>
                        {userData.name}
                    </Typography>
                </Grid>

                <Grid size={12} sx={regProfileFieldContainer}>
                    <Typography variant='h6' sx={fieldLabel}>
                        Username
                    </Typography>
                    <Typography variant='h5' sx={regProfileFieldValue}>
                        {userData.username}
                    </Typography>
                </Grid>

                <Grid size={12} sx={regProfileFieldContainer}>
                    <Typography variant='h6' sx={fieldLabel}>
                        Email
                    </Typography>
                    <Typography variant='h5' sx={regProfileFieldValue}>
                        {userData.email}
                    </Typography>
                </Grid>

                <Grid size={12} sx={regProfileFieldContainer}>
                    <Typography variant='h6' sx={fieldLabel}>
                        Phone Number
                    </Typography>
                    <Typography variant='h5' sx={regProfileFieldValue}>
                        {userData.phoneNumber}
                    </Typography>
                </Grid>

                <Grid size={12} sx={regButtonContainer}>
                    {isDisabled ?
                        <>
                            <Tooltip
                                title="See Manage Accounts to change account roles."
                                arrow
                                enterDelay={1000}
                                enterNextDelay={1000}
                                slotProps={{
                                    popper: {
                                        sx: {
                                            zIndex: 3000,
                                        }
                                    },
                                    tooltip: {
                                        sx: {
                                            backgroundColor: colors.primary[350],
                                            fontSize: '12px',
                                            width: '10rem',
                                        },
                                    },
                                    arrow: {
                                        sx: {
                                            color: colors.primary[350],
                                        }
                                    }
                                }}
                            >
                                <span>
                                    {changeRoleButton}
                                </span>
                            </Tooltip>
                        </>
                        :
                        changeRoleButton
                    }
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
            <RoleChangeRequestDialog
                open={dialogueOpen}
                onClose={handleClose}
                pageWidth={pageWidth}
                roleNum={userData.roleNum}
                setSubmitRequest={setSubmitRequest}
            />
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
                                {userData.profileImage?.url && (
                                    <img
                                        alt='profile-user'
                                        src={userData.profileImage.url}
                                        style={{
                                            ...profilePicture,
                                            cursor: "default",
                                        }}
                                    />
                                )}
                            </Box>
                        </Grid>

                        <Grid size={12}>
                            <Typography
                                variant='h2'
                                sx={{
                                    ...regProfileInfoSubheader(pageWidth),
                                    fontWeight: 'bold',
                                }}
                            >
                                {userData.username}
                            </Typography>
                            <Typography
                                variant='h5'
                                sx={{
                                    ...regProfileInfoSubheader(pageWidth),
                                    color: colors.greenAccent[500]
                                }}
                            >
                                {userData.role?.toUpperCase() ?? ''}
                            </Typography>
                        </Grid>

                        <Grid size={12}>
                            <Typography
                                variant='h6'
                                sx={{
                                    ...regProfileCardText(pageWidth),
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
