import React, { MutableRefObject } from 'react';
import { useTheme } from '@mui/material';
import { tokens } from '../../theme.tsx';
import 'react-phone-input-2/lib/material.css';
import {
    getPageWidth as profileGetPageWidth
} from '../Profile/ProfileUtilities.tsx';

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
/*==========Styling==========*/
export const useStyling = () => {
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

    const searchAndFilterContainer = (pageWidth: number): React.CSSProperties => ({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        minWidth: pageWidth >= mdWindowWidth ? '30rem' : '10rem',
        gap: '2rem',
        border: '1px solid red',
    });

    const searchContainer: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'center',
        width: '40%',
        gap: '0.5rem',
        border: '1px solid red',
    };

    const searchField: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: colors.primary[400],
        borderRadius: '4px',
        padding: '0 10px',
        height: '2.5rem',
    };

    const filterContainer: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'right',
        alignItems: 'center',
        width: '60%',
        gap: '0.5rem',
        border: '1px solid red',
    };

    const filterTextField: React.CSSProperties = {
        height: '2.5rem',
        cursor: 'pointer',
        borderRadius: '4px',
        color: colors.grey[100],
        backgroundColor: colors.primary[500],
        padding: '0',
    };

    const fixFilterTextField: React.CSSProperties = {
        height: '100%',
    };

    const filterTextField_input: React.CSSProperties = {
        fontSize: '16px',
    };

    const filterTextField_outline: React.CSSProperties = {
        border: `1px solid ${colors.grey[500]}`,
        borderRadius: '4px',
    };

    const button: React.CSSProperties = {
        display: 'flex',
        flex: 'none',
        padding: '0.5rem',
        cursor: 'pointer',
        borderRadius: '6px',
        color: colors.grey[100],
        backgroundColor: colors.primary[500],
        textTransform: 'none',
        fontSize: '14px',
        margin: '0.5rem',
        width: '7rem',
    };

    const button_hover: React.CSSProperties = {
        backgroundColor: colors.primary[600],
        color: colors.blueAccent[500],
    };

    const button_click: React.CSSProperties = {
        color: colors.blueAccent[500],
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

    const fieldLabel: React.CSSProperties = {
        margin: '0.1rem 0',
        color: colors.grey[300]
    };

    return {
        pageContainer,
        adminSettingsContainer,
        searchAndFilterContainer,
        searchContainer,
        searchField,
        filterContainer,
        filterTextField,
        fixFilterTextField,
        filterTextField_input,
        filterTextField_outline,
        button,
        button_hover,
        button_click,

        imageContainer,
        profilePicture,
        fieldLabel,
    };
};
