import React from 'react';
import { useNavigate } from 'react-router-dom';
import spaceShip from "../assets/space-ship-space.svg";

import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
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

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        duration: theme.transitions.duration.standard,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        duration: theme.transitions.duration.standard,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(10)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(11)} + 1px)`,
    },
});

const themeColors = {
    color: '#59D0EE',
    backgroundColor: {
        normal: '#0A1E3D',
        hover: '#07162C',
    },
    borderColor: '#59D0EE',
};

const themeStyle: React.CSSProperties = {
    color: themeColors.color,
    backgroundColor: themeColors.backgroundColor.normal,
    borderColor: themeColors.borderColor,
}

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        '& .MuiPaper-root': {
            color: themeColors.color,
            backgroundColor: themeColors.backgroundColor.normal,
            borderColor: themeColors.borderColor,
        },
        ...(open
            ? {
                ...openedMixin(theme),
                '& .MuiDrawer-paper': openedMixin(theme),
            }
            : {
                ...closedMixin(theme),
                '& .MuiDrawer-paper': closedMixin(theme),
            }
        ),
    }),
);

const DrawerHeader = styled('div')(
    () => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        padding: '5px',
        color: themeColors.color,
        backgroundColor: themeColors.backgroundColor.normal,
        borderColor: themeColors.borderColor,
    })
);

const Logo: React.CSSProperties = {
    width: '50px',
    height: 'auto',
    margin: '10px 12px',
    cursor: 'pointer',
};

const DrawerButton = styled(IconButton, { shouldForwardProp: (prop) => prop !== 'open' })<{ open: boolean }>(
    ({ theme, open }) => ({
        width: theme.spacing(3.5),
        height: theme.spacing(3.5),
        position: 'fixed',
        color: themeColors.color,
        backgroundColor: themeColors.backgroundColor.normal,
        border: theme.spacing(0.1) + " solid",
        borderColor: themeColors.borderColor,
        '&:hover': {
            backgroundColor: themeColors.backgroundColor.hover,
        },
        transition: theme.transitions.create('left', {
            duration: theme.transitions.duration.standard,
        }),
        left: open ? '225px' : '74px',
    })
);

const NavbarItems = [
    { kind: 'divider' },
    { kind: 'header', title: 'Overview' },
    { segment: 'home', title: 'Home', icon: <HomeIcon /> },
    { segment: 'about', title: 'About', icon: <AboutIcon /> },
    { segment: 'contact', title: 'Contact', icon: <ContactIcon /> },
    { kind: 'divider' },
];

const Navbar = () => {
    const theme = useTheme();
    const { isNavbarOpen, toggleNavbar } = useNavbar();

    const navigate = useNavigate();

    return (
        <Drawer variant="permanent" open={isNavbarOpen} onClose={toggleNavbar}>
            <DrawerHeader>
                <img src={spaceShip} alt="rocketship" style={Logo} onClick={() => navigate(routes.home)} />
                <DrawerButton
                    open={isNavbarOpen}
                    onClick={toggleNavbar}
                    sx={[
                        isNavbarOpen
                            ? {
                                left: '225px',
                            }
                            : {
                                left: '74px',
                            },
                    ]}>
                    {isNavbarOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </DrawerButton>
            </DrawerHeader>
            <List>
                {NavbarItems.map((item) => {
                    if (item == null) {
                        return null;
                    }
                    if (item.kind === 'header') {
                        return (
                            <ListSubheader
                                style={themeStyle}
                                key={item.title}
                                sx={{
                                    display: 'box',
                                    margin: '0.4rem',
                                    marginTop: '0.8rem',
                                    paddingX: isNavbarOpen ? '1rem' : 0,
                                    textAlign: isNavbarOpen ? 'initial' : 'center',
                                }}
                            >
                                <Typography sx={{ fontSize: '14px'}}>
                                    {item.title}
                                </Typography>
                            </ListSubheader>
                        );
                    }
                    if (item.kind === 'divider') {
                        return <Divider style={themeStyle} key={item.title} />;
                    }
                    return (
                        <ListItem
                            key={item.segment}
                            sx={{
                                display: 'block',
                                padding: 0,
                            }}
                        >
                            <ListItemButton
                                sx={{
                                    margin: '0.4rem',
                                    paddingX: '1rem',
                                    borderRadius: '6px',
                                    justifyContent: isNavbarOpen ? 'initial' : 'center',
                                    height: theme.spacing(5),
                                    '&:hover': {
                                        backgroundColor: themeColors.backgroundColor.hover,
                                    },
                                }}
                                onClick={() => navigate(routes[item.segment])}>
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        marginRight: isNavbarOpen ? theme.spacing(1) : 0,
                                        color: themeColors.color,
                                        '&:hover': {
                                            backgroundColor: themeColors.backgroundColor.hover,
                                        },
                                    }}>
                                    {item.icon}
                                </ListItemIcon>
                                {isNavbarOpen && <ListItemText primary={item.title} />}
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </Drawer>
    );
}

export default Navbar;
