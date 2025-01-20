import React, { useContext, useRef, useState, useEffect} from 'react';
import { TextField, useTheme } from '@mui/material';
import { ColorModeContext, themeSettings, tokens } from '../theme.tsx';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';


const Profile = () => {
    //Temporary Placeholders
    const fName = 'John';
    const lName = 'Smith';
    const oUsername = 'JSmith';
    const oRole = 'Admin';
    const oEmail = 'John.Smith@gmail.com';
    const oPhone = '+1 (416)-123-4567';

    const mdWindowWidth = 802;
    const smWindowWidth = 600;

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    
    const [states] = useState({
        display: 'display',
        edit: 'edit',
        editName: 'editName',
        editUsername: 'editUsername',
        editEmail: 'editEmail',
        editPhone: 'editPhone',
    })
    const [state, setState] = useState(states.display);
    
    const [disabled, setDisabled] = useState(true);
    const [errorMessageElement, setErrorMessageElement] = useState('none');

    const [invalidInput, setinvalidInput] = useState({
        firstName: false,
        lastName: false,
        username: false,
        email: false,
        phoneNumber: false,
    });

    const [formData, setFormData] = useState({
        firstName: fName,
        lastName: lName,
        username: oUsername,
        email: oEmail,
        phoneNumber: oPhone,
    });

    const boxRef = useRef<HTMLDivElement>(null);
    const [pageWidth, setPageWidth] = useState(0);

    const updatePageWidth = () => {
        if (boxRef.current) {
            const width = boxRef.current.getBoundingClientRect().width;
            setPageWidth(width);
            console.log('Width of the box:', width);
        }
    }


    useEffect(() => {
        updatePageWidth();

        window.addEventListener('resize', updatePageWidth);

        return () => {
            window.removeEventListener('resize', updatePageWidth);
        };
    }, []);
    

    const handleEdit = () => {
        setState(states.edit);
    };

    const handleCancel = () => {
        setState(states.display);
    };

    const handleEditItem = (nextState) => {
        if(!(nextState in states)
            || nextState===states.display
            || nextState===states.edit) return;
        
        setDisabled(true);
        setErrorMessageElement('none');
        switch(nextState){
            case states.editName:
                setFormData({...formData, firstName: fName, lastName: lName});
                setinvalidInput({...invalidInput, firstName: false, lastName: false});
                break;
            case states.editUsername:
                setFormData({...formData, username: oUsername});
                setinvalidInput({...invalidInput, username: false});
                break;
            case states.editEmail:
                setFormData({...formData, email: oEmail});
                setinvalidInput({...invalidInput, email: false});
                break;
            case states.editPhone:
                setFormData({...formData, phoneNumber: oPhone});
                setinvalidInput({...invalidInput, phoneNumber: false});
                break;            
        }       

        setState(nextState);
    }
    
    const handleChange = (event, currentState) => {
        if(!(currentState in states)
            || currentState===states.display
            || currentState===states.edit) return;
        
        if(disabled) setDisabled(false);

        let fieldName;
        let fieldValue;
        
        if(currentState !== states.editPhone){
            fieldName = event.target.name;
            fieldValue = event.target.value;
        } else {
            fieldName = 'phoneNumber';
            fieldValue = event;
        }

        if(!(fieldName === 'firstName' || fieldName === 'phoneNumber')) fieldValue = fieldValue.trim();
        
        switch(currentState){
            case states.editName:
                if(fieldValue.length>100) return
                break;
            case states.editUsername:
                if(fieldValue.length>40) return
                break;
            case states.editEmail:
                if(fieldValue.length>150) return
                break;           
        }

        setFormData({...formData, [fieldName]: fieldValue});
    }

    const preventEnterSubmit = (event) => {
        if(event.keyCode === 13) event.preventDefault();
    }

    let isInvalidInput = false;
    const handleSubmit = (event, currentState) => {
        event.preventDefault();
        
        if(!(currentState in states)) return;

        //These alerts are just placeholders
        //Add proper checks like no spaces or symbols on first and last name and so on.
        isInvalidInput = false;
        setErrorMessageElement('none');
        switch(currentState){
            case states.editName:
                if(!handleNameSubmit()) return;
                break;
            case states.editUsername:
                if(!handleUsernameSubmit()) return;
                break;
            case states.editEmail:
                if(!handleEmailSubmit()) return;
                break;
            case states.editPhone:
                if(!handlePhoneSubmit()) return;
                break;            
        }

        setState(states.edit);
    };

    // const isLettersAndWhitespace = /^[a-zA-Z\s]+$/;
    const containsMultipleSpaces = /\s+/g;
    const isEmailFormat = /(@)(.+)$/;

    const handleNameSubmit = () => {        
        let invalidFirstName = false;
        let invalidLastName = false;
        const processedFirstName = formData.firstName.replace(containsMultipleSpaces, ' ').trim()
        const processedLastName = formData.lastName.replace(containsMultipleSpaces, ' ').trim()

        if(processedFirstName === fName && processedLastName === lName){
            invalidFirstName = true;
            invalidLastName = true;
            setErrorMessageElement('unchangedName');
        }

        if(!(invalidFirstName || invalidLastName)){
            //Replace with object update logic
            alert(`Submitted: ${processedFirstName} ${processedLastName}`);
            
            setFormData({...formData, firstName: processedFirstName, lastName: processedLastName})
        }

        setinvalidInput({...invalidInput, firstName: invalidFirstName, lastName: invalidLastName});
        
        return !(invalidFirstName || invalidLastName)
    };

    const handleUsernameSubmit = () => {     
        if(formData.username === oUsername){
            isInvalidInput = true;
            setErrorMessageElement('unchangedUsername');
        }

        if(!isInvalidInput){
            //Replace with object update logic        
            alert(`Submitted: ${formData.username}`);
        }

        setinvalidInput({...invalidInput, username: isInvalidInput});
        
        return !isInvalidInput;
    };

    const handleEmailSubmit = () => {   
        
        if(formData.email === oEmail){
            isInvalidInput = true;
            setErrorMessageElement('unchangedEmail');
        }
        if(!formData.email.match(isEmailFormat)){
            isInvalidInput = true;
            setErrorMessageElement('invalidEmailFormat');
        }

        if(!isInvalidInput){
            //Replace with object update logic        
            alert(`Submitted: ${formData.email}`);
        }

        setinvalidInput({...invalidInput, email: isInvalidInput});

        return !isInvalidInput;
    };

    const handlePhoneSubmit = () => {        
        
        if(formData.phoneNumber === oPhone.replace(/\D/g, '')){
            isInvalidInput = true;
            setErrorMessageElement('unchangedPhone');
        }

        if(!isInvalidInput){
            //Replace with object update logic 
            alert(`Submitted: ${formData.phoneNumber}`);
        }

        setinvalidInput({...invalidInput, phoneNumber: isInvalidInput});

        return !isInvalidInput;
    };

    const handleinputCancel = (event, data) => {
        const textField = event.target.closest('div').querySelector('input');
    
        if (textField) {
            setFormData({...formData, [textField.name]: data});
        }
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
        padding:
            pageWidth >= mdWindowWidth ? '3rem'
            : pageWidth < mdWindowWidth && pageWidth >= smWindowWidth ? '2rem 3rem'
            : '2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary[400],
        borderRadius: '9px', 
        overflow: 'hidden', 
    };

    const profilePictureContainer: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };
    
    const imageContainer: React.CSSProperties = {
        cursor: 'pointer',
        borderRadius: '50%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const profilePicture: React.CSSProperties = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    };

    const button: React.CSSProperties = {
        padding: '0.8rem',
        cursor: 'pointer',
        borderRadius: '6px',
        color: colors.grey[100],
        backgroundColor: colors.primary[500],
        textTransform: 'none',
        fontSize: '1rem',
        margin: '0.5rem',
    };

    const button_hover: React.CSSProperties = {
        backgroundColor: colors.primary[600],
        color: colors.blueAccent[500],
    };

    const button_click: React.CSSProperties = {
        color: colors.blueAccent[500],
    };

    const fieldLabel: React.CSSProperties = {
        margin: '0.3rem 0.1rem',
        color: colors.grey[300]
    };
    
    /*==========Regular Profile Display==========*/    
    const regProfileContainer: React.CSSProperties = {
        width: '90%',
        maxWidth: '65rem',
        minWidth: pageWidth >= mdWindowWidth ? '50rem' : '16rem',
        display: 'flex',
        justifyContent: pageWidth >= mdWindowWidth ? 'center' : 'flex-start',
        alignItems: pageWidth >= mdWindowWidth ? 'flex-start' : 'center',
        padding: '4rem 0',
        gap: '1rem',
        flexDirection: pageWidth >= mdWindowWidth ? 'row' : 'column',
    };
    
    const regProfileInfoContainer: React.CSSProperties = {
        ...profileItemContainer,
        width: pageWidth >= mdWindowWidth ? '65%' : '95%',
        minWidth: '21rem',
    };

    const regProfileCardContainer: React.CSSProperties = {
        ...profileItemContainer,
        width: pageWidth >= mdWindowWidth ? '35%' : '75%',
        minWidth: '20rem',
    };

    const regImageContainer: React.CSSProperties = {
        ...imageContainer,
        maxWidth: '10rem',
        maxHeight: '10rem',
        width: '15vw',
        height: '15vw',
        minWidth: pageWidth >= mdWindowWidth ? '10rem' : '7rem',
        minHeight: pageWidth >= mdWindowWidth ? '10rem' : '7rem',
    };

    const regProfileCardText: React.CSSProperties = {
        color: colors.grey[100],
        textAlign: 'center',
        width: '100%',
        minWidth: 0,
        minHeight: 0,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    };   

    const regProfileInfoHeader: React.CSSProperties = {
        color: colors.blueAccent[400],
    };

    const regProfileFieldValue: React.CSSProperties = {
        margin: '0.3rem 0.1rem',
        padding: '0 0.2rem 0.3rem',
        color: colors.grey[100],
        borderBottom: `solid 1px ${colors.grey[300]}`,
        width: '100%',
        minWidth: 0,
        minHeight: 0,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    };

    const regButtonContainer: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'flex-end',
    };

    const regProfileButton: React.CSSProperties = {
        ...button,
        width: '7rem',
    };

    /*==========Edit Profile Display==========*/
    const editProfileContainer: React.CSSProperties = {
        ...profileItemContainer,
        width: '90%',
        maxWidth: '50rem',
        minWidth: '21rem',
        overflow: 'hidden',
        margin: '4rem 0',
    };

    const editProfileHeader: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '13.1rem',
    };

    const profileFieldButton: React.CSSProperties = {
        height: '3.5rem',
        cursor: 'pointer',
        borderRadius: '6px',
        color: colors.grey[100],
        backgroundColor: colors.primary[500],
        textTransform: 'none',
        justifyContent: 'flex-start',
        padding: '0 1rem',
        overflow: 'hidden',
    };
    
    const profileFieldButtonText : React.CSSProperties = {
        fontSize: '16px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    };

    const editImageContainer: React.CSSProperties = {
        ...imageContainer,
        width: '7rem',
        height: '7rem',
    };

    /*==========General Edit Item Displays==========*/
    const editItemContainer: React.CSSProperties = {
        ...profileItemContainer,
        width: '90%',
        maxWidth: '40rem',
        minWidth: '21rem',
        overflow: 'hidden',
        margin: '5rem 0'
    };
    
    const editItemTextField: React.CSSProperties = {
        height: '3.5rem',
        cursor: 'pointer',
        borderRadius: '4px',
        color: colors.grey[100],
        backgroundColor: colors.primary[500],
    };

    const fixEditItemTextField: React.CSSProperties = {
        height: '100%',
    };

    const editItemTextField_input: React.CSSProperties = {
        fontSize: '16px',
    };

    const editItemTextField_outline: React.CSSProperties = {
        border: `1px solid ${colors.grey[500]}`,
        borderRadius: '4px',
    };

    const editItemButtonContainer: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
    };

    const errorMessageStyle: React.CSSProperties = {
        margin: '0.3rem 0.1rem',
        color: '#f44336',
    };

    const editItemSaveButton: React.CSSProperties = {
        ...button,
        width: '6rem',
    };

    /*==========Edit Phone Number Display==========*/
    const editPhoneDropDown: React.CSSProperties = {
        color: colors.grey[100],
        backgroundColor: colors.primary[500],
        borderRadius: '6px',
        width: '20rem',
    }; 


    const errorMessageElements = {
        none: undefined
        , unchangedName:
            <Grid size={12}>
                <Typography variant='h6' sx={errorMessageStyle}>
                    *Please enter a new first name or last name.
                </Typography>
            </Grid>
        , unchangedUsername:
            <Grid size={12}>
                <Typography variant='h6' sx={errorMessageStyle}>
                    *Please enter a new username.
                </Typography>
            </Grid>
        , unchangedEmail:
            <Grid size={12}>   
                <Typography variant='h6' sx={errorMessageStyle}>
                    *Please enter a new email address.
                </Typography>
            </Grid>
        , invalidEmailFormat:
            <Grid size={12}>
                <Typography variant='h6' sx={errorMessageStyle}>
                    *Please enter a valid email address.
                </Typography>
            </Grid>
        , unchangedPhone:
            <Grid size={12}>
                <Typography variant='h6' sx={errorMessageStyle}>
                    *Please enter a new phone number.
                </Typography>
            </Grid>
        , invalidPhoneFormat:
            <Grid size={12}>
                <Typography variant='h6' sx={errorMessageStyle}>
                    *Please enter a valid phone number.
                </Typography>
            </Grid>
    };

    const regProfileInfoElements = (
        <Box sx={regProfileInfoContainer}>
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
                                {`${fName} ${lName}`}
                            </Typography>
                        </Grid> 
                        
                        <Grid size={12}>
                            <Typography variant='h6' sx={fieldLabel}>
                                Username
                            </Typography>
                            <Typography variant='h5' sx={regProfileFieldValue}>
                                {oUsername}
                            </Typography>
                        </Grid>                   

                        <Grid size={12}>
                            <Typography variant='h6' sx={fieldLabel}>
                                Email
                            </Typography>
                            <Typography variant='h5' sx={regProfileFieldValue}>
                                {oEmail}
                            </Typography>
                        </Grid>

                        <Grid size={12}>
                            <Typography variant='h6' sx={fieldLabel}>
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
    );

    const contentMap = {
        display:
            <Box sx={regProfileContainer}>
                {pageWidth >= mdWindowWidth ? regProfileInfoElements : undefined}
                <Box sx={regProfileCardContainer}>
                    <Grid container sx={profileElements} spacing={1}>
                        <Grid size={12} sx={profilePictureContainer}>
                            <Box sx={regImageContainer}>
                                <img
                                    alt='profile-user'                            
                                    src = 'zuc.png'   
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
                                {`${fName} ${lName}`}
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
                {pageWidth < mdWindowWidth ? regProfileInfoElements : undefined}
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
                    
                    <Grid size={12} sx={profilePictureContainer}>
                            <Box sx={editImageContainer}>
                                <img
                                    alt='profile-user'                            
                                    src = 'zuc.png'   
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
                            onClick={()=>handleEditItem(states.editName)}
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
                                {`${fName} ${lName}`}
                            </Typography>
                        </Button>                            
                    </Grid>

                    <Grid size={12}>
                        <Typography variant='h6' sx={fieldLabel}>
                            Username
                        </Typography>
                        <Button
                            fullWidth
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
                                {oUsername}
                            </Typography>
                        </Button>
                    </Grid>                  

                    <Grid size={12}>
                        <Typography variant='h6' sx={fieldLabel}>
                            Email
                        </Typography>
                        <Button
                            fullWidth
                            onClick={()=>handleEditItem(states.editEmail)}
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
                                {oEmail}
                            </Typography>
                        </Button>
                    </Grid> 

                    <Grid size={12}>
                        <Typography variant='h6' sx={fieldLabel}>
                            Phone Number
                        </Typography>
                        <Button
                            fullWidth
                            onClick={()=>handleEditItem(states.editPhone)}
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
                                {oPhone}
                            </Typography>
                        </Button>
                    </Grid> 
                </Grid>
            </Box>
        , editName:            
            <Box component='form' onSubmit={(event)=>handleSubmit(event, state)} sx={editItemContainer}>
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
                            First Name
                        </Typography>
                        <TextField
                            fullWidth
                            name='firstName'
                            value={formData.firstName}
                            autoComplete='off'
                            error={invalidInput.firstName}
                            onChange={(event)=>handleChange(event, state)}
                            onKeyDown={preventEnterSubmit}
                            slotProps={{
                                input:{
                                    endAdornment: formData.firstName!==fName ? (
                                        <IconButton size='small' onClick={(event) => handleinputCancel(event, fName)}>
                                            <ClearIcon />
                                        </IconButton>
                                    ) : undefined
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
                    </Grid>

                    <Grid size={12}>
                        <Typography variant='h6' sx={fieldLabel}>
                            Last Name
                        </Typography>
                        <TextField
                            fullWidth
                            name='lastName'
                            value={formData.lastName}
                            autoComplete='off'
                            error={invalidInput.lastName}
                            onChange={(event)=>handleChange(event, state)}
                            onKeyDown={preventEnterSubmit}
                            slotProps={{
                                input:{
                                    endAdornment: formData.lastName!==lName ? (
                                        <IconButton size='small' onClick={(event) => handleinputCancel(event, lName)}>
                                            <ClearIcon />
                                        </IconButton>
                                    ) : undefined
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
                    </Grid>      

                    {errorMessageElements[errorMessageElement]}             

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
        , editUsername:
            <Box component='form' onSubmit={(event)=>handleSubmit(event, state)} sx={editItemContainer}>
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

                    <Grid size={12}>
                        <Typography variant='h6' sx={fieldLabel}>
                            Username
                        </Typography>
                        <TextField
                            fullWidth
                            name='username'
                            value={formData.username}
                            autoComplete='off'
                            error={invalidInput.username}
                            onChange={(event)=>handleChange(event, state)}
                            onKeyDown={preventEnterSubmit}
                            slotProps={{
                                input:{
                                    endAdornment: formData.username!==oUsername ? (
                                        <IconButton size='small' onClick={(event) => handleinputCancel(event, oUsername)}>
                                            <ClearIcon />
                                        </IconButton>
                                    ) : undefined
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
                    </Grid>   

                    {errorMessageElements[errorMessageElement]}                               

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
        , editEmail:
            <Box component='form' onSubmit={(event)=>handleSubmit(event, state)} sx={editItemContainer}>
                <Grid container sx={profileElements} rowSpacing={3} columnSpacing={2}>
                    <Grid size={2}>
                        <IconButton onClick={handleEdit}>
                            <ArrowBackIcon sx={{fontSize: '1.8rem'}} />
                        </IconButton>
                    </Grid>
                    <Grid size={8} sx={editProfileHeader}>
                        <Typography variant='h3' sx={{color: colors.grey[100]}}>
                            Edit Email
                        </Typography>
                    </Grid>

                    <Grid size={12}>
                        <Typography variant='h6' sx={fieldLabel}>
                            Email
                        </Typography>
                        <TextField
                            fullWidth
                            name='email'
                            value={formData.email}
                            autoComplete='off'
                            error={invalidInput.email}
                            onChange={(event)=>handleChange(event, state)}
                            onKeyDown={preventEnterSubmit}
                            slotProps={{
                                input:{
                                    endAdornment: formData.email!==oEmail ? (
                                        <IconButton size='small' onClick={(event) => handleinputCancel(event, oEmail)}>
                                            <ClearIcon />
                                        </IconButton>
                                    ) : undefined
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
                    </Grid>       

                    {errorMessageElements[errorMessageElement]}                          

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
        , editPhone:
            <Box
                component='form'
                onSubmit={(event)=>handleSubmit(event, state)}
                sx={editItemContainer}>
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
                            value={formData.phoneNumber}
                            specialLabel=''
                            onChange={(event)=>handleChange(event, state)}
                            onKeyDown={preventEnterSubmit}
                            isValid={!invalidInput.phoneNumber}
                            inputStyle={{
                                ...editItemTextField,
                                ...fixEditItemTextField,
                                ...editItemTextField_input,
                                width: '100%',
                            }}
                            dropdownStyle={editPhoneDropDown}
                            inputProps={{
                                // endAdornment: formData.phoneNumber!==oPhone ? (
                                //     <IconButton size='small' onClick={(event) => handleinputCancel(event, oPhone)}>
                                //         <ClearIcon />
                                //     </IconButton>
                                // ) : undefined
                            }}                            
                        >
                        </PhoneInput>                   
                    </Grid>

                    <Grid
                        size={12}
                        sx={{
                            height: '6rem'
                        }}
                    >
                        {/*Spacing for dropdown*/}
                    </Grid>

                    {errorMessageElements[errorMessageElement]} 

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
        ,
    }

    return (
        <Box ref={boxRef} sx={pageContainer}>
            {contentMap[state]}           
        </Box>
    );
}
export default Profile;