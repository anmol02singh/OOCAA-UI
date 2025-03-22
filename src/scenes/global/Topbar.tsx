import { Box, IconButton, useTheme } from '@mui/material';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ColorModeContext, tokens } from  '../../theme.tsx';
import { userdata } from '../../API/account.tsx';
import InputBase from '@mui/material/InputBase';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/SearchOutlined';

import React, { FC } from 'react';
import routes from '../../routes.js';

const Topbar: FC = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const navigate = useNavigate();
    
    const [activeUsername, setActiveUsername] = useState<string>('');

    const accountToken = localStorage.getItem("accountToken");
    if (accountToken) {
        userdata(accountToken)
            .then(json => json.username)
            .then(setActiveUsername);
    }
    function logout() {
        localStorage.removeItem("accountToken");
        window.location.reload();
    }    

    return (<Box display = "flex" justifyContent = "space-between" p = {2}> 
    {/* SEARCH BAR */}
         <Box 
         display="flex" 
         sx = {{ backgroundColor: colors.primary[400], borderRadius: "3px" }}
         >

         <InputBase id='search-bar' sx = {{ml: 2, flex: 1}} placeholder="Search" />
         <IconButton type = "button" sx = {{ p : 1}}>
            <SearchIcon/>
         </IconButton>
        </Box>

        {/* ICONS */}
         <Box display = "flex"> 
            {/* <IconButton onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === 'dark' ? (
                   <DarkModeOutlinedIcon /> 
                ) : (
                    <LightModeOutlinedIcon />

                )}
                
            </IconButton> */}

            <IconButton>
                <NotificationsOutlinedIcon />
            </IconButton>
             <IconButton>
                 <SettingsOutlinedIcon onClick={() => navigate(routes.settings)}  />
             </IconButton>
 

            {activeUsername ? (<>
                <IconButton onClick={() => navigate(routes.profile)}>
                    <PersonOutlinedIcon/>
                </IconButton>

                <IconButton onClick={logout}>
                    <LogoutIcon />
                </IconButton>
            </>) : (
                <a href="/login">
                    <IconButton>
                        <LoginIcon />
                    </IconButton>
                </a>
            )}
         </Box>
        </Box>
    );
};

export default Topbar;
