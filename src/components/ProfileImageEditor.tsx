import React, { useEffect, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Button, IconButton, Slider, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';
import {
    useGeneralStyling,
    useEditItemStyling,
    useEditProfileStyling,

} from '../pages/Profile/ProfileUtilities.tsx';
import { tokens } from '../theme.tsx';
import { removeProfileImage, updateProfileImage } from '../API/account.tsx';

const ProfileImageEditor = (props: {
    open: boolean;
    onClose: () => void;
    pageWidth: number;
    profileImage?: {
        publicId?: string,
        url?: string | undefined,
    }
}) => {

    const { open, onClose, pageWidth, profileImage } = props;

    const token = localStorage.getItem("accountToken");
    if (!token) {
        onClose();
    }

    const {
        profileDialogueContainer,
        button_hover,
    } = useGeneralStyling();

    const {
        profileImageEditor,
        profilePictureContainer,
        uploadImagebutton,
    } = useEditProfileStyling();

    const {
        editItemSaveButton,
        errorMessageStyle,
    } = useEditItemStyling();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const imageUploadRef = useRef<HTMLInputElement | null>(null);
    const editorContainerRef = useRef<HTMLInputElement | null>(null);
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    const editorRef = useRef<any>(null);
        //typescript gets mad if I don't use any and try to call editorRef.current.getImageScaledToCanvas.
    
    const [newProfileImage, setNewProfileImage] = useState<string | undefined>(undefined);
    const [scale, setScale] = useState<number>(1);
    const [disabled, setDisabled] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    const maxScale = 3;
    const minScale = 1;
    const scaleAdjust = 0.1;

    useEffect(() => {
        const editor = editorContainerRef.current;

        if (imageUploadRef.current) imageUploadRef.current.value = ''; //Clear image from input.
        setNewProfileImage(undefined);            
        setError(false);

        if (editor) {
            editor.addEventListener("wheel", handleWheel);
        }

        if(profileImage){
            setDisabled(!profileImage.publicId?.includes("OOCAA/profileImages/placeholderProfileImage"))
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
            if (imageUploadRef.current) imageUploadRef.current.value = ''; //Clear image from input.
            setNewProfileImage(undefined);            
            setError(false);
        }

        if(open && profileImage && profileImage.publicId){
            setDisabled(profileImage.publicId.includes("OOCAA/profileImages/placeholderProfileImage"));
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
    }, [newProfileImage]);

    const handleClickUpload = () => {
        if (!imageUploadRef || !imageUploadRef.current) return;
        imageUploadRef.current.click();
    };

    const handleChangeImage = (event) => {
        const file = event.target.files[0];
        if(!file) return;
        
        //Deny file if bigger than 8MB.
        if((file.size/1024)/1024 > 8){
            setError(true);
            return;
        }
        setError(false);
        setNewProfileImage(file);
    };

    const handleRemoveImage = () => {
        if (token) {
            removeProfileImage(token)
                .then((success) => {
                    if (!success) {
                        return;
                    }
                    onClose();
                    window.location.reload()
                });
        }
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

    const handleSlider = (event: Event, newValue: number | number[]) => {
        const val = newValue as number
        if(val < minScale || val > maxScale) return;
        setScale(val);
    };

    const handleClose = () => {
        onClose();
    }

    const handleCancel = () => {
        setNewProfileImage(undefined);
    }

    const handleSubmit = () => {
        if (editorRef && editorRef.current) {
            const canvas = editorRef.current.getImageScaledToCanvas();
            if (token) {
                updateProfileImage(token, canvas.toDataURL())
                    .then((success) => {
                        if (!success) {
                            return;
                        }
                        window.location.reload();
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
                    ...profileDialogueContainer(pageWidth),
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
                        <CloseIcon sx={{ fontSize: '1.8rem' }} />
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
            <DialogContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    width: '100%',
                    overflow: 'visible',
                    gap: '1rem',
                }}
            >
                <Box
                    ref={editorContainerRef}
                    sx={profilePictureContainer}
                >
                    {newProfileImage ?
                        <AvatarEditor
                            ref={editorRef}
                            image={newProfileImage}
                            width={profileImageEditor.width}
                            height={profileImageEditor.height}
                            border={profileImageEditor.border}
                            scale={scale}
                            rotate={0}
                            borderRadius={profileImageEditor.avatarBorderRadius}
                            style={{
                                borderRadius: profileImageEditor.borderRadius,
                                backgroundColor: "transparent",
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
                {error && (
                    <Typography variant='h6' sx={errorMessageStyle}>
                        <ErrorIcon/> File cannot be larger than 8.00MB.
                    </Typography>
                )}
                {newProfileImage && 
                    <Slider
                        value={scale}
                        onChange={handleSlider}
                        step={0.01}
                        min={minScale}
                        max={maxScale}
                        sx={{
                            width: '16rem',
                            color: colors.primary[500],
                        }}
                    />
                }
            </DialogContent>
            <DialogActions>
                {newProfileImage ?
                    <>
                        <Button
                            onClick={handleCancel}
                            sx={{
                                ...editItemSaveButton,
                                '&:hover': {
                                    ...button_hover
                                },
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type='submit'
                            onClick={handleSubmit}
                            sx={{
                                ...editItemSaveButton,
                                '&:hover': {
                                    ...button_hover,
                                    color: colors.greenAccent[500],
                                },
                            }}
                        >
                            Apply
                        </Button>
                    </>
                    :
                    <Button
                        onClick={handleRemoveImage}
                        disabled={disabled}
                        sx={{
                            ...editItemSaveButton,
                            width: '9rem',
                            '&:hover': {
                                ...button_hover,
                                color: colors.redAccent[500],
                            },
                        }}
                    >
                        Remove Image
                    </Button>

                }
            </DialogActions>
        </Dialog>
    );
}
export default ProfileImageEditor;