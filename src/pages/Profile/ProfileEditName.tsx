import React, { useEffect, useRef, useState } from 'react';
import { Button, IconButton, TextField, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ErrorIcon from '@mui/icons-material/Error';
import ClearIcon from '@mui/icons-material/Clear';
import {
    useNavigation,
    useGeneralStyling,
    formatPhoneNumber,
    getPageWidth,
    useEditProfileStyling,
    useEditItemStyling,
    containsExtraSpaces,
    preventEnterSubmit,

} from './ProfileUtilities.tsx';
import { updateGeneralUserData, userdata } from '../../API/account.tsx';
import { tokens } from '../../theme.tsx';
import { useNavigate } from 'react-router-dom';
import { Account } from '../../types.tsx';

const ProfileEditName = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('accountToken');
    if(!token){
        navigate('/login')
    }
    
    const { handleEdit } = useNavigation();
   
    const {
        pageContainer,
        profileElements,
        button_hover,
        fieldLabel,
    } = useGeneralStyling();

    const {
        editProfileHeader,
    } = useEditProfileStyling();

    const {
        editItemContainer,
        editItemTextField,
        fixEditItemTextField,
        editItemTextField_input,
        editItemTextField_outline,
        editItemButtonContainer,
        errorMessageStyle,
        editItemSaveButton,
    } = useEditItemStyling();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    //User data
    const [userData, setUserData] = useState<Account>({
        name: '',
        username: '',
        email: '',
        phoneNumber: '',
        role: '',
    });
    const [newName, setNewName] = useState<string>(userData.name ?? ''); 

    const [disabled, setDisabled] = useState<boolean>(true);
    const [isInvalidInput, setInvalidInput] = useState<boolean>(false);
    const [errorMessageElement, setErrorMessageElement] = useState<{type: string, message: string | undefined}>({
        type: 'none',
        message: undefined
    });
    
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
        setNewName(userData.name ?? '');
    }, [userData]);

    const handleChange = (event) => {
        if(disabled) setDisabled(false);
    
        const fieldValue = event.target.value;

        if(fieldValue.length>150) return
    
        setNewName(fieldValue);
    }

    const handleinputCancel = (event, currentName) => {
        const textField = event.target.closest('div').querySelector('input');
    
        if (textField) {
            setNewName(currentName);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const processedName = newName.replace(containsExtraSpaces, ' ').trim();
        
        let invalidInput = false;
        setErrorMessageElement({...errorMessageElement, type: 'none'});

        if(processedName === userData.name){
            invalidInput = true;
            setErrorMessageElement({...errorMessageElement, type: 'unchangedName'});
        }

        if(!invalidInput){
            if (token) {
                updateGeneralUserData(token, processedName)
                    .then(({success, message}) => {
                        if(!success){
                            setInvalidInput(true);
                            setErrorMessageElement({...errorMessageElement, type: 'backEndError', message: message});
                            return;
                        }
                        window.location.reload()
                    });
            }
        }

        if(!isInvalidInput) setInvalidInput(invalidInput);
        return !(invalidInput);
    };

    const errorMessageElements = {
        none: undefined
        , unchangedName:
            <Typography variant='h6' sx={errorMessageStyle}>
                <ErrorIcon/> Please enter a new name.
            </Typography>
        // , unchangedUsername:            
        //     <Typography variant='h6' sx={errorMessageStyle}>
        //         *Please enter a new username.
        //     </Typography>
        , backEndError:
            <Typography variant='h6' sx={errorMessageStyle}>
                <ErrorIcon/> {errorMessageElement.message}
            </Typography>
    };

    return (
        <Box ref={boxRef} sx={pageContainer}>
            <Box component='form' onSubmit={(event)=>handleSubmit(event)} sx={editItemContainer(pageWidth)}>
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

                    <Grid size={12}>
                        <Typography variant='h6' sx={fieldLabel}>
                            Name
                        </Typography>
                        <TextField
                            fullWidth
                            name='name'
                            value={newName}
                            autoComplete='off'
                            error={isInvalidInput}
                            onChange={(event)=>handleChange(event)}
                            onKeyDown={preventEnterSubmit}
                            slotProps={{
                                input:{
                                    endAdornment: newName!==userData.name && (
                                        <IconButton size='small' onClick={(event) => handleinputCancel(event, userData.name)}>
                                            <ClearIcon />
                                        </IconButton>
                                    )
                                }
                            }}
                            sx={{
                                ...editItemTextField,
                                '& .MuiInputBase-root': {
                                    ...fixEditItemTextField,
                                },
                                '& .MuiInputBase-input': {
                                    ...editItemTextField_input,
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    ...editItemTextField_outline,
                                    '&:hover': {
                                        borderColor: colors.grey[100],
                                    },
                                    '&.Mui-focused': {
                                        border: 'none',
                                    },
                                },
                            }}
                        >
                        </TextField> 
                        {errorMessageElements[errorMessageElement.type]}                           
                    </Grid>

                    <Grid
                        size={12}
                        sx={{
                            height: '4rem'
                        }}
                    >
                        {/*Spacing for dropdown*/}
                    </Grid>   

                    <Grid size={12} sx={editItemButtonContainer}>
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
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
export default ProfileEditName;