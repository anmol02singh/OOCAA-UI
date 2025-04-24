import React, { MutableRefObject } from 'react';
import { useTheme } from '@mui/material';
import { tokens } from '../../theme.tsx';
import 'react-phone-input-2/lib/material.css';
import {
    getPageWidth as profileGetPageWidth
} from '../Profile/ProfileUtilities.tsx';

/*############### Admin-Specific types ###############*/
export type AccountStats = {
    totalAccounts: { label: 'Total Accounts', value: number },
    op1AccountAmount: { label: 'Level 1 Operators', value: number },
    op2AccountAmount: { label: 'Level 2 Operators', value: number },
    adminAccountAmount: { label: 'Administrators', value: number },
}

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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '95%',
        minWidth: '21rem',
        margin: '2rem 0',
        padding:
            pageWidth >= mdWindowWidth ? '3rem'
                : pageWidth < mdWindowWidth && pageWidth >= smWindowWidth ? '2rem 3rem'
                    : '2rem',
        gap: '1rem',
        backgroundColor: colors.primary[400],
        borderRadius: '9px',
    });

    const titleContainer = (pageWidth: number): React.CSSProperties => ({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: pageWidth >= smWindowWidth ? 'flex-start' : 'center',
        textAlign: pageWidth >= smWindowWidth ? 'left' : 'center',
        alignItems: 'center',
        width: '100%',
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
        marginTop: '2rem',
        gap: '2rem',
    });

    const accountsDataGridContainer: React.CSSProperties = {
        width: '100%',
        display: 'flex',
        flexGrow: '1',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        minWidth: 0,
    }

    const accountsTableContainer = (pageWidth: number): React.CSSProperties => ({
        backgroundColor: colors.primary[400],
        color: colors.grey[100],
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

    const button = (pageWidth: number): React.CSSProperties => ({
        display: 'flex',
        flex: 'none',
        padding: '0.5rem',
        cursor: 'pointer',
        borderRadius: '6px',
        color: colors.grey[100],
        backgroundColor: colors.primary[500],
        textTransform: 'none',
        fontSize: '14px',
        width: pageWidth >= smWindowWidth ? '4rem' : '3rem',
        minWidth: 0,
    });

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
        titleContainer,
        searchAndFilterContainer,
        accountsDataGridContainer,
        accountsTableContainer,
        button,
        button_hover,
        button_click,
    };
};

export const useAccountStatsStyling = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const statsContainer = (pageWidth: number): React.CSSProperties => ({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: pageWidth >= mdWindowWidth ? 'center' : 'flex-start',
        alignItems: 'center',
        width:
            pageWidth >= mdWindowWidth ? '65vw'
                : pageWidth < mdWindowWidth && pageWidth >= smWindowWidth ? '55vw'
                    : '44vw',
        minWidth: '100%',
        gap: pageWidth >= mdWindowWidth ? '1rem' : '0.5rem',
        overflow: 'auto',
    });

    const statContainer = (pageWidth: number): React.CSSProperties => ({
        padding:
            pageWidth >= mdWindowWidth ? '1rem' : '0.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        minWidth: 'max-content',
        maxWidth: '23rem',
        backgroundColor: colors.primary[500],
        borderRadius: '9px',
        gap: '0.1rem',
        overflow: 'auto',
    });

    return {
        statsContainer,
        statContainer,
    }
}

