import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from '../theme.tsx';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);

export interface CDM {
  messageId: string;
  creationDate: string; 
  tca: string;          
  missDistance: number;
  collisionProbability: number;
}

interface EventChartsProps {
  cdms: CDM[];
}

const EventCharts: React.FC<EventChartsProps> = ({ cdms }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const sortedCdms = [...cdms].sort(
    (a, b) => new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime()
  );

  const labels = sortedCdms.map(cdm => {
    const isoString = new Date(cdm.creationDate).toISOString();
    return isoString.substring(0, 16);
  });

  //convert TCA to milliseconds
  //normalize relative to the first tca to keep values manageable
  const tcaEpochs = sortedCdms.map(cdm => new Date(cdm.tca).getTime());
  const baseline = tcaEpochs[0] || 0;
  const normalizedTca = tcaEpochs.map(time => (time - baseline) / 1000); // in seconds

  const tcas = sortedCdms.map(cdm => new Date(cdm.tca).toISOString());
  const missDistances = sortedCdms.map(cdm => cdm.missDistance);
  const collisionProbs = sortedCdms.map(cdm => cdm.collisionProbability);

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      tooltip: {
        callbacks: {
          title: (tooltipItems: any[]) => {
            return tooltipItems.map(item => {
              const messageId = sortedCdms[item.dataIndex]?.messageId || 'N/A';
              return `Message ID: ${messageId}`;
            });
          },
          label: (context: any) => {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            const value = context.parsed.y;
            const formattedValue =
              context.dataset.label === 'Collision Probability'
                ? value.toPrecision(6)
                : value;
            return label + formattedValue;
          },
        },
      },
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Creation Date [UTC]',
        }
      }
    },
  };

  const tcaChartOptions = {
    ...commonOptions,
    scales: {
      ...commonOptions.scales,
      y: {
        title: {
          display: true,
          text: 'Seconds since first TCA',
        },
      },
    },
  };

  const missDistanceChartOptions = {
    ...commonOptions,
    scales: {
      ...commonOptions.scales,
      y: {
        title: {
          display: true,
          text: 'Miss Distance (m)',
        },
      },
    },
  };

  const collisionChartOptions = {
    ...commonOptions,
    scales: {
      ...commonOptions.scales,
      y: {
        ticks: {
          callback: (tickValue: string | number) => Number(tickValue).toExponential(2),
        },
        title: {
          display: true,
          text: 'Collision Probability',
        },
      },
    },
  };

  const tcaChartData = {
    labels,
    datasets: [
      {
        label: 'TCA (seconds since first TCA)',
        data: normalizedTca,
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const missDistanceChartData = {
    labels,
    datasets: [
      {
        label: 'Miss Distance (m)',
        data: missDistances,
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const collisionChartData = {
    labels,
    datasets: [
      {
        label: 'Collision Probability',
        data: collisionProbs,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
    ],
  };

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Box display="flex" gap={2} justifyContent="center" sx={{ minWidth: 0 }}>

        <Box flex="1 1 40rem" maxWidth="50rem" sx={{ minWidth: 0 }} bgcolor={colors.primary[400]} p={2}>
          <Typography variant="h6" gutterBottom>
            {`TCA (seconds since first TCA): ${tcas[0]}`}
          </Typography>
          <Line data={tcaChartData} options={tcaChartOptions} />
        </Box>
  
        <Box flex="1 1 40rem" maxWidth="50rem" sx={{ minWidth: 0 }} bgcolor={colors.primary[400]} p={2}>
          <Typography variant="h6" gutterBottom>
            Miss Distance Progression
          </Typography>
          <Line data={missDistanceChartData} options={missDistanceChartOptions} />
        </Box>
      </Box>
  
      <Box display="flex" justifyContent="center" sx={{ minWidth: 0 }}>
        <Box flex="1 1 40rem" maxWidth="50rem" sx={{ minWidth: 0 }} bgcolor={colors.primary[400]} p={2} mb={4}>
          <Typography variant="h6" gutterBottom>
            Collision Probability Progression
          </Typography>
          <Line data={collisionChartData} options={collisionChartOptions} />
        </Box>
      </Box>
    </Box>
  );
};

export default EventCharts;
