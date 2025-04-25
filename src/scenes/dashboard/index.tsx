import { Box, useTheme } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import Header from '../../components/Header.tsx';
import { tokens } from "../../theme.tsx";
import NoteIcon from '@mui/icons-material/Note';
import LayersIcon from '@mui/icons-material/Layers';
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';
import RulerIcon from '@mui/icons-material/Straighten';
import DieIcon from '@mui/icons-material/Casino';
import SimpleStatBox from '../../components/SimpleStatBox.tsx';
import IndividualStatBox from '../../components/IndividualStatBox.tsx';

import { cdmCount, closestMiss, largestCollisionProbability, eventCount, objectCount } from '../../API/stats.tsx';
import { fetchAllCDMs } from '../../API/fetchCDMs.tsx';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem("accountToken");
    if (!token) {
        navigate('/login')
    }

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [getCdmCount, setCdmCount] = useState<number>(0);
    const [closestMissDistance, setClosestMissDistance] = useState<number | string>(Infinity);
    const [closestMissCDM, setClosestMissCDM] = useState<number | string>("N/A");
    const [largestCollisionProbabilityP, setLargestCollisionProbabilityP] = useState<number | string>(0.0);
    const [largestCollisionProbabilityCDM, setLargestCollisionProbabilityCDM] = useState<number | string>("N/A");
    const [getEventCount, setEventCount] = useState<number>(0);
    const [getObjectCount, setObjectCount] = useState<number>(0);
    const didRun = useRef(false);

    useEffect(() => {
        if (didRun.current) return;
        didRun.current = true;

        if (!token) return;

        fetchAllCDMs().then(data => {
            cdmCount(data).then(setCdmCount);

            closestMiss(data).then((result) => {
                const [distance, cdm] = result;
                setClosestMissDistance(distance);
                setClosestMissCDM(cdm);
            });

            largestCollisionProbability(data).then((result) => {
                const [P, cdm] = result;
                setLargestCollisionProbabilityP(P);
                setLargestCollisionProbabilityCDM(cdm);
            });

            eventCount(data).then(setEventCount);
            objectCount(data).then(setObjectCount);
        })
    }, []);

    const statBoxContainer: React.CSSProperties = {
        backgroundColor: colors.primary[400],
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "14rem",
        width: "19%",
        minHeight: "9rem",
    }

    return (
        <Box
            m="20px"
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                width: "100%",
                height: "100%",
                overflowY: "auto",
                overflowX: "hidden",
            }}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="DASHBOARD" subtitle="Welcome to your Dashboard" />
            </Box>

            {/* GRID AND CHARTS */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    flexWrap: "wrap",
                    width: "98%",
                    gap: "20px",
                }}
            >
                <Box
                    sx={statBoxContainer}
                >
                    <SimpleStatBox title={getCdmCount} subtitle="Number of CDMs" icon={<NoteIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />} />
                </Box>
                <Box
                    sx={statBoxContainer}
                >
                    <SimpleStatBox title={getEventCount} subtitle="Number of events" icon={<LayersIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />} />
                </Box>
                <Box
                    gridColumn="span 3"
                    sx={statBoxContainer}
                >
                    <IndividualStatBox title={closestMissDistance} subtitle="Closest Miss Distance (m)" individual={closestMissCDM} icon={<RulerIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />} />
                </Box>
                <Box
                    sx={statBoxContainer}
                >
                    <IndividualStatBox title={largestCollisionProbabilityP} subtitle="Largest Collision Probability" individual={largestCollisionProbabilityCDM} icon={<DieIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />} />
                </Box>
                <Box
                    sx={statBoxContainer}
                >
                    <SimpleStatBox title={getObjectCount} subtitle="Number of objects" icon={<SatelliteAltIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />} />
                </Box>
            </Box>
        </Box>
    );
}

export default Dashboard;
