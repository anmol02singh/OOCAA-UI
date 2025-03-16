import React, { MutableRefObject } from 'react';
import { useTheme } from '@mui/material';
import { tokens } from '../../theme.tsx';
import { useNavigate } from 'react-router-dom';
import 'react-phone-input-2/lib/material.css';
import {
    getPageWidth as profileGetPageWidth
} from '../Profile/ProfileUtilities.tsx';

import routes from '../../routes.js'

/*############### Constants ###############*/
//Window resizing thresholds
export const mdWindowWidth = 802;
export const smWindowWidth = 600;

/*############### Functions ###############*/
//Maintains current page width for changing UI elements with page width.
export const getPageWidth = (boxRef: MutableRefObject<HTMLDivElement | null>): number => {
    return profileGetPageWidth(boxRef);
}

/*############### Styling ###############*/
/*==========General Styling==========*/
export const useGeneralStyling = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const pageContainer: React.CSSProperties = {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '4rem 0',
        backgroundColor: colors.primary[500],
        minWidth: 0,
        minHeight: 0,
        overflowX: 'hidden',
        overflowY: 'auto',
    };
    
    const profileElements: React.CSSProperties = {
        width: '100%',
    };

    const adminSettingsContainer = (pageWidth: number): React.CSSProperties => ({
        width: '95%',
        minWidth: pageWidth >= mdWindowWidth ? '50rem' : '16rem',
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
        adminSettingsContainer,
        profilePictureContainer,
        imageContainer,
        profilePicture,
        button,
        button_hover,
        button_click,
        fieldLabel,
    };
};
