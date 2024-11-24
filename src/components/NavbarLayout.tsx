import React from 'react';
import Navbar from './Navbar.tsx';
import { NavbarProvider } from '../components/NavbarContext.tsx';
import Box from '@mui/material/Box';

const PageContainer: React.CSSProperties = {
    padding: '0',
    overflowX: 'auto',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    maxWidth: '100%',
};

const NavbarLayout = ({ children }) => {
    return (
        <NavbarProvider>
            <Box sx={{ display: "flex" }}>
                <Navbar />
                <Box style={PageContainer}>
                    <main>{children}</main>
                </Box>
            </Box>
        </NavbarProvider>
    );
};

export default NavbarLayout;