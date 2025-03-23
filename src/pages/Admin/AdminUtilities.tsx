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

    const adminElements: React.CSSProperties = {
        width: '100%',
    };

    const adminSettingsContainer = (pageWidth: number): React.CSSProperties => ({
        width: '95%',
        minWidth: '21rem',
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
        flexDirection: pageWidth >= mdWindowWidth ? 'row' : 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width:
            pageWidth >= mdWindowWidth ? '65vw'
                : pageWidth < mdWindowWidth && pageWidth >= smWindowWidth ? '55vw'
                    : '44vw',
        minWidth: '100%',
        gap: '2rem',
    });

    const accountsTableContainer = (pageWidth: number): React.CSSProperties => ({
        backgroundColor: colors.primary[400],
        color: colors.grey[100],
        marginTop: '1rem',
        width:
            pageWidth >= mdWindowWidth ? '65vw'
                : pageWidth < mdWindowWidth && pageWidth >= smWindowWidth ? '55vw'
                    : '44vw',
        minWidth: '100%',
        overflowX: "auto",
        display: "inline-block",
        border: 'none',
        fontSize: '14px'
    });

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

    return {
        pageContainer,
        adminElements,
        adminSettingsContainer,
        searchAndFilterContainer,
        accountsTableContainer,
        button,
        button_hover,
        button_click,
    };
};

export const useSearchStyling = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const searchContainer = (pageWidth: number): React.CSSProperties => ({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'center',
        width: pageWidth > mdWindowWidth ? '60%' : '100%',
        gap: '0.5rem',
    });

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

    return {
        searchContainer,
        searchField,
        searchField_outline,
        searchField_hover,
        searchField_focused,
    }
}

export const useFilterStyling = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const filterContainer = (pageWidth: number): React.CSSProperties => ({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'right',
        alignItems: 'center',
        width: pageWidth > mdWindowWidth ? '40%' : '100%',
        gap: '0.5rem',
    });

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
        borderRadius: '4px',
    };

    const fixFilterTextField: React.CSSProperties = {
        height: '100%',
    };

    const filterTextField_input: React.CSSProperties = {
        fontSize: '14px',
    };

    const filterTextField_outline: React.CSSProperties = {
        border: `1px solid ${colors.grey[500]}`,
        borderRadius: '4px',
    };

    const fieldLabel: React.CSSProperties = {
        textWrap: 'nowrap',
        color: colors.grey[100]
    };

    return {
        filterContainer,
        filterDropdown,
        filterTextField,
        fixFilterTextField,
        filterTextField_input,
        filterTextField_outline,
        fieldLabel,
    };
}

export const useEditItemStyling = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const {filterDropdown} = useFilterStyling();

    const adminDialogueContainer = (pageWidth: number): React.CSSProperties => ({
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
        maxWidth: '33rem',
        backgroundColor: colors.primary[400],
        borderRadius: '9px',
        backgroundImage: 'none',
        gap: '1rem',
        overflow: 'auto',
    });

    const editItemHeader: React.CSSProperties = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minWidth: '13.1rem',
    };

    const editItemContainer: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    };

    const editItemDropdown: React.CSSProperties = {
        ...filterDropdown,
        width: '23vw',
        minWidth: '11rem',
        maxWidth: '17rem',
        height: '2.5rem',
        fontSize: '16px',
    }

    const editItemMenu: React.CSSProperties = {
        width: '23vw',
        minWidth: '11rem !important',
        maxWidth: '17rem',
        backgroundColor: colors.primary[400],
    }

    const editItemButtonContainer: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
    };

    const editItemSaveButton: React.CSSProperties = {
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
        adminDialogueContainer,
        editItemHeader,
        editItemContainer,
        editItemDropdown,
        editItemMenu,
        editItemButtonContainer,
        editItemSaveButton,
    };
}
