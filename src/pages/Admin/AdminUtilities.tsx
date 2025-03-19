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
        minHeight: '75vh',
        padding:
            pageWidth >= mdWindowWidth ? '3rem'
                : pageWidth < mdWindowWidth && pageWidth >= smWindowWidth ? '2rem 3rem'
                    : '2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: colors.primary[400],
        borderRadius: '9px',
        overflow: 'hidden',
    });

    const searchAndFilterContainer = (pageWidth: number): React.CSSProperties => ({
        display: 'flex',
        flexDirection: pageWidth >= mdWindowWidth ? 'row': 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        minWidth: pageWidth >= mdWindowWidth ? '30rem' : '10rem',
        gap: '2rem',
    });

    const searchContainer: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'center',
        width: '60%',
        gap: '0.5rem',
    };

    const searchField: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: colors.primary[400],
        padding: 0,
        flex: '1',
        height: '2.5rem',
    };

    const searchField_outline: React.CSSProperties = {
        flex: '1',
        color: colors.grey[100],
        width: '100%',
        height: '100%',
        paddingLeft: '0.5rem',
        borderRadius: '4px',
        border: '1px solid ' + colors.grey[600],
    };

    const searchField_hover: React.CSSProperties = {
        border: '1px solid ' + colors.grey[100],
    };

    const searchField_focused: React.CSSProperties = {
        border: '1px solid ' + colors.primary[400],
    };

    const filterContainer: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'right',
        alignItems: 'center',
        width: '40%',
        minWidth: '23rem',
        gap: '0.5rem',
    };

    const filterDropdown: React.CSSProperties = {
        backgroundColor: colors.primary[500],
        color: colors.grey[100],
        height: '2.5rem',
        width: '9rem',
        borderRadius: '4px',
    }

    const filterTextField: React.CSSProperties = {
        width: '6rem',
        height: '2.5rem',
        cursor: 'pointer',
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
        width: '4em',
    };

    const button_hover: React.CSSProperties = {
        backgroundColor: colors.primary[600],
        color: colors.blueAccent[500],
    };

    const button_click: React.CSSProperties = {
        color: colors.blueAccent[500],
    };

    const fieldLabel: React.CSSProperties = {
        textWrap: 'nowrap',
        color: colors.grey[100]
    };

    return {
        pageContainer,
        adminSettingsContainer,
        searchAndFilterContainer,
        searchContainer,
        searchField,
        searchField_outline,
        searchField_hover,
        searchField_focused,
        filterContainer,
        filterDropdown,
        filterTextField,
        fixFilterTextField,
        filterTextField_input,
        filterTextField_outline,
        button,
        button_hover,
        button_click,
        fieldLabel,
    };
};
