import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import spaceShip from "../assets/space-ship-space.svg";

import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    ...openedMixin(theme),
                    '& .MuiDrawer-paper': openedMixin(theme),
                },
            },
            {
                props: ({ open }) => !open,
                style: {
                    ...closedMixin(theme),
                    '& .MuiDrawer-paper': closedMixin(theme),
                },
            },
        ],
    }),
);

const DrawerHeader = styled('div')(
    () => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        padding: '5px',
    })
);

const Logo: React.CSSProperties = ({
    width: '50px',
    height: 'auto',
    margin: '10px 12px',
    cursor: 'pointer'
});

const DrawerButton = styled(IconButton, { shouldForwardProp: (prop) => prop !== 'open' })<{ open: boolean }>(
    ({ theme, open }) => ({
        width: theme.spacing(3.5),
        height: theme.spacing(3.5),
        position: 'fixed',
        backgroundColor: theme.palette.background.default,
        border: theme.spacing(0.1) + " solid",
        borderColor: theme.palette.divider,
        '&:hover': {
            backgroundColor: theme.palette.grey.A100,
        },
        transition: theme.transitions.create('left', {
            duration: theme.transitions.duration.standard,
        }),
        left: open ? '225px' : '74px',
    })
);

const NavbarItems = [
    { kind: 'divider' },
    /*{ kind: 'header', title: 'Overview' }*/,
    { segment: 'home', title: 'Home', icon: <HomeIcon /> },
    { segment: 'about', title: 'About', icon: <AboutIcon /> },
    { segment: 'contact', title: 'Contact', icon: <ContactIcon /> },
    { kind: 'divider' },
];

const Navbar = () => {
    const theme = useTheme();
    const [isDrawerOpen, setDrawerOpen] = React.useState(false);

    const toggleDrawer = () => {
        setDrawerOpen((prev) => !prev);
    };

    const navigate = useNavigate();

    return (
        <Box sx={{ display: "flex", alignItems: "center", padding: 1 }}>
            <CssBaseline />
            <Drawer variant="permanent" open={isDrawerOpen} onClose={toggleDrawer}>
                <DrawerHeader>
                    <img src={spaceShip} alt="rocketship" style={Logo} onClick={() => navigate(routes.home)} />
                    <DrawerButton
                        open={isDrawerOpen}
                        onClick={toggleDrawer}
                        sx={[
                            isDrawerOpen
                                ? {
                                    left: '225px',
                                }
                                : {
                                    left: '74px',
                                },
                        ]}>
                        {isDrawerOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </DrawerButton>
                </DrawerHeader>
                <List>
                    {NavbarItems.map((item) => {
                        if (item == null) {
                            return;
                        }
                        if (item.kind === 'header') {
                            return <ListSubheader key={item.title}>{item.title}</ListSubheader>;
                        }
                        if (item.kind === 'divider') {
                            return <Divider key={item.title} />;
                        }
                        return (
                            <ListItem key={item.segment} disablePadding sx={{ display: 'block'}}>
                                <ListItemButton
                                    sx={{
                                        justifyContent: isDrawerOpen ? 'initial' : 'center',
                                        height: theme.spacing(5),                            
                                    }}
                                    onClick={() => navigate(routes[item.segment])}>
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            marginRight: isDrawerOpen ? theme.spacing(1) : 0,
                                        }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    {isDrawerOpen && <ListItemText primary={item.title} />}
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />

            </Box>
        </Box>
    );
}

export default Navbar;
