// src/components/FullCdmModal.tsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  useTheme,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import { tokens } from '../theme.tsx';
import { CDM } from '../types.tsx';
import CloseIcon from '@mui/icons-material/Close'
import DownloadIcon from '@mui/icons-material/Download';

interface FullCdmModalProps {
  open: boolean;
  onClose: () => void;
  cdm: CDM;
}

const FullCdmModal: React.FC<FullCdmModalProps> = ({ open, onClose, cdm }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const handleExportJSON = () => {
    const fileName = `${cdm.messageId}.json`;
    const jsonStr = JSON.stringify(cdm, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog
    open={open}
    onClose={onClose}
    fullWidth
    maxWidth="lg"
    slotProps={{
        paper: {
        sx: { backgroundColor: colors.primary[350], color: colors.grey[100], backgroundImage: 'none' },
        },
    }}
    >
    <DialogTitle
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: colors.primary[400],
        }}
    >
        <Typography variant="h5">
            Viewing Full CDM: {cdm.messageId}
        </Typography>
        <IconButton
            onClick={onClose}
            size="small"
            sx={{ color: colors.grey[100] }}
        >
        <CloseIcon fontSize="small" />
        </IconButton>
    </DialogTitle>
    <DialogContent dividers>
        <Box
        component="pre"
        sx={{
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            fontSize: '0.85rem',
        }}
        >
        {JSON.stringify(cdm, null, 2)}
        </Box>
    </DialogContent>
    <DialogActions sx={{ backgroundColor: colors.primary[400] }}>
    <Button 
        variant="contained" 
        sx={{ backgroundColor: colors.primary[350], padding: '0.5rem 1rem', color: colors.grey[100] }}
        startIcon={<DownloadIcon />}
        onClick={handleExportJSON}
    >
        Export
    </Button>
    </DialogActions>
    </Dialog>

  );
};

export default FullCdmModal;
