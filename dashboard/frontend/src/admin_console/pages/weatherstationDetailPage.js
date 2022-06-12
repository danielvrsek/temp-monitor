import MainChartLoad from '../components/chart/MainChartLoad';
import { Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import WeatherstationDetailReady from '../components/weatherstation/WeatherstationDetailReady';
import Loading from '../components/core/Loading';
import { useEffect, useState } from 'react';
import ApiClient from '../../api/ApiClient';
import Error from '../components/core/Error';

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
