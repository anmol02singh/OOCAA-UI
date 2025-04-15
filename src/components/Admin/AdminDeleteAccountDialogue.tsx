import React, { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import { Button, Grid2 as Grid, IconButton, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { tokens } from '../../theme.tsx';
import { useGeneralStyling, useDeleteItemStyling } from '../../pages/Admin/AdminUtilities.tsx';
import { userdata } from '../../API/account.tsx';

interface DeleteItemDialogueProps {
    open: boolean;
    onClose: () => void;
    pageWidth: number;
    selectedAccountsAmount: number;
    setSubmitDelete: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminDeleteAccountDialogue: React.FC<DeleteItemDialogueProps> = ({
    open,
    onClose,
    pageWidth,
    selectedAccountsAmount,
    setSubmitDelete,
}) => {
    const token = localStorage.getItem("accountToken");
    if (!token) {
        onClose();
    }

    const {
        adminElements,
        button_hover
    } = useGeneralStyling();

    const {
        adminDeleteItemDialogueContainer,
        deleteItemHeader,
        deleteItemContainer,
        deleteItemButtonContainer,
        deleteItemConfirmButton,
        cancelDeleteButton,
    } = useDeleteItemStyling();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        if (token) {
            userdata(token)
                .then(account => {
                    if (account && account.roleNum > 0) {
                        onClose();
                    }
                });
        }
    }, []);

    useEffect(() => {
        if (!open) return;
    }, [open]);

    const handleClose = () => {
        onClose();
    }

    const handleSubmit = () => {
        setSubmitDelete(true);
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            keepMounted
            sx={{
                '& .MuiPaper-root': {
                    ...adminDeleteItemDialogueContainer(pageWidth),
                },
                '& .css-kw13he-MuiDialogContent-root': {
                    padding: 0,
                },
            }}
        >
            <Grid container sx={adminElements} rowSpacing={3} columnSpacing={2}>
                <Grid size={2}>
                    <IconButton onClick={handleClose}>
                        <CloseIcon sx={{ fontSize: '1.8rem' }} />
                    </IconButton>
                </Grid>
                <Grid size={8} sx={deleteItemHeader}>
                    <Typography variant='h3' sx={{ color: colors.redAccent[400] }}>
                        Delete Selected?
                    </Typography>
                </Grid>

                <Grid size={12} sx={deleteItemContainer}>
                    <Typography variant='h4' sx={{ color: colors.grey[100] }}>
                        {`${selectedAccountsAmount} account(s) are about to be deleted. This can not be undone.`}
                    </Typography>
                </Grid>

                <Grid size={12} sx={deleteItemButtonContainer}>
                <Button
                        type='submit'
                        onClick={handleClose}
                        sx={{
                            ...cancelDeleteButton,
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
                            ...deleteItemConfirmButton,
                            '&:hover': {
                                ...button_hover,
                                color: '#f44336',
                            },
                        }}
                    >
                        Delete Selected
                    </Button>
                </Grid>
            </Grid>
        </Dialog>
    );
}
export default AdminDeleteAccountDialogue;