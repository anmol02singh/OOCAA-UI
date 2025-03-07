import React, { useEffect, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Button, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import {
    useGeneralStyling,
    useEditItemStyling,
    useEditProfileStyling,

} from '../pages/Profile/ProfileUtilities.tsx';
import { userdata } from '../API/account.js';
import { tokens } from '../theme.tsx';

const ProfileImageEditor = (props: {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
    pageWidth: number;
}) => {
    
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
    const avatarEditorRef = useRef<HTMLInputElement | null>(null);

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
        width: `${profileImageEditor.width+(profileImageEditor.border*2)}px`,
        height: `${profileImageEditor.height+(profileImageEditor.border*2)}px`,
        backgroundColor: profileImageEditor.backgroundColor,
        borderRadius: profileImageEditor.borderRadius,
        padding: 'none',
    }
    
    const { onClose, selectedValue, open } = props;
    const [disabled, setDisabled] = useState<boolean>(true);
    const [profileImage, setProfileImage] = useState<string | undefined>(undefined);
    const [scale, setScale] = useState<number>(1);

    const maxScale = 3;
    const minScale = 1;
    const scaleAdjust = 0.1;

    useEffect(() => {
        const editor = avatarEditorRef.current;

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
        const editor = avatarEditorRef.current;

        if(open){
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
        if(!imageUploadRef || !imageUploadRef.current) return;
        imageUploadRef.current.click();
    };

    const handleWheel = (event) => {
        event.preventDefault();

        if (event.deltaY < 0) {
            // Scroll up: increment the scale
            setScale((prevScale) =>  Math.min(prevScale + scaleAdjust, maxScale));
        } else {
            // Scroll down: decrement the scale
            setScale((prevScale) => Math.max(prevScale - scaleAdjust, minScale));
        }
    };

    const handleChangeImage = (event) => {
        setProfileImage(event.target.files[0]);
    };
    
    const handleSubmit = () => {
        onClose(selectedValue);
    };

    return(
        <Dialog
            open={open}
            onClose={handleSubmit}
            keepMounted
            sx={{
                '& .MuiPaper-root': {
                    ...profileDialogueContainer(props.pageWidth),
                },
                '& .css-kw13he-MuiDialogContent-root':{
                    padding: 0,
                }, 
            }}
        >
            <DialogTitle>
                <Typography variant='h3' sx={{color: colors.grey[100]}}>
                    Edit Profile Picture
                </Typography>                
            </DialogTitle>
            <DialogContent>
                <Box
                    ref={avatarEditorRef}
                    sx={profilePictureContainer}
                >
                    {profileImage ?
                        <AvatarEditor
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
                                        ...button_hover
                                    },
                                }}
                            >
                                <AddPhotoAlternateIcon sx={{fontSize: '5rem'}} />
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
            <DialogActions>
                {profileImage ?
                    <Button 
                        type='submit'
                        disabled={disabled}
                        sx={{
                            ...editItemSaveButton,
                            '&:hover': {
                                ...button_hover
                            },
                        }}
                    >
                        Save
                    </Button>
                    :
                    undefined
                }
            </DialogActions>
        </Dialog>
    );
}
export default ProfileImageEditor;