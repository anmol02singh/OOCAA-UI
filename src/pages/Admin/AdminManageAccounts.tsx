import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import {
    getPageWidth,
    useStyling,
} from './AdminUtilities.tsx';
import AdminAccountSearchBar from '../../components/AdminAccountsSearchBar.tsx';
import AdminAccountsTable from '../../components/AdminAccountsTable.tsx';

const AdminManageAccount = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("accountToken");
    if (!token) {
        navigate('/login')
    }

    const {
        pageContainer,
        adminSettingsContainer,
    } = useStyling();

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
        updatePageWidth();
        window.addEventListener('resize', updatePageWidth);

        return () => {
            window.removeEventListener('resize', updatePageWidth);
        };
    }, [pageWidth]);

    const [searchBar, setSearchBar] = useState({ criterion: 'username', value: '' });
    const [submitSearch, setSubmitSearch] = useState<boolean>(false);
    const [submitFilter, setSubmitFilter] = useState<boolean>(false);
    const [submitReset, setSubmitReset] = useState<boolean>(false);

    return (
        <Box ref={boxRef} sx={pageContainer}>
            <Box sx={adminSettingsContainer(pageWidth)}>
                {/* Search Bar */}
                <AdminAccountSearchBar
                    pageWidth={pageWidth}
                    filterRole={filterRole}
                    setFilterRole={setFilterRole}
                    searchBar={searchBar}
                    setSearchBar={setSearchBar}
                    setSubmitSearch={setSubmitSearch}
                    setSubmitFilter={setSubmitFilter}
                    setSubmitReset={setSubmitReset}
                />

                {/* Search Results Table */}
                <AdminAccountsTable
                    token={token}
                    filterRole={filterRole}
                    setFilterRole={setFilterRole}
                    searchBar={searchBar}
                    submitSearch={submitSearch}
                    setSubmitSearch={setSubmitSearch}
                    submitFilter={submitFilter}
                    setSubmitFilter={setSubmitFilter}
                    submitReset={submitReset}
                    setSubmitReset={setSubmitReset}
                />
            </Box>
        </Box>
    );
}
export default AdminManageAccount;