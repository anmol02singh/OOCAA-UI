import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import {
    getPageWidth,
    useGeneralStyling,
} from './AdminUtilities.tsx';
import AdminAccountsSearchBar from '../../components/Admin/AdminAccountsSearchBar.tsx';
import { userdata } from '../../API/account.tsx';
import { Typography, useTheme } from '@mui/material';
import { tokens } from '../../theme.tsx';
import AdminRequestsTable from '../../components/Admin/AdminRequestsTable.tsx';

const AdminRoleChangeRequests = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("accountToken");
    if (!token) {
        navigate('/login')
    }

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const {
        pageContainer,
        adminSettingsContainer,
        titleContainer,
    } = useGeneralStyling();

    const [filterRole, setFilterRole] = useState<{ min: number | '', max: number | '' }>({
        min: '',
        max: '',
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
                .then(account => {
                    if(account && account.roleNum > 0){
                        navigate('/');
                    }
                });
        }
    }, []);

    useEffect(() => {
        updatePageWidth();
        window.addEventListener('resize', updatePageWidth);

        return () => {
            window.removeEventListener('resize', updatePageWidth);
        };
    }, [pageWidth]);

    const [searchBar, setSearchBar] = useState({ criterion: 'username', value: '' });
    const [disabled, setDisabled] = useState<boolean>(true);
    const [newRole, setNewRole] = useState<number>(-1);
    const [selectedAccountsAmount, setSelectedAccountsAmount] = useState<number>(0);
    const [submitSearch, setSubmitSearch] = useState<boolean>(false);
    const [submitFilter, setSubmitFilter] = useState<boolean>(false);
    const [submitAccept, setSubmitAccept] = useState<boolean>(false);
    const [submitDeny, setSubmitDeny] = useState<boolean>(false);
    const [submitReset, setSubmitReset] = useState<boolean>(false);

    return (
        <Box ref={boxRef} sx={pageContainer}>
            <Box sx={adminSettingsContainer(pageWidth)}>
                {/* Title */}
                <Box sx={titleContainer(pageWidth)}>
                    <Typography variant='h2' sx={{color: colors.blueAccent[400]}}>
                        Role Change Requests
                    </Typography>
                </Box>
                
                {/* Search Bar */}
                <AdminAccountsSearchBar
                    pageWidth={pageWidth}
                    filterRole={filterRole}
                    setFilterRole={setFilterRole}
                    searchBar={searchBar}
                    disabled={disabled}
                    newRole={newRole}
                    selectedAccountsAmount={selectedAccountsAmount}
                    setNewRole={setNewRole}
                    setSearchBar={setSearchBar}
                    setSubmitSearch={setSubmitSearch}
                    setSubmitFilter={setSubmitFilter}
                    setSubmitEdit={setSubmitAccept}
                    setSubmitDelete={setSubmitDeny}
                    setSubmitReset={setSubmitReset}
                />

                {/* Search Results Table */}
                <AdminRequestsTable
                    token={token}
                    pageWidth={pageWidth}
                    filterRole={filterRole}
                    setFilterRole={setFilterRole}
                    searchBar={searchBar}
                    setDisabled={setDisabled}
                    newRole={newRole}
                    setSelectedAccountsAmount={setSelectedAccountsAmount}
                    submitSearch={submitSearch}
                    setSubmitSearch={setSubmitSearch}
                    submitFilter={submitFilter}
                    setSubmitFilter={setSubmitFilter}
                    submitAccept={submitAccept}
                    setSubmitAccept={setSubmitAccept}
                    submitDeny={submitDeny}
                    setSubmitDeny={setSubmitDeny}
                    submitReset={submitReset}
                    setSubmitReset={setSubmitReset}
                />
            </Box>
        </Box>
    );
}
export default AdminRoleChangeRequests;