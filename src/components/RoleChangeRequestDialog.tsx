import React, { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import { Button, Grid2 as Grid, IconButton, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { tokens } from '../theme.tsx';
import { userdata } from '../API/account.tsx';
import { useGeneralStyling, useRoleChangeStyling } from '../pages/Profile/ProfileUtilities.tsx';

interface DeleteItemDialogueProps {
    open: boolean;
    onClose: () => void;
    pageWidth: number;
    roleNum: number | undefined;
    setSubmitRequest: React.Dispatch<React.SetStateAction<boolean>>;
}

const RoleChangeRequestDialog: React.FC<DeleteItemDialogueProps> = ({
    open,
    onClose,
    pageWidth,
    roleNum,
    setSubmitRequest,
}) => {
    const token = localStorage.getItem("accountToken");
    if (!token) {
        onClose();
    }

    const {
        profileElements,
        button_hover
    } = useGeneralStyling();

    const {
        requestDialogContainer,
        requestHeader,
        requestContainer,
        requestButtonContainer,
        requestButton,
    } = useRoleChangeStyling();

    const roleNumToString = ["Admin", "Level 1 Operator"]

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
        setSubmitRequest(true);
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            keepMounted
            sx={{
                '& .MuiPaper-root': {
                    ...requestDialogContainer(pageWidth),
                },
                '& .css-kw13he-MuiDialogContent-root': {
                    padding: 0,
                },
            }}
        >
            <Grid container sx={profileElements} rowSpacing={3} columnSpacing={2}>
                <Grid size={2}>
                    <IconButton onClick={handleClose}>
                        <CloseIcon sx={{ fontSize: '1.8rem' }} />
                    </IconButton>
                </Grid>
                <Grid size={8} sx={requestHeader}>
                    <Typography variant='h3' sx={{ color: colors.redAccent[400] }}>
                        Request Role Change?
                    </Typography>
                </Grid>

                <Grid size={12} sx={requestContainer}>
                    <Typography variant='h4' sx={{ color: colors.grey[100] }}>
                        {roleNum !== undefined && roleNum > 0 ?
                            `You are about to submit a request to change your role to ${roleNumToString[roleNum-1]}.`
                        :
                            "Your access level cannot be increased."}
                    </Typography>
                </Grid>

                <Grid size={12} sx={requestButtonContainer}>
                <Button
                        type='submit'
                        onClick={handleClose}
                        sx={{
                            ...requestButton,
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
                        disabled={!(roleNum !== undefined && roleNum > 0)}
                        sx={{
                            ...requestButton,
                            '&:hover': {
                                ...button_hover,
                            },
                        }}
                    >
                        Proceed
                    </Button>
                </Grid>
            </Grid>
        </Dialog>
    );
}
export default RoleChangeRequestDialog;
