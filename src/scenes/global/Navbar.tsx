import React, { FC, useEffect } from 'react';
import { useState } from 'react';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { tokens } from '../../theme.tsx';
import { userdata } from '../../API/account.tsx';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import SatelliteAltOutlinedIcon from '@mui/icons-material/SatelliteAltOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import routes from '../../routes.js';
import { Account } from '../../types.tsx';

interface ItemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: (value: string) => void;
}

const Item: FC<ItemProps> = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Navbar: FC = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>('Dashboard');

  const [userData, setUserData] = useState<Account>({
    username: '',
    role: '',
    roleNum: 1,
    profileImage: {
      publicId: '',
      url: undefined,
    },
  });

  const token = localStorage.getItem("accountToken");

  useEffect(() => {
    if (token) {
      userdata(token)
        .then(json => {
          setUserData({
            ...userData,
            username: json.username,
            role: json.role,
            roleNum: json.roleNum,
            profileImage: json.profileImage,
          });
        });
    }
    //eslint-disable-next-line
  }, []);

  return (
    <Box
      sx={{height: "auto",
        '& .pro-sidebar-inner': { background: `${colors.primary[400]} !important`, height:"100%" },
        '& .pro-icon-wrapper': { backgroundColor: 'transparent !important' },
        '& .pro-inner-item': { padding: '5px 35px 5px 20px !important' },
        '& .pro-inner-item:hover': { color: '#868dfb !important' },
        '& .pro-menu-item.active': { color: '#6870fa !important' },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{ margin: '10px 0 20px 0', color: colors.grey[100] }}
          >
            {!isCollapsed && (
              <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                <Typography variant="h3" fontWeight="bold" color={colors.grey[100]}>
                  OOCAA
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!isCollapsed && (
            <Box marginBottom="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                {userData.username && userData.profileImage?.url && (
                  <img
                    alt="profile-user"
                    width="100px"
                    height="100px"
                    src={userData.profileImage.url}
                    style={{ cursor: "pointer", borderRadius: "50%" }}
                    onClick={() => navigate(routes.profile)}
                  />
                )}
              </Box>
              <Box textAlign="center">
                <Typography variant="h2" color={colors.grey[100]} fontWeight="bold" sx={{ m: "10px 0 0 0 0" }}>
                  {userData.username || "Not logged in"}
                </Typography>
                {userData.username && (
                  <Typography variant="h5" color={colors.greenAccent[500]}>
                    {userData.role?.toUpperCase() ?? ''}
                  </Typography>
                )}
              </Box>
            </Box>
          )}
          <Box paddingLeft={isCollapsed ? undefined : '10%'}>
            <Typography variant="h6" color={colors.grey[300]} sx={{ m: '15px 0 5px 20px' }}>
              Data
            </Typography>
            <Item title="Directory" to="/" icon={<SatelliteAltOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Watchlist" to="/watchlist" icon={<ReceiptOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Item title="CDM Alerts" to="/alerts" icon={<PeopleOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Typography variant="h6" color={colors.grey[300]} sx={{ m: '15px 0 5px 20px' }}>
              Pages
            </Typography>
            <Item title="Profile Form" to="/profile" icon={<PersonOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Item title="About OOCAA" to="/about" icon={<HelpOutlineOutlinedIcon />} selected={selected} setSelected={setSelected} />
            {userData.roleNum !== undefined && userData.roleNum < 1 && (
              <>
                <Typography variant="h6" color={colors.grey[300]} sx={{ m: '15px 0 5px 20px' }}>
                  Admin
                </Typography>
                <Item title="Manage Accounts" to={routes.manageAccounts} icon={<PeopleOutlinedIcon />} selected={selected} setSelected={setSelected} />
                <Item title="Role Requests" to={routes.manageRequests} icon={<AssignmentIndIcon />} selected={selected} setSelected={setSelected} />
              </>
            )}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Navbar;