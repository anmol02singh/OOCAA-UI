import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AvatarEditor from 'react-avatar-editor';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Button, IconButton, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
    useGeneralStyling,
    useEditItemStyling,
    useEditProfileStyling,

} from '../pages/Profile/ProfileUtilities.tsx';
import { tokens } from '../theme.tsx';
import { updateProfileImage } from '../API/account.js';

const ProfileImageEditor = (props: {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
    pageWidth: number;
}) => {
    
    const navigate = useNavigate();
    const token = localStorage.getItem("accountToken");
    if(!token){
        navigate('/login')
    }

    const {
        profileDialogueContainer,
        button_hover,
    } = useGeneralStyling();

    const {
        uploadImagebutton,
    } = useEditProfileStyling();

    const {
        editItemSaveButton,
    } = useEditItemStyling();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const imageUploadRef = useRef<HTMLInputElement | null>(null);
    const editorContainerRef = useRef<HTMLInputElement | null>(null);
    const editorRef = useRef<AvatarEditor | null>(null);
    

    //Styling
    const profileImageEditor = {
        width: 200,
        height: 200,
        border: 50,
        backgroundColor: colors.primary[600],
        avatarBorderRadius: 125,
        borderRadius: '9px',
    }

    const profilePictureContainer: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: `${profileImageEditor.width + (profileImageEditor.border * 2)}px`,
        height: `${profileImageEditor.height + (profileImageEditor.border * 2)}px`,
        backgroundColor: profileImageEditor.backgroundColor,
        borderRadius: profileImageEditor.borderRadius,
        padding: 'none',
    }

    const { onClose, selectedValue, open } = props;
    const [profileImage, setProfileImage] = useState<string | undefined>(undefined);
    const [scale, setScale] = useState<number>(1);

    const maxScale = 3;
    const minScale = 1;
    const scaleAdjust = 0.1;

    useEffect(() => {
        const editor = editorContainerRef.current;

        setProfileImage(undefined);

        if (editor) {
            editor.addEventListener("wheel", handleWheel);
        }

        return () => {
            if (editor) {
                editor.removeEventListener("wheel", handleWheel);
            }
        };
    }, []);

    useEffect(() => {
        const editor = editorContainerRef.current;

        if (open) {
            setProfileImage(undefined);
        }

        if (open && editor) {
            editor.addEventListener("wheel", handleWheel);
        }

        return () => {
            if (editor) {
                editor.removeEventListener("wheel", handleWheel);
            }
        };
    }, [open]);

    useEffect(() => {
        setScale(1);
    }, [profileImage]);

    const handleClickUpload = () => {
        if (!imageUploadRef || !imageUploadRef.current) return;
        imageUploadRef.current.click();
    };

    const handleWheel = (event) => {
        event.preventDefault();

        if (event.deltaY < 0) {
            // Scroll up: increment the scale
            setScale((prevScale) => Math.min(prevScale + scaleAdjust, maxScale));
        } else {
            // Scroll down: decrement the scale
            setScale((prevScale) => Math.max(prevScale - scaleAdjust, minScale));
        }
    };

    const handleChangeImage = (event) => {
        setProfileImage(event.target.files[0]);
    };

    const handleClose = () => {
        onClose(selectedValue);
    }

    const handleSubmit = () => {
        if (editorRef && editorRef.current) {
            // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
            const canvas = editorRef.current.getImageScaledToCanvas();
            console.log(canvas.toDataURL());
            if (token) {
                updateProfileImage(token, canvas.toDataURL())
                    .then((success) => {
                        if(!success){
                            return;
                        }
                        onClose(selectedValue);
                        window.location.reload()
                    });
            }
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            keepMounted
            sx={{
                '& .MuiPaper-root': {
                    ...profileDialogueContainer(props.pageWidth),
                },
                '& .css-kw13he-MuiDialogContent-root': {
                    padding: 0,
                },
            }}
        >

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    padding: 0
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '10%',
                    }}
                >
                    <IconButton onClick={handleClose}>
                        <ArrowBackIcon sx={{ fontSize: '1.8rem' }} />
                    </IconButton>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '80%',
                    }}
                >
                    <Typography variant='h3' sx={{ color: colors.grey[100] }}>
                        Edit Profile Picture
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        width: '10%',
                    }}
                >
                    {/* spacer */}
                </Box>
            </Box>
            <DialogContent>
                <Box
                    ref={editorContainerRef}
                    sx={profilePictureContainer}
                >
                    {profileImage ?
                        <AvatarEditor
                            ref={editorRef}
                            image={profileImage}
                            width={profileImageEditor.width}
                            height={profileImageEditor.height}
                            border={profileImageEditor.border}
                            backgroundColor={profileImageEditor.backgroundColor}
                            scale={scale}
                            rotate={0}
                            borderRadius={profileImageEditor.avatarBorderRadius}
                            style={{
                                borderRadius: profileImageEditor.borderRadius,
                                backgroundColor: profileImageEditor.backgroundColor,
                            }}
                        />
                        :
                        <>
                            <Button
                                onClick={handleClickUpload}
                                sx={{
                                    ...uploadImagebutton,

                                    '&:hover': {
                                        ...button_hover,
                                        '& #addPhotoIcon': {
                                            color: colors.blueAccent[600],
                                        },
                                    },
                                }}
                            >
                                <AddPhotoAlternateIcon
                                    id="addPhotoIcon"
                                    sx={{
                                        color: colors.greenAccent[600],
                                        fontSize: '5rem',
                                    }}
                                />
                                Upload Image
                            </Button>
                            <input
                                type='file'
                                accept='image/*'
                                ref={imageUploadRef}
                                style={{ display: 'none' }}
                                id='image-input'
                                onChange={handleChangeImage}
                            />
                        </>
                    }
                </Box>
            </DialogContent>
            {profileImage ?
                <DialogActions>
                    <Button
                        type='submit'
                        onClick={handleSubmit}
                        sx={{
                            ...editItemSaveButton,
                            '&:hover': {
                                ...button_hover
                            },
                        }}
                    >
                        Save
                    </Button>
                </DialogActions>
                :
                undefined
            }
        </Dialog>
    );
}
export default ProfileImageEditor;