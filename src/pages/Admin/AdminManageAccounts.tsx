import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import {
    getPageWidth,
    useGeneralStyling,
} from './AdminUtilities.tsx';
import { userdata } from '../../API/account.tsx';
import { tokens } from '../../theme.tsx';
import AdminAccountSearchBar from '../../components/AdminAccountsSearchBar.tsx';
import AdminAccountsTable from '../../components/AdminAccountsTable.tsx';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';

const AdminManageAccount = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("accountToken");
    if (!token) {
        navigate('/login')
    }

    const {
        pageContainer,
        adminSettingsContainer,
    } = useGeneralStyling();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    //User data
    const [userData, setUserData] = useState({
        name: '',
        username: '',
        role: '',
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
                .then(json => {
                    if (json.roleNum && json.roleNum >= 1) {
                        navigate('/')
                    }

                    setUserData({
                        ...userData,
                        name: json.name,
                        username: json.username,
                        role: json.role,
                    });
                });
        }
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        updatePageWidth();
        window.addEventListener('resize', updatePageWidth);

        return () => {
            window.removeEventListener('resize', updatePageWidth);
        };
    }, [pageWidth]);

    const [searchBars, setSearchBars] = useState([{ id: 1, criteria: 'objectName', value: '' }]);

    const handleAddSearchBar = () => {
        if (searchBars.length < 2) {
            setSearchBars([...searchBars, { id: searchBars.length + 1, criteria: 'objectName', value: '' }]);
        }
    };

    const handleRemoveSearchBar = () => {
        if (searchBars.length > 1) {
            setSearchBars(searchBars.slice(0, -1));
        }
    };

    const handleCriteriaChange = (id: number, criteria: string) => {
        setSearchBars((prev) =>
            prev.map((bar) =>
                bar.id === id ? { ...bar, criteria } : bar
            )
        );
    };

    // const handleTcaChange = (newRange: [number, number]) => {
    //     setTcaRange(newRange);
    // };

    const handleValueChange = (id: number, value: string) => {
        setSearchBars((prev) =>
            prev.map((bar) =>
                bar.id === id ? { ...bar, value } : bar
            )
        );
    };

    const handleSearch = async () => {
        // const hasEmptySearch = searchBars.some((bar) => bar.value.trim() === '');
        // if (hasEmptySearch) {
        //     setEvents([]);
        //     setCdms([]);
        //     setSelectedEvent(null);
        //     setSelectedCDM(null);
        //     setTles({});
        //     return;
        // }
        // try {
        //     const data = await fetchEvents(searchBars, tcaRange, {});
        //     console.log('lets see', data);
        //     setEvents(data);
        //     setSelectedCDM(null);
        //     setTles({});
        //     setSelectedEvent(null);
        //     setCdms([]);
        // } catch (error) {
        //     console.error('Search failed:', error);
        // }
    };

    // const handleClickMessageId = async (cdm: CDM) => {
    //     try {
    //         const { object1, object2, tca } = cdm;
    //         const data = await fetchTLEs([object1.objectDesignator, object2.objectDesignator], tca);
    //         setTca(tca);

    //         if (data && data.length === 2) {
    //             setTles({
    //                 object1: {
    //                     designator: data[0].designator,
    //                     tleLine1: data[0].tleLine1,
    //                     tleLine2: data[0].tleLine2,
    //                 },
    //                 object2: {
    //                     designator: data[1].designator,
    //                     tleLine1: data[1].tleLine1,
    //                     tleLine2: data[1].tleLine2,
    //                 },
    //             });
    //         } else {
    //             console.error('Unexpected TLE data format:', data);
    //         }
    //         console.log('Fetched TLEs:', tles.object1);
    //         setSelectedCDM(cdm);
    //     } catch (error) {
    //         console.error('Failed to fetch TLEs:', error);
    //     }
    // };

    const handleEventClick = async (eventItem: Event) => {
        // try {
        //     const data = await fetchCDMs(eventItem._id);
        //     setSelectedEvent(eventItem);
        //     setCdms(data);
        //     setSelectedCDM(null);
        //     setTles({});
        //     console.log("CDMs", data);
        // } catch (error) {
        //     console.error('Failed to fetch CDMs for event:', error);
        // }
    };

    return (
        <Box ref={boxRef} sx={pageContainer}>
            <Box sx={adminSettingsContainer(pageWidth)}>
                {/* Search Bars */}
                {searchBars.map((bar) => (
                    <AdminAccountSearchBar
                        key={bar.id}
                        criteria={bar.criteria}
                        value={bar.value}
                        onCriteriaChange={(value) => handleCriteriaChange(bar.id, value)}
                        onValueChange={(value) => handleValueChange(bar.id, value)}
                        onSearch={handleSearch}
                        backgroundColor={colors.primary[400]}
                        textColor={colors.grey[100]}
                    />
                ))}

                {/* Add/Remove Search Bars */}
                <Box display="flex" justifyContent="center" mt={2}>
                    {searchBars.length === 1 && (
                        <IconButton onClick={handleAddSearchBar} sx={{ color: colors.grey[100] }}>
                            <AddCircleOutlineOutlinedIcon />
                        </IconButton>
                    )}
                    {searchBars.length === 2 && (
                        <IconButton onClick={handleRemoveSearchBar} sx={{ color: colors.grey[100] }}>
                            <RemoveCircleOutlineOutlinedIcon />
                        </IconButton>
                    )}
                </Box>

                {/* TCA Picker */}
                {/* <TcaPicker
                    tcaRange={tcaRange}
                    onTcaChange={handleTcaChange}
                    onSearch={handleSearch}
                /> */}

                {/* Search Results Table */}
                {/* {events.length > 0 && ( */}
                    <AdminAccountsTable events={Event[1]} selectedEvent={new Event('a')} onEventClick={handleEventClick} />
                {/* )} */}
            </Box>
        </Box>
    );
}
export default AdminManageAccount;