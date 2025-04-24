import { Box, Button, IconButton, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import Header from '../../components/Header.tsx';
import { tokens } from "../../theme.tsx";
import { mockTransactions } from '../../Data/mockData.tsx';
import NoteIcon from '@mui/icons-material/Note';
import LayersIcon from '@mui/icons-material/Layers';
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';
import RulerIcon from '@mui/icons-material/Straighten';
import DieIcon from '@mui/icons-material/Casino';
import LineChart from '../../components/LineChart.tsx';
import PieChart from '../../components/PieChart.tsx';
import BarChart from '../../components/BarChart.tsx';
import GeographyChart from '../../components/GeographyChart.tsx';
import SimpleStatBox from '../../components/SimpleStatBox.tsx';
import IndividualStatBox from '../../components/IndividualStatBox.tsx';

import { cdmCount, closestMiss, largestCollisionProbability, eventCount, objectCount } from '../../API/stats.tsx';

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [getCdmCount, setCdmCount] = useState<int>(0);
    const [closestMissDistance, setClosestMissDistance] = useState<float>(Infinity);
    const [closestMissCDM, setClosestMissCDM] = useState<string>("N/A");
    const [largestCollisionProbabilityP, setLargestCollisionProbabilityP] = useState<float>(0.0);
    const [largestCollisionProbabilityCDM, setLargestCollisionProbabilityCDM] = useState<string>("N/A");
    const [getEventCount, setEventCount] = useState<int>(0);
    const [getObjectCount, setObjectCount] = useState<int>(0);
    cdmCount().then(setCdmCount);
    closestMiss().then((result) => {
        const [distance, cdm] = result;
        setClosestMissDistance(distance);
        setClosestMissCDM(cdm);
    });
    largestCollisionProbability().then((result) => {
        const [P, cdm] = result;
        setLargestCollisionProbabilityP(P);
        setLargestCollisionProbabilityCDM(cdm);
    });
    eventCount().then(setEventCount);
    objectCount().then(setObjectCount);

    return (
        <Box m = "20px">
            <Box display = "flex" justifyContent= "space-between" alignItems="center">
                <Header title="DASHBOARD" subtitle="Welcome to your Dashboard"/>
            </Box>

            {/* GRID AND CHARTS */}
            <Box display = "grid" gridTemplateColumns = "repeat(12, 1fr)" gridAutoRows="140px" gap = "20px">
                <Box gridColumn= "span 3" sx = {{backgroundColor: colors.primary[400], display: "flex", alignItems: "center",justifyContent: "center" }}>
                    <SimpleStatBox title = {getCdmCount} subtitle = "Number of CDMs" icon={<NoteIcon sx = {{color: colors.greenAccent[600], fontSize: "26px"}}/>} />
                </Box> 
                <Box gridColumn= "span 3" sx = {{backgroundColor: colors.primary[400], display: "flex", alignItems: "center",justifyContent: "center" }}>
                    <SimpleStatBox title = {getEventCount} subtitle = "Number of events" icon={<LayersIcon sx = {{color: colors.greenAccent[600], fontSize: "26px"}}/>} />
                </Box> 
                <Box gridColumn= "span 3" sx = {{backgroundColor: colors.primary[400], display: "flex", alignItems: "center",justifyContent: "center" }}>
                    <IndividualStatBox title = {closestMissDistance} subtitle = "Closest Miss Distance (m)" individual={closestMissCDM} icon={<RulerIcon sx = {{color: colors.greenAccent[600], fontSize: "26px"}}/>} />
                </Box> 
                <Box gridColumn= "span 3" sx = {{backgroundColor: colors.primary[400], display: "flex", alignItems: "center",justifyContent: "center" }}>
                    <IndividualStatBox title = {largestCollisionProbabilityP} subtitle = "Largest Collision Probability" individual={largestCollisionProbabilityCDM} icon={<DieIcon sx = {{color: colors.greenAccent[600], fontSize: "26px"}}/>} />
                </Box> 
                <Box gridColumn= "span 3" sx = {{backgroundColor: colors.primary[400], display: "flex", alignItems: "center",justifyContent: "center" }}>
                    <SimpleStatBox title = {getObjectCount} subtitle = "Number of objects" icon={<SatelliteAltIcon sx = {{color: colors.greenAccent[600], fontSize: "26px"}}/>} />
                </Box> 
            </Box>
        </Box>
    );
}

export default Dashboard;
