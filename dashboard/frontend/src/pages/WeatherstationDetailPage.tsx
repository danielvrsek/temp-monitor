import { Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ApiClient from '../api/apiClient';
import Error from '../common/Error';
import Loading from '../common/Loading';
import MainChartLoad from '../components/charts/MainChartLoad';
import { GatewayViewModel } from 'shared/dto';
import WeatherstationDetailReady from '../components/weatherstation/WeatherstationDetailReady';

const WeatherstationDetailPage = () => {
    const { id } = useParams();

    const [data, setData] = useState<GatewayViewModel | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setError('Bad request');
            return;
        }

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
