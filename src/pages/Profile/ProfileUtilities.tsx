import React, { MutableRefObject } from 'react';
import { useTheme } from '@mui/material';
import { tokens } from '../../theme.tsx';
import { useNavigate } from 'react-router-dom';
import 'react-phone-input-2/lib/material.css';
import { parsePhoneNumberFromString, PhoneNumber } from "libphonenumber-js";

import routes from '../../routes.js'

/*############### Constants ###############*/
//Window resizing thresholds
export const mdWindowWidth = 802;
export const smWindowWidth = 600;

//Regex
export const containsExtraSpaces = /\s+/g;
//eslint-disable-next-line no-useless-escape
export const isEmailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/*############### Functions ###############*/
//Maintains current page width for changing UI elements with page width.
export const getPageWidth = (boxRef: MutableRefObject<HTMLDivElement | null>): number => {
    if (boxRef.current) {
        const width = boxRef.current.getBoundingClientRect().width;
        return width;
        //console.log('Width of the box:', width);
    }

    return -1
}

//Reformats phone numbers.
export const formatPhoneNumber = (number: string): {phoneNumber: string, success: boolean} => {
    if(!number) {
        return {phoneNumber: "", success: false};
    }

    const phoneNumber: PhoneNumber | undefined = parsePhoneNumberFromString(`+${number.replace(/\D/g, '')}`);
    
    if(!phoneNumber || phoneNumber && `${phoneNumber}` === ""){
        return {phoneNumber: "", success: false};
    }

    if(!(phoneNumber && phoneNumber.isValid())){
        return {phoneNumber: "INVALID", success: false};
    }

    return {phoneNumber: phoneNumber.formatInternational(), success: true};
};

export const preventEnterSubmit = (event) => {
    if(event.keyCode === 13) event.preventDefault();
}

export const useNavigation = () => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(routes.editProfile);
    };

    const handleCancel = () => {
        navigate(routes.profile);
    };

    return { handleEdit, handleCancel };
};

/*############### Styling ###############*/
/*==========General Styling==========*/
export const useGeneralStyling = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const pageContainer: React.CSSProperties = {
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: colors.primary[500],
        minWidth: 0,
        minHeight: 0,
        overflowX: 'hidden',
        overflowY: 'auto',
    };
    
    const profileElements: React.CSSProperties = {
        width: '100%',
    };

    const profileItemContainer = (pageWidth: number): React.CSSProperties => ({
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
    });

    const profileDialogueContainer = (pageWidth: number): React.CSSProperties => ({
        ...profileItemContainer(pageWidth),
        justifyContent: 'flex-start',
        width: '60vw',
        minWidth: '25rem',
        maxWidth: '35rem',
        backgroundImage: 'none',
        gap: '1rem',
        overflow: 'auto',
    });
    
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
        margin: '0.1rem 0',
        color: colors.grey[300]
    };

    return {
        pageContainer,
        profileElements,
        profileItemContainer,
        profileDialogueContainer,
        profilePictureContainer,
        imageContainer,
        profilePicture,
        button,
        button_hover,
        button_click,
        fieldLabel,
    };
};

/*==========Regular Profile Display==========*/
export const useProfileDisplayStyling = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const {
        profileItemContainer,
        imageContainer,
        button,
    } = useGeneralStyling();
    
    const regProfileContainer = (pageWidth: number): React.CSSProperties => ({
        width: '90%',
        maxWidth: '65rem',
        minWidth: pageWidth >= mdWindowWidth ? '50rem' : '16rem',
        display: 'flex',
        justifyContent: pageWidth >= mdWindowWidth ? 'center' : 'flex-start',
        alignItems: pageWidth >= mdWindowWidth ? 'flex-start' : 'center',
        padding: '4rem 0',
        gap: '1rem',
        flexDirection: pageWidth >= mdWindowWidth ? 'row' : 'column',
    });

    const regProfileInfoContainer = (pageWidth: number): React.CSSProperties => ({
        ...profileItemContainer(pageWidth),
        width: pageWidth >= mdWindowWidth ? '58%' : '95%',
        minWidth: '21rem',
        minHeight: '33rem'
    });

    const regProfileCardContainer = (pageWidth: number): React.CSSProperties => ({
        ...profileItemContainer(pageWidth),
        width: pageWidth >= mdWindowWidth ? '42%' : '75%',
        minWidth: '20rem',
        minHeight: '22rem'
    });

    const regImageContainer = (pageWidth: number): React.CSSProperties => ({
        ...imageContainer,
        maxWidth: '10rem',
        maxHeight: '10rem',
        width: '15vw',
        height: '15vw',
        minWidth: pageWidth >= mdWindowWidth ? '10rem' : '7rem',
        minHeight: pageWidth >= mdWindowWidth ? '10rem' : '7rem',
    });

    const regProfileInfoSubheader = (pageWidth: number): React.CSSProperties => ({
        textAlign: 'center',        
        width: '100%',
        minWidth: pageWidth >= mdWindowWidth ? undefined : '16rem',
        maxWidth: pageWidth >= mdWindowWidth ? '23vw' : '42vw',
        minHeight: 0,
        overflow: 'auto',
        textWrap: 'wrap',
        wordWrap: 'break-word'
    });
    
    const regProfileCardText = (pageWidth: number): React.CSSProperties => ({
        color: colors.grey[100],
        textAlign: 'center',
        minWidth: pageWidth >= mdWindowWidth ? undefined : '16rem',
        maxWidth: pageWidth >= mdWindowWidth ? '23vw' : '39vw',
        minHeight: 0,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    });   

    const regProfileInfoHeader: React.CSSProperties = {
        color: colors.blueAccent[400],
    };

    const regProfileFieldContainer: React.CSSProperties = {
        padding: '0.1rem',
        borderBottom: `solid 1px ${colors.grey[300]}`,
    }

    const regProfileFieldValue: React.CSSProperties = {
        padding: '0 0 0 0.2rem',
        textAlign: 'left',
        color: colors.grey[100],
        minWidth: '14rem',
        maxWidth: '32vw',
        minHeight: '21px',
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
        width: '7.5rem',
    };

    return {
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
    };
};

