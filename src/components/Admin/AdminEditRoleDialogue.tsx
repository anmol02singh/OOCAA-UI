import React, { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import { Button, Grid2 as Grid, IconButton, MenuItem, Select, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { tokens } from '../../theme.tsx';
import { useGeneralStyling, useEditItemStyling } from '../../pages/Admin/AdminUtilities.tsx';
import { userdata } from '../../API/account.tsx';

interface EditItemDialogueProps {
    open: boolean;
    onClose: () => void;
    pageWidth: number;
    newRole: number;
    setNewRole: React.Dispatch<React.SetStateAction<number>>;
    setSubmitEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminEditRoleDialogue: React.FC<EditItemDialogueProps> = ({
    open,
    onClose,
    pageWidth,
    newRole,
    setNewRole,
    setSubmitEdit,
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
        adminEditItemDialogueContainer,
        editItemHeader,
        editItemContainer,
        editItemDropdown,
        editItemMenu,
        editItemButtonContainer,
        editItemSaveButton,
    } = useEditItemStyling();

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
        setNewRole(-1);
    }, [open]);

    const handleCriterionChange = (role: number) => {
        setNewRole(role);
    };

    const handleClose = () => {
        onClose();
    }

    const handleSubmit = () => {
        setSubmitEdit(true);
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            keepMounted
            sx={{
                '& .MuiPaper-root': {
                    ...adminEditItemDialogueContainer(pageWidth),
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
                <Grid size={8} sx={editItemHeader}>
                    <Typography variant='h3' sx={{ color: colors.grey[100] }}>
                        Edit Role
                    </Typography>
                </Grid>

                <Grid size={12} sx={editItemContainer}>
                    <Select
                        value={newRole ?? -1}
                        onChange={(event) => handleCriterionChange((event.target.value ?? -1) as number)}
                        sx={editItemDropdown(newRole)}
                        MenuProps={{
                            PaperProps: {
                                sx: { ...editItemMenu },
                            },
                        }}
                    >
                        <MenuItem value={-1} sx={{color: colors.grey[400]}}>Select New Role</MenuItem>
                        <MenuItem value={1}>Level 1 Operator</MenuItem>
                        <MenuItem value={2}>Level 2 Operator</MenuItem>
                        <MenuItem value={0}>Admin</MenuItem>
                    </Select>
                </Grid>

                <Grid
                    size={12}
                    sx={{
                        height: '4rem'
                    }}
                >
                    {/*Spacing for dropdown*/}
                </Grid>

                <Grid size={12} sx={editItemButtonContainer}>
                    <Button
                        type='submit'
                        disabled={newRole < 0 || newRole > 2}
                        onClick={handleSubmit}
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
        </Dialog>
    );
}
export default AdminEditRoleDialogue;