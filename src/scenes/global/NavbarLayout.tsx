import React from 'react';
import Box from '@mui/material/Box';
import Navbar from './Navbar.tsx'; // Import your Navbar component

const PageContainer: React.CSSProperties = {
    display: 'flex',               // Horizontal alignment of Navbar and main content
    flexDirection: 'row',          // Side-by-side layout
    height: '100vh',               // Full viewport height
    width: '100%',                 // Full width of the page
};

const SidebarStyle: React.CSSProperties = {
    flexShrink: 0,                 // Prevent the sidebar from shrinking
    width: '250px',                // Fixed width for the sidebar (adjust as needed)
    height: '100%',                // Full height of the parent (100vh from PageContainer)
    background: '#2c3e50',         // Example background color
};

const ContentStyle: React.CSSProperties = {
    flexGrow: 1,                   // Allow the content to take the remaining space
    padding: '1em',                // Padding inside the content area
    overflow: 'auto',              // Enable scrolling if content overflows
};

const NavbarLayout = ({ children }) => {
    return (
        <Box style={PageContainer}>
            {/* Sidebar */}
            <Box style={SidebarStyle}>
                <Navbar />
            </Box>

            {/* Main content */}
            <Box style={ContentStyle}>
                <main>{children}</main>
            </Box>
        </Box>
    );
};

export default NavbarLayout;

