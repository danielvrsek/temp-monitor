import React from 'react';
import ChartControls from './ChartControls';
import SimpleLineChart from './SimpleLineChart';
import { Card } from '@mui/material';
import { ChartGranularity } from './chartGranularity';
import { WeatherDataViewModel } from 'shared/dto';
import { lines } from './chartLines';

type Props = {
    data: WeatherDataViewModel[];
    dateFrom: Date;
    dateTo: Date;
    granularity: number;
    availableGranularity: ChartGranularity[];
    updateDateFrom: (dateFrom: Date | null) => void;
    updateDateTo: (dateFrom: Date | null) => void;
    updateGranularity: (granularity: number) => void;
    handleReset: () => void;
};

const MainChartReady: React.FC<Props> = (props) => {
    let chartData = props.data.map((item) => ({
        name: new Date(item.timestamp).toLocaleString(),
        temperature: item.temperature.toFixed(1),
        humidity: item.humidity.toFixed(1),
    }));

    return (
        <Card sx={{ height: '600px', padding: '16px 8px' }}>
            <ChartControls {...props} />
            <SimpleLineChart data={chartData} lines={lines} />
        </Card>
    );
};

export default MainChartReady;
