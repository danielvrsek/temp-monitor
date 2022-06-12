import ChartControls from './ChartControls';
import SimpleLineChart from './SimpleLineChart';

import { Card } from '@mui/material';

const MainChartReady = (props) => {
    let chartData = [];

    if (props.data && props.data.length > 0) {
        props.data.forEach((element) => {
            const date = new Date(element.timestamp);
            chartData.push({
                name: date.toLocaleString(),
                temperature: element.temperature.toFixed(1),
                humidity: element.humidity.toFixed(1),
            });
        });
    }

    const lines = [
        {
            type: 'monotone',
            dataKey: 'temperature',
            stroke: '#8884d8',
        },
        {
            type: 'monotone',
            dataKey: 'humidity',
            stroke: '#82ca9d',
        },
    ];

    return (
        <Card sx={{ height: '600px', padding: '16px 8px' }}>
            <ChartControls
                dateFrom={props.dateFrom}
                dateTo={props.dateTo}
                granularity={props.granularity}
                availableGranularity={props.availableGranularity}
                handleDateFrom={props.handleDateFrom}
                handleDateTo={props.handleDateTo}
                handleGranularity={props.handleGranularity}
                handleReset={props.handleReset}
            />
            <SimpleLineChart data={chartData} lines={lines} />
        </Card>
    );
};

export default MainChartReady;
