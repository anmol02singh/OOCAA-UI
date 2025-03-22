import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@mui/icons-material/SatelliteAlt';
import '../styles/Navbar.css';
import { useState } from 'react';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import AboutIcon from '@mui/icons-material/Info';
import ContactIcon from '@mui/icons-material/PermContactCalendar';
import ListSubheader from '@mui/material/ListSubheader';
import routes from '../routes';
import { useNavbar } from './NavbarContext.tsx';
import { Typography } from '@mui/material';
import SettingsPopover from '../pages/SettingsPopover.tsx'; 

const NavbarItems = [
    { kind: 'divider' },
    { kind: 'header', title: 'Overview' },
    { segment: 'home', title: 'Home', icon: <HomeIcon /> },
    { segment: 'about', title: 'About', icon: <AboutIcon /> },
    { segment: 'contact', title: 'Contact', icon: <ContactIcon /> },
    { kind: 'divider' },
];

const Navbar = () => {
    const { isNavbarOpen, toggleNavbar } = useNavbar();

    const navigate = useNavigate();
    const [textSize, setTextSize] = useState(16);
    return (
       
        <MuiDrawer
            className={`navbarDrawer ${isNavbarOpen ? 'open' : ''}`}
            variant="permanent"
            anchor="left"
            open={isNavbarOpen}
            onClose={toggleNavbar}
        >
            <div className='navbarDrawerHeader'>
                {/* <img
                    className='logo'
                    src={Logo}
                    alt="rocketship"
                    onClick={() => navigate(routes.home)}
                /> */}
                <Logo
                    className='logo'
                    onClick={() => navigate(routes.home)}
                />
                <IconButton
                    className={`navbarDrawerButton ${isNavbarOpen ? 'open' : ''}`}
                    onClick={toggleNavbar}
                >
                    {isNavbarOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </div>
            <List className='navbarList'>
                {NavbarItems.map((item) => {
                    if (item == null) {
                        return null;
                    }
                    if (item.kind === 'header') {
                        return (
                            <ListSubheader
                                className={`navbarSubheader ${isNavbarOpen ? 'open' : ''}`}
                                key={item.title}
                            >
                                <Typography className='navbarSubheaderText'>
                                    {item.title}
                                </Typography>
                            </ListSubheader>
                        );
                    }
                    if (item.kind === 'divider') {
                        return <Divider
                            className="navbarDivider"
                            key={item.title}
                        />;
                    }
                    return (
                        <ListItem
                            className='navbarListItem'
                            key={item.segment}
                        >
                            <ListItemButton
                                className={`navbarItemButton ${isNavbarOpen ? 'open' : ''}`}                                
                                onClick={() => navigate(routes[item.segment])}>
                                <ListItemIcon className={`navbarItemIcon ${isNavbarOpen ? 'open' : ''}`}>
                                    {item.icon}
                                </ListItemIcon>
                                {isNavbarOpen && <ListItemText primary={item.title} />}
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
               {/* <SettingsPopover setTextSizeState={setTextSize} /> */}
        </MuiDrawer>
    );
}

export default Navbar;
