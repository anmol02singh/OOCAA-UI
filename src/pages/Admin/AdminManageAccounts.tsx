import React, { useEffect, useRef, useState } from 'react';
import { Button, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import {
    getPageWidth,
    useGeneralStyling,
} from './AdminUtilities.tsx';
import { userdata } from '../../API/account.tsx';
import { tokens } from '../../theme.tsx';
import { useNavigate } from 'react-router-dom';

const AdminManageAccount = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("accountToken");
    if(!token){
        navigate('/login')
    }

    const {
        pageContainer,
        adminSettingsContainer,
    } = useGeneralStyling();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    //User data
    const [userData, setUserData] = useState({
        name: '',
        username: '',
        role: '',
    });
    
    const boxRef = useRef<HTMLDivElement>(null);
    const [pageWidth, setPageWidth] = useState(getPageWidth(boxRef));

    const updatePageWidth = () => {
        const newPageWidth = getPageWidth(boxRef);
        setPageWidth(newPageWidth);
    }

    useEffect(() => {
        if (token) {
            userdata(token)
                .then(json => {
                    if(json.roleNum && json.roleNum >= 1){
                        navigate('/')
                    }
                    
                    setUserData({
                        ...userData,                  
                        name: json.name,
                        username: json.username,
                        role: json.role,
                    });
                });
        }
    //eslint-disable-next-line
    }, []);

    useEffect(() => {
        updatePageWidth();
        window.addEventListener('resize', updatePageWidth);

        return () => {
            window.removeEventListener('resize', updatePageWidth);
        };
    }, [pageWidth]);

    return (
        <Box ref={boxRef} sx={pageContainer}>
            <Box sx={adminSettingsContainer(pageWidth)}>
                
            </Box>
        </Box>
    );
}
export default AdminManageAccount;