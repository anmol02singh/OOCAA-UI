import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import {
    AccountStats,
    getPageWidth,
    useGeneralStyling,
} from './AdminUtilities.tsx';
import AdminAccountsSearchBar from '../../components/Admin/AdminAccountsSearchBar.tsx';
import AdminAccountsTable from '../../components/Admin/AdminAccountsTable.tsx';
import { userdata } from '../../API/account.tsx';
import { Typography, useTheme } from '@mui/material';
import { tokens } from '../../theme.tsx';
import AdminAccountsStatsDisplay from '../../components/Admin/AdminAccountStatsDisplay.tsx';

const AdminManageAccount = () => {
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
    const [accountStats, setAccountStats] = useState<AccountStats>({
        totalAccounts: { label: 'Total Accounts', value: 0 },
        op1AccountAmount: { label: 'Level 1 Operators', value: 0 },
        op2AccountAmount: { label: 'Level 2 Operators', value: 0 },
        adminAccountAmount: { label: 'Administrators', value: 0 },
    });
    const [selectedAccountsAmount, setSelectedAccountsAmount] = useState<number>(0);
    const [submitSearch, setSubmitSearch] = useState<boolean>(false);
    const [submitFilter, setSubmitFilter] = useState<boolean>(false);
    const [submitEdit, setSubmitEdit] = useState<boolean>(false);
    const [submitDelete, setSubmitDelete] = useState<boolean>(false);
    const [submitReset, setSubmitReset] = useState<boolean>(false);

    return (
        <Box ref={boxRef} sx={pageContainer}>
            <Box sx={adminSettingsContainer(pageWidth)}>
                {/* Title */}
                <Box sx={titleContainer(pageWidth)}>
                    <Typography variant='h2' sx={{color: colors.blueAccent[400]}}>
                        Manage Accounts
                    </Typography>
                </Box>

                {/* Account Statistics*/}
                <AdminAccountsStatsDisplay
                    pageWidth={pageWidth}
                    accountStats={accountStats}
                />
                
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
                    setSubmitEdit={setSubmitEdit}
                    setSubmitDelete={setSubmitDelete}
                    setSubmitReset={setSubmitReset}
                />

                {/* Search Results Table */}
                <AdminAccountsTable
                    token={token}
                    pageWidth={pageWidth}
                    filterRole={filterRole}
                    setFilterRole={setFilterRole}
                    searchBar={searchBar}
                    setDisabled={setDisabled}
                    newRole={newRole}
                    accountStats={accountStats}
                    setAccountStats={setAccountStats}
                    setSelectedAccountsAmount={setSelectedAccountsAmount}
                    submitSearch={submitSearch}
                    setSubmitSearch={setSubmitSearch}
                    submitFilter={submitFilter}
                    setSubmitFilter={setSubmitFilter}
                    submitEdit={submitEdit}
                    setSubmitEdit={setSubmitEdit}
                    submitDelete={submitDelete}
                    setSubmitDelete={setSubmitDelete}
                    submitReset={submitReset}
                    setSubmitReset={setSubmitReset}
                />
            </Box>
        </Box>
    );
}
export default AdminManageAccount;