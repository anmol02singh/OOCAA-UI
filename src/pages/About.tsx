import React from 'react';
import { Box, Typography, Grid, Paper, Link, useTheme, Card, CardContent } from '@mui/material';
import { tokens } from '../theme.tsx';
import SearchIcon from '@mui/icons-material/Search';
import PublicIcon from '@mui/icons-material/Public';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import DownloadIcon from '@mui/icons-material/Download';

const features = [
  {
    icon: <SearchIcon fontSize="large" />,
    title: 'Search & Filter',
    description:
      'Quickly find objects by name, type, or catalog number with our flexible search bars.',
  },
  {
    icon: <PublicIcon fontSize="large" />,
    title: '3D Orbit Visualization',
    description:
      'See real-time close approach trajectories rendered in Cesium for full context.',
  },
  {
    icon: <NotificationsActiveIcon fontSize="large" />,
    title: 'Watchlist & Alerts',
    description:
      'Subscribe to conjunction events and get system notifications when updated.',
  },
  {
    icon: <DownloadIcon fontSize="large" />,
    title: 'Data Export',
    description:
      'Download full CDM JSON for offline analysis or reporting.',
  },
];

const About: React.FC = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const pageContainer: React.CSSProperties = {
      width: '100%',
      height: 'auto',
      backgroundColor: colors.primary[500],
      overflowX: 'hidden',
      overflowY: 'auto',
      padding: '2rem',
      flexGrow: 1,
      minWidth: 0,
  };

  const team = [
    { name: 'Natalie Dean',    email: 'natalierdean1@gmail.com' },
    { name: 'Sanchit Duggal',  email: 'saniac249@gmail.com' },
    { name: 'Adrien Hopkins',  email: 'adrien.p.hopkins@gmail.com' },
    { name: 'Yaqub Ibrahim',   email: 'yaqubibrahim399@gmail.com' },
    { name: 'Taha Shahid',     email: 'taha.shahid70@gmail.com' },
    { name: 'Anmol Singh',     email: 'anmolsingh5487@gmail.com' },
  ];
//sx={{ backgroundColor: colors.primary[500], color: colors.grey[100] }}
  return (
    <Box p={4} sx={pageContainer}>
      <Typography variant="h2" gutterBottom>
        About OOCAA
      </Typography>

      <Typography variant="body1" paragraph>
        <strong>On-Orbit Collision Avoidance Assistance (OOCAA)</strong> is our capstone solution
        to the growing challenge of satellite conjunctions. Built in collaboration with the
        Canadian Space Agency, OOCAA transforms raw conjunction data messages (CDMs) into
        intuitive visual insights - helping operators anticipate, analyze, and mitigate collision
        risks in real time.
      </Typography>

      <Grid container spacing={4}>
        {features.map(({ icon, title, description }, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Card
              sx={{
                backgroundColor: colors.primary[400],
                color: colors.grey[100],
                boxShadow: 3,
                height: '100%',
              }}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  p: 3,
                }}
              >
                <Box sx={{ mb: 1, color: colors.greenAccent[500] }}>{icon}</Box>
                <Typography variant="h6" gutterBottom>
                  {title}
                </Typography>
                <Typography variant="body2" align="center">
                  {description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      

      <Typography variant="h5" mt={3} gutterBottom>
        Why OOCAA Matters
      </Typography>
      <Typography variant="body1" paragraph>
        As Earth’s orbits become ever more crowded, even tiny debris poses serious threats to
        valuable spacecraft. Traditional tabular CDM reports can obscure trends - OOCAA’s
        dynamic visualizations and alerts put clear, actionable intelligence in operators’ hands.
      </Typography>

      <Typography variant="h5" mt={3} gutterBottom>
        Key Features
      </Typography>
      <ul>
        <li><strong>Event Search & Filters</strong> by object name, type, designator, TCA, miss-distance, collision probability, and operator.</li>
        <li><strong>Real-Time Orbit Visualization</strong> of any selected CDM via Cesium Ion, showing object paths around TCA.</li>
        <li><strong>Trend Graphs</strong> for miss-distance, TCA, and collision probability across all CDMs of an event.</li>
        <li><strong>Watchlist & Alerts</strong> – save your custom filters, get notified when new CDMs match.</li>
        <li><strong>Role-Based Access</strong> – tiered views for Level 2 operators, Level 1 operators, and Admins, including full-CDM downloads.</li>
      </ul>

      <Typography variant="h5" mt={3} gutterBottom>
        Our Journey
      </Typography>
      <Typography variant="body1" paragraph>
        Over twelve sprints we gathered requirements directly from our stakeholder team, iterated
        on UI/UX with regular demos, and continuously refactored back-end performance as our
        CDM dataset scaled into the tens of thousands. Agile ceremonies kept us aligned, and
        countless user tests drove improvements in responsiveness, clarity, and robustness.
      </Typography>

      <Typography variant="h5" mt={3} gutterBottom>
        Meet the Team
      </Typography>
      <Grid container spacing={2}>
        {team.map(({ name, email }) => (
          <Grid item xs={12} sm={6} md={4} key={email}>
            <Paper sx={{ p: 2, backgroundColor: colors.primary[400] }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {name}
              </Typography>
              <Link
                href={`mailto:${email}`}
                sx={{ color: colors.greenAccent[400], wordBreak: 'break-all' }}
              >
                {email}
              </Link>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Typography variant="caption" display="block" mt={8} textAlign="center" color={colors.grey[300]}
      >
        OOCAA — ENG 4000 Capstone Project, York University, Lassonde School of Engineering ©
      </Typography>
    </Box>
  );
};

export default About;