/*==========Edit Profile Display==========*/
export const useEditProfileStyling = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const {
        profileItemContainer,
        imageContainer,
        button,
    } = useGeneralStyling();
    
    const editProfileContainer = (pageWidth: number): React.CSSProperties => ({
        ...profileItemContainer(pageWidth),
        width: '90%',
        maxWidth: '50rem',
        minWidth: '21rem',
        minHeight: '37rem',
        overflow: 'hidden',
        margin: '4rem 0',
    });

    const editProfileHeader: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '13.1rem',
    };

    const profileFieldButton: React.CSSProperties = {
        height: '3.5rem',
        width: '100%',
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
        minWidth: '15rem',
        maxWidth: '39vw',
        minHeight: 0,
        textAlign: 'left',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    };

    const editImageContainer: React.CSSProperties = {
        ...imageContainer,
        width: '7rem',
        height: '7rem',
        position: "relative",
    };

    const profileImageEditor = {
        width: 200,
        height: 200,
        border: 50,
        backgroundColor: colors.primary[500],
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

    const uploadImagebutton: React.CSSProperties = {
        ...button,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 'inherit',
        fontSize: '1.25rem',
        width: '100%',
        height: '100%',
        margin: '0',
        
    };

    const regDeleteButton: React.CSSProperties = {
        ...button,
        width: '9rem',
        background: '#ff0000',
    };

    const regDeleteButtonHover: React.CSSProperties = {
        backgroundColor: '#ff3f3f',
    };

    return {
        editProfileContainer,
        editProfileHeader,
        profileFieldButton,
        profileFieldButtonText,
        editImageContainer,
        profileImageEditor,
        profilePictureContainer,
        uploadImagebutton,
        regDeleteButton,
        regDeleteButtonHover,
    };
};

/*==========General Edit Item Displays==========*/
export const useEditItemStyling = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const {
        profileItemContainer,
        button,
    } = useGeneralStyling();
    
    const editItemContainer = (pageWidth: number): React.CSSProperties => ({
        ...profileItemContainer(pageWidth),
        width: '90%',
        maxWidth: '40rem',
        minWidth: '21rem',
        minHeight: '26rem',
        overflow: 'hidden',
        margin: '5rem 0'
    });

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
        gap: '0.2rem',
        color: '#f44336',
        display: 'flex',
        alignItems: 'center',
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

    return {
        editItemContainer,
        editItemTextField,
        fixEditItemTextField,
        editItemTextField_input,
        editItemTextField_outline,
        editItemButtonContainer,
        errorMessageStyle,
        editItemSaveButton,
        editPhoneDropDown,
    };
};

/*==========Role Change Request Display==========*/
export const useRoleChangeStyling = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const requestDialogContainer = (pageWidth: number): React.CSSProperties => ({
        padding:
            pageWidth >= mdWindowWidth ? '3rem'
                : pageWidth < mdWindowWidth && pageWidth >= smWindowWidth ? '2rem 3rem'
                    : '2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '50vw',
        minWidth: '22rem',
        maxWidth: '30rem',
        backgroundColor: colors.primary[400],
        borderRadius: '9px',
        backgroundImage: 'none',
        gap: '1rem',
        overflow: 'auto',
    });

    const requestHeader: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        minWidth: '13.1rem',
    };

    const requestContainer: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        textAlign: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    };

    const requestButtonContainer: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
    };

    const requestButton: React.CSSProperties = {
        padding: '0.8rem',
        cursor: 'pointer',
        borderRadius: '6px',
        color: colors.grey[100],
        backgroundColor: colors.primary[500],
        textTransform: 'none',
        fontSize: '1rem',
        margin: '0.5rem',
        width: '6rem',
    };

    return {
        requestDialogContainer,
        requestHeader,
        requestContainer,
        requestButtonContainer,
        requestButton,
    };
}
