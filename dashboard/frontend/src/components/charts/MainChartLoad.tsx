import React, { useState, useEffect } from 'react';
import MainChartReady from './MainChartReady';
import { ChartGranularity, granularityList } from './chartGranularity';
import ApiClient from '../../api/ApiClient';
import { GatewayViewModel, WeatherDataViewModel } from 'shared/dist/dto';
import Error from '../../common/Error';
import Loading from '../../common/Loading';

type Props = {
    gateway: GatewayViewModel;
};

const MainChartLoad: React.FC<Props> = ({ gateway }) => {
    //Dates
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const [dateFrom, setDateFrom] = useState<Date>(yesterday);
    const [dateTo, setDateTo] = useState<Date>(today);
    const [availableGranularity, setAvailableGranularity] = useState<ChartGranularity[]>([]);
    const [granularity, setGranularity] = useState(-1);

    useEffect(() => {
        const dateRange = (dateTo.getTime() - dateFrom.getTime()) / 1000 / 150;
        let data = granularityList.filter((item) => item.value === 0 || item.value >= dateRange);
        setGranularity(data[0].value);
        setAvailableGranularity(data);
    }, [dateFrom, dateTo]);

    //Chart
    const [chartData, setChartData] = useState<WeatherDataViewModel[]>([]);
    const [status, setStatus] = useState('loading');

    const reset = () => {
        setDateFrom(yesterday);
        setDateTo(today);
        setGranularity(-1);
    };

    useEffect(() => {
        if (granularity === -1) {
            return;
        }

        ApiClient.getWeatherData(gateway.id, dateFrom, dateTo, granularity)
            .then((res) => {
                if (res.status === 200) {
                    setChartData(res.data);
                    setStatus('success');
                } else {
                    setStatus('error');
                }
            })
            .catch(() => setStatus('error'));
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
                    updateDateFrom={(newDateFrom: Date | null) => setDateFrom(newDateFrom as Date)}
                    updateDateTo={(newDateTo: Date | null) => setDateTo(newDateTo as Date)}
                    updateGranularity={(value: number) => setGranularity(value)}
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

export default MainChartLoad;
