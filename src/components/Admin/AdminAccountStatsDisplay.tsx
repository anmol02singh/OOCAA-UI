import React, { FC } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from '../../theme.tsx';
import { AccountStats, useAccountStatsStyling, mdWindowWidth } from '../../pages/Admin/AdminUtilities.tsx';

interface AccountStatCardProps {
    pageWidth: number;
    label: string;
    value: number;
}

const AccountStatCard: FC<AccountStatCardProps> = ({
    pageWidth,
    label,
    value,
}) => {
    const {
        statContainer,
    } = useAccountStatsStyling();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box sx={statContainer(pageWidth)}>
            <Typography variant={value >= 1000000 || pageWidth < mdWindowWidth ? 'h3' : 'h2'} sx={{ color: colors.grey[100] }}>
                {value}
            </Typography>
            <Typography variant="h5" sx={{ color: colors.greenAccent[400] }}>
                {label}
            </Typography>
        </Box >
    );
};

interface AccountStatsProps {
    pageWidth: number;
    accountStats: AccountStats;
}

const AdminAccountsStatsDisplay: React.FC<AccountStatsProps> = ({
    pageWidth,
    accountStats,
}) => {
    const {
        statsContainer,
    } = useAccountStatsStyling();

    return (
        <Box sx={statsContainer(pageWidth)}>
            {accountStats && Object.values(accountStats).map((stat) => (
                // eslint-disable-next-line react/jsx-key
                <AccountStatCard
                    pageWidth={pageWidth}
                    label={stat.label}
                    value={stat.value}
                />
            ))}
        </Box>
    );
}
export default AdminAccountsStatsDisplay