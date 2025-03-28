import React, { useEffect, useRef, useState } from 'react';
import { Button, IconButton, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ErrorIcon from '@mui/icons-material/Error';
import {
    useNavigation,
    useGeneralStyling,
    formatPhoneNumber,
    getPageWidth,
    useEditProfileStyling,
    useEditItemStyling,
    preventEnterSubmit,

} from './ProfileUtilities.tsx';
import { updateGeneralUserData, userdata } from '../../API/account.tsx';
import { tokens } from '../../theme.tsx';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import { Account } from '../../types.tsx';

const ProfileEditEmail = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("accountToken");
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
        editItemButtonContainer,
        errorMessageStyle,
        editItemSaveButton,
        editPhoneDropDown,
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
    const [newPhoneNumber, setNewPhoneNumber] = useState<string>(userData.email ?? '');

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
        setNewPhoneNumber(userData.phoneNumber ?? '');
    }, [userData]);

    const handleChange = (event) => {
        if(disabled) setDisabled(false);
    
        const fieldValue = event;
    
        setNewPhoneNumber(fieldValue);
    }

    // const handleinputCancel = (event, currentPhone) => {
    //     const textField = event.target.closest('div').querySelector('input');
    
    //     if (textField) {
    //         setNewEmail(currentPhone);
    //     }
    // };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        let invalidInput = false;
        setErrorMessageElement({...errorMessageElement, type: 'none'});

        if(newPhoneNumber === userData.phoneNumber?.replace(/\D/g, '')){
            invalidInput = true;
            setErrorMessageElement({...errorMessageElement, type: 'unchangedPhone'});
        }

        const {phoneNumber, success} = formatPhoneNumber(newPhoneNumber);

        if(!success){
            invalidInput = true;
            setErrorMessageElement({...errorMessageElement, type: 'invalidPhoneFormat'});
        }

        if(!invalidInput){
            if (token) {
                updateGeneralUserData(token, undefined, undefined, phoneNumber.replace(/\D/g, ''))
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
        , unchangedPhone:
            <Typography variant='h6' sx={errorMessageStyle}>
                <ErrorIcon/> Please enter a new phone number.
            </Typography>
        , invalidPhoneFormat:
            <Typography variant='h6' sx={errorMessageStyle}>
                <ErrorIcon/> Please enter a valid phone number.
            </Typography>
        , backEndError:
            <Typography variant='h6' sx={errorMessageStyle}>
                <ErrorIcon/> {errorMessageElement.message}
            </Typography>
    };

    return (
        <Box ref={boxRef} sx={pageContainer}>
            <Box
                component='form'
                onSubmit={(event)=>handleSubmit(event)}
                sx={editItemContainer(pageWidth)}>
                <Grid container sx={profileElements} rowSpacing={3} columnSpacing={2}>
                    <Grid size={2}>
                        <IconButton onClick={handleEdit}>
                            <ArrowBackIcon sx={{fontSize: '1.8rem'}} />
                        </IconButton>
                    </Grid>
                    <Grid size={8} sx={editProfileHeader}>
                        <Typography variant='h3' sx={{color: colors.grey[100]}}>
                            Edit Phone Number
                        </Typography>
                    </Grid>

                    <Grid size={12}>
                        <Typography variant='h6' sx={fieldLabel}>
                            Phone Number
                        </Typography>
                        <style> {/*For styling inaccessible components*/}
                            {`
                                .react-tel-input .country:hover {
                                    background-color: ${colors.primary[600]} !important;
                                }

                                .react-tel-input .country.highlight {
                                    background-color: ${colors.primary[600]} !important;
                                }

                                .react-tel-input .form-control {
                                    border: 1px solid ${colors.grey[500]};
                                    borderRadius: 4px;
                                    transition: none;
                                    cursor: text !important;
                                }

                                .react-tel-input .form-control:hover {
                                    border-color: ${colors.grey[100]};
                                }

                                .react-tel-input .form-control.invalid-number:hover {
                                    border-color: #f44336;
                                }

                                .react-tel-input .form-control.invalid-number:focus {
                                    border-color: #f44336;
                                    box-shadow: 0 0 0 1px #f44336;
                                }

                                .react-tel-input .form-control:focus {
                                    border-color: ${colors.primary[500]};
                                    box-shadow: none;
                                }

                                .country-list .country .dial-code {
                                    color: ${colors.grey[400]} !important;
                                }

                                .react-tel-input .flag-dropdown{
                                    cursor: pointer;
                                }

                                .react-tel-input .selected-flag .arrow{
                                    border-top: 4px solid ${colors.grey[300]};                                
                                }

                                .react-tel-input .selected-flag:focus .arrow{
                                    border-left-width: 4px;
                                    border-right-width: 4px;
                                    border-top: 5px solid ${colors.blueAccent[500]};                                
                                }

                                .react-tel-input .selected-flag .arrow.up{  
                                    border-top: none;
                                    border-bottom: 4px solid ${colors.grey[300]};                             
                                }
                            `}
                        </style>
                        <PhoneInput
                            country={'ca'}
                            preferredCountries={['us', 'ca']}
                            countryCodeEditable={false}
                            value={newPhoneNumber}
                            specialLabel=''
                            onChange={(event)=>handleChange(event)}
                            onKeyDown={preventEnterSubmit}
                            isValid={!isInvalidInput}
                            inputStyle={{
                                ...editItemTextField,
                                ...fixEditItemTextField,
                                ...editItemTextField_input,
                                width: '100%',
                            }}
                            dropdownStyle={editPhoneDropDown}                           
                        >
                        </PhoneInput>
                        {errorMessageElements[errorMessageElement.type]}                 
                    </Grid>

                    <Grid
                        size={12}
                        sx={{
                            height: '6rem'
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
export default ProfileEditEmail;