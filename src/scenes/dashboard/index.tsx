import { Box, Button, IconButton, Typography, useTheme } from '@mui/material';
import React from 'react';
import Header from '../../components/Header.tsx';
import { tokens } from "../../theme.tsx";
import { mockTransactions } from '../../Data/mockData.tsx';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import EmailIcon from '@mui/icons-material/Email';
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import PersonAddIcon from '@mui/icons-material/PersonAddOutlined';
import TrafficIcon from '@mui/icons-material/TrafficOutlined';
import LineChart from '../../components/LineChart.tsx';
import PieChart from '../../components/PieChart.tsx';
import BarChart from '../../components/BarChart.tsx';
import GeographyChart from '../../components/GeographyChart.tsx';
import StatBox from '../../components/StatBox.tsx';
import ProgressCircle from '../../components/ProgressCircle.tsx';

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box m = "20px">
            <Box display = "flex" justifyContent= "space-between" alignItems="center">
                <Header title="DASHBOARD" subtitle="Welcome to your Dashboard"/>
            

            <Box>
                <Button sx = {{backgroundColor: colors.blueAccent[700], color: colors.grey[100], fontSize:"14px", fontWeight: "bold", padding:"10px 20px" }}>
                    <DownloadOutlinedIcon sx = {{mr: "10px"}}/>
                    Download Report
                </Button>
            </Box>
            </Box>

            {/* GRID AND CHARTS */}
            <Box display = "grid" gridTemplateColumns = "repeat(12, 1fr)" gridAutoRows="140px" gap = "20px">
             
              {/* ROW 1 */} 
                <Box gridColumn= "span 3" sx = {{backgroundColor: colors.primary[400], display: "flex", alignItems: "center",justifyContent: "center" }}>
                    <StatBox title = "1,261" subtitle = "Emails Sent" progress = "0.65" increase ="+14%" icon={<EmailIcon sx = {{color: colors.greenAccent[600], fontSize: "26px"}}/>} />
                </Box> 

                <Box gridColumn="span 3" sx = {{backgroundColor: colors.primary[400], display: "flex", alignItems: "center",justifyContent: "center" }}>
                    <StatBox title = "225" subtitle = "Sattelites Observed" progress = "0.5" increase ="+21%" icon={<SatelliteAltIcon sx = {{color: colors.greenAccent[600], fontSize: "26px"}}/>} />
                </Box> 

                <Box gridColumn="span 3" sx = {{backgroundColor: colors.primary[400], display: "flex", alignItems: "center",justifyContent: "center" }}>
                    <StatBox title = "20" subtitle = "New Clients" progress = "0.30" increase ="+5%" icon={<PersonAddIcon sx = {{color: colors.greenAccent[600], fontSize: "26px"}}/>} />
                </Box> 

                <Box gridColumn="span 3" sx = {{backgroundColor: colors.primary[400], display: "flex", alignItems: "center",justifyContent: "center" }}>
                    <StatBox title = "2,253" subtitle = "Traffic Inbound" progress = "0.80" increase ="+43%" icon={<TrafficIcon sx = {{color: colors.greenAccent[600], fontSize: "26px"}}/>} />
                </Box> 
             
              {/* ROW 2 */} 
                <Box gridColumn = "span 8" gridRow = "span 2" sx ={{backgroundColor : colors.primary[400]}}> 

                    <Box mt = "25px" p = "0 30px" display="flex" justifyContent="space-between" alignItems="center">

                        <Box>
                            <Typography variant = "h5" sx = {{ fontWeight: "600", color: colors.grey[100]}}>
                                Collisions Avoided
                            </Typography>

                            <Typography variant = "h3"sx = {{ fontWeight: "bold", color: colors.greenAccent[500]}}>
                                21
                            </Typography>
                        </Box>

                        <Box>
                            <IconButton>
                                <DownloadOutlinedIcon sx ={{ fontSize: "26px", color: colors.greenAccent[500] }}/>
                            </IconButton>
                        </Box>

                    </Box>

                    <Box height = "250px" mt="-20px" >
                        <LineChart isDashboard = {true}/>
                    </Box>
                </Box>

                    {/* Collisions Avoided */} 
                    <Box gridColumn="span 4" gridRow="span 2" sx = {{backgroundColor: colors.primary[400]}} overflow="auto">
                        <Box display= "flex" justifyContent="space-between" alignItems="center" borderBottom={`4px solid ${colors.primary[500]}`} sx = {{colors : colors.grey[100], p: "15px"}}>
                            <Typography color = {colors.grey[100]} variant = "h5" fontWeight="600">
                                Recent Observations
                            </Typography>
                        </Box>
                        {mockTransactions.map((transaction, i) => (
                            <Box key = {`${transaction.txId}-${i}`} display = "flex" justifyContent="space-between" alignItems="center" borderBottom ={`4px solid ${colors.primary[500]}`} p= "15px" >
                                <Box>
                                <Typography color = {colors.greenAccent[500]} variant = "h5" fontWeight="600">
                                {transaction.txId}
                                 </Typography>
                                 <Typography color = {colors.grey[100]}>
                                {transaction.user}
                                 </Typography>
                                </Box>
                                <Box sx = {{color: colors.grey[100]}}> 
                                    {transaction.date}
                                </Box>
                                <Box sx = {{backgroundColor: colors.greenAccent[500], p: "5px 10px", borderRadius: "4px"}}>
                                    ${transaction.cost}
                                </Box>   
                             </Box>   
                        
                        ))}
                    </Box>
                 {/* ROW 3 */}
                <Box gridColumn="span 4" gridRow="span 2" sx ={{backgroundColor:colors.primary[400]}} p="30px">
                    <Typography variant="h5" fontWeight="600">
                        Campaign
                    </Typography>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        mt="25px">
                        <ProgressCircle size="125" />
                        <Typography
                        variant="h5"
                        color={colors.greenAccent[500]}
                        sx={{ mt: "15px" }}
                        >
                        $48,352 revenue generated
                        </Typography>
                        <Typography>Includes extra misc expenditures and costs</Typography>
                    </Box>
                    </Box>
                <Box gridColumn="span 4" gridRow="span 2" sx ={{backgroundColor:colors.primary[400]}}>

                     <Typography variant="h5" fontWeight="600" sx={{ padding: "30px 30px 0 30px" }}>
                    Sales Quantity
                     </Typography>

                     <Box height="250px" mt="-20px">
                    <BarChart isDashboard={true} />
                </Box>
                </Box>
                <Box gridColumn="span 4" gridRow="span 2" sx = {{ backgroundColor:colors.primary[400]}} padding="30px">
                     <Typography variant="h5" fontWeight="600" sx={{ marginBottom: "15px" }}>
                         Geography Based Traffic
                     </Typography>
                     <Box height="200px">
                        <GeographyChart isDashboard={true} />
                     </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default Dashboard;