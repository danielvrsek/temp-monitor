import React, { useState, useEffect } from 'react';

import Error from '../core/Error';
import Loading from '../core/Loading';
import MainChartReady from './MainChartReady';

import ApiClient from '../../../api/ApiClient';

const MainChartLoad = ({ gateway }) => {
    //Dates
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const [dateFrom, setDateFrom] = useState(yesterday);
    const [dateTo, setDateTo] = useState(today);
    const [availableGranularity, setAvailableGranularity] = useState([]);

    useEffect(() => {
        const dateRange = (dateTo - dateFrom) / 1000 / 150;
        let data = granularityList.filter((item) => item.granularity === 0 || item.granularity >= dateRange);
        setGranularity(data[0].granularity);
        setAvailableGranularity(data);
    }, [dateFrom, dateTo]);

    //Granularity
    const [granularity, setGranularity] = useState(null);

    //Chart
    const [chartData, setChartData] = useState();
    const [status, setStatus] = useState('loading');

    const reset = () => {
        setDateFrom(yesterday);
        setDateTo(today);
        setGranularity();
    };

    useEffect(() => {
        if (granularity === null) {
            return;
        }

        ApiClient.getWeatherData(gateway._id, dateFrom, dateTo, granularity)
            .then((res) => {
                if (res.status === 200) {
                    setChartData(res.data);
                    setStatus('success');
                } else {
                    setStatus('error');
                }
            })
            .catch((e) => setStatus('error'));
    }, [gateway, dateFrom, dateTo, granularity]);

    switch (status) {
        case 'success':
            return gateway.state ? (
                <MainChartReady
                    data={chartData}
                    dateFrom={dateFrom}
                    dateTo={dateTo}
                    granularity={granularity}
                    availableGranularity={availableGranularity}
                    handleDateFrom={(newDateFrom) => setDateFrom(newDateFrom)}
                    handleDateTo={(newDateTo) => setDateTo(newDateTo)}
                    handleGranularity={(event) => setGranularity(event.target.value)}
                    handleReset={reset}
                />
            ) : (
                <Error content="Žádná data pro graf nejsou zatím k dispozici." />
            );
        case 'error':
            return <Error content="Nepodařilo se načíst data pro graf." />;
        default:
            return <Loading />;
    }
};

const granularityList = [
    {
        name: 'automaticky',
        granularity: 0,
    },
    {
        name: '1 minuta',
        granularity: 60,
    },
    {
        name: '5 minut',
        granularity: 5 * 60,
    },
    {
        name: '10 minut',
        granularity: 10 * 60,
    },
    {
        name: '30 minut',
        granularity: 30 * 60,
    },
    {
        name: '1 hodina',
        granularity: 3600,
    },
    {
        name: '1 den',
        granularity: 24 * 3600,
    },
];

export default MainChartLoad;
