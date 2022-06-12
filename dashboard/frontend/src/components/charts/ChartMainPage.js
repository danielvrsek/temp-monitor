import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import ApiClient from '../../api/ApiClient';

import SimpleLineChart from './SimpleLineChart';
import ChartControls from './ChartControls';

const Home = () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const defaultGranularity = 1800;

    const [dateFrom, setDateFrom] = React.useState(yesterday);
    const [dateTo, setDateTo] = React.useState(today);
    const [granularity, setGranularity] = React.useState(defaultGranularity);
    console.log(dateTo.toISOString());
    const handleDateFrom = (newDateFrom) => {
        setDateFrom(newDateFrom);
    };

    const handleDateTo = (newDateTo) => {
        setDateTo(newDateTo);
    };

    const handleGranularity = (event) => {
        setGranularity(event.target.value);
    };

    const reset = () => {
        setDateFrom(yesterday);
        setDateTo(today);
        setGranularity(defaultGranularity);
    };

    const set = () => {
        //call server
    };

    const [chartData, setChartData] = useState();

    useEffect(() => {
        ApiClient.getWeatherData(dateFrom, dateTo, granularity).then((res) => {
            setChartData(res.data);
        });
    }, [dateFrom, dateTo, granularity]);

    let data = [];

    if (chartData && chartData.length > 0) {
        chartData.forEach((element) => {
            const date = new Date(element.timestamp);
            data.push({
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

    console.log(dateTo);
    return (
        <Container style={{ height: '600px', paddingBottom: '20px' }}>
            <h1 style={{ marginTop: '15px' }}>Graf s naměřenými hodnotami</h1>
            <ChartControls
                dateFrom={dateFrom}
                dateTo={dateTo}
                granularity={granularity}
                handleDateFrom={handleDateFrom}
                handleDateTo={handleDateTo}
                handleGranularity={handleGranularity}
                handleReset={reset}
                handleSet={set}
            />
            <SimpleLineChart data={data} lines={lines} />
        </Container>
    );
};

export default Home;
