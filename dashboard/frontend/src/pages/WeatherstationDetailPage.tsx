import { Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Error from '../admin_console/components/core/Error';
import Loading from '../admin_console/components/core/Loading';
import WeatherstationDetailReady from '../admin_console/components/weatherstation/WeatherstationDetailReady';
import MainChartLoad from '../admin_console/components/chart/MainChartLoad';
import ApiClient from '../api/ApiClient';

const WeatherstationDetailPage = () => {
    const { id } = useParams();

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        ApiClient.getGateway(id)
            .then(({ data }) => setData(data))
            .catch((e) => setError(e));
    }, [id]);

    if (error) {
        return <Error content="Error" />;
    }

    if (!data) {
        return <Loading />;
    }

    return (
        <Container sx={{ pt: '32px' }}>
            <WeatherstationDetailReady data={data} />
            <Typography sx={{ mt: '48px' }} variant="h4">
                Graf naměřených hodnot
            </Typography>
            <MainChartLoad gateway={data} />
        </Container>
    );
};

export default WeatherstationDetailPage;