export const useSearchStyling = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const searchAndSelectContainer = (pageWidth: number): React.CSSProperties => ({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        gap: pageWidth >= smWindowWidth ? 0 : '0.5rem',
    });

    const searchContainer: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'center',
        width: '100%',
        gap: '0.5rem',
    }

    const filterDropdown: React.CSSProperties = {
        backgroundColor: colors.primary[500],
        color: colors.grey[100],
        height: '2.5rem',
        width: '9rem',
        borderRadius: '4px',
    }

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
        searchAndSelectContainer,
        searchContainer,
        filterDropdown,
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
        justifyContent: pageWidth >= smWindowWidth ? 'flex-end' : 'center',
        alignItems: 'center',
        gap: '0.5rem',
    });

    const filterPopperContentContainer: React.CSSProperties = {
        display: 'flex',
        flex: '0 1 0',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flext-start',
        padding: '0.5rem',
        gap: '0.25rem',
        borderRadius: '4px',
        backgroundColor: colors.primary[350],
        boxShadow: `
            0px 5px 5px -3px rgba(0,0,0,0.2),
            0px 8px 10px 1px rgba(0,0,0,0.14),
            0px 3px 14px 2px rgba(0,0,0,0.12)`,
    }

    const reqFilterPopperContentSubcontainer: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
    }

    const reqFilterSectionContainer: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: '0.5rem',
    }

    const reqFilterInputContainer: React.CSSProperties = {
        display: 'flex',
        flex: '0 1 0',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '0.5rem',
    }

    const reqFilterButtonContainer: React.CSSProperties = {
        display: 'flex',
        flex: '0 1 0',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        gap: '0.25rem',
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
        filterPopperContentContainer,
        reqFilterPopperContentSubcontainer,
        reqFilterSectionContainer,
        reqFilterInputContainer,
        reqFilterButtonContainer,
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

    const { filterDropdown } = useSearchStyling();

    const adminEditItemDialogueContainer = (pageWidth: number): React.CSSProperties => ({
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

    const editItemDropdown = (newRole: number): React.CSSProperties => ({
        ...filterDropdown,
        width: '23vw',
        minWidth: '11rem',
        maxWidth: '17rem',
        height: '2.5rem',
        fontSize: '16px',
        color: newRole >= 0 ? colors.grey[100] : colors.grey[500],
    });

    const editItemMenu: React.CSSProperties = {
        width: '23vw',
        minWidth: '11rem !important',
        maxWidth: '17rem',
        backgroundColor: colors.primary[400],
    };

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
        adminEditItemDialogueContainer,
        editItemHeader,
        editItemContainer,
        editItemDropdown,
        editItemMenu,
        editItemButtonContainer,
        editItemSaveButton,
    };
}

export const useDeleteItemStyling = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const adminDeleteItemDialogueContainer = (pageWidth: number): React.CSSProperties => ({
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
        maxWidth: '29rem',
        backgroundColor: colors.primary[400],
        borderRadius: '9px',
        backgroundImage: 'none',
        gap: '1rem',
        overflow: 'auto',
    });

    const deleteItemHeader: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '13.1rem',
    };

    const deleteItemContainer: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        textAlign: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    };

    const deleteItemButtonContainer: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
    };

    const deleteItemConfirmButton: React.CSSProperties = {
        padding: '0.8rem',
        cursor: 'pointer',
        borderRadius: '6px',
        color: colors.grey[100],
        backgroundColor: colors.primary[500],
        textTransform: 'none',
        fontSize: '1rem',
        margin: '0.5rem',
        width: '10rem',
    };

    const cancelDeleteButton: React.CSSProperties = {
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
        adminDeleteItemDialogueContainer,
        deleteItemHeader,
        deleteItemContainer,
        deleteItemButtonContainer,
        deleteItemConfirmButton,
        cancelDeleteButton,
    };
}

export const useRoleChangeRequestsStyling = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    const acceptButton: React.CSSProperties = {
        padding: '0.3rem',
        cursor: 'pointer',
        borderRadius: '6px',
        color: colors.grey[100],
        backgroundColor: colors.primary[500],
        textTransform: 'none',
        fontSize: '0.95rem',
        margin: '0.25rem',
        width: '5rem',
    };

    const denyButton: React.CSSProperties = {
        padding: '0.3rem',
        cursor: 'pointer',
        borderRadius: '6px',
        color: colors.grey[100],
        backgroundColor: colors.primary[500],
        textTransform: 'none',
        fontSize: '0.95rem',
        margin: '0.25rem',
        width: '4rem',
    };

    return {
        acceptButton,
        denyButton,
    };
}
