import { Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ApiClient from '../api/apiClient';
import Error from '../common/Error';
import Loading from '../common/Loading';
import { UserDeviceSensorViewModel } from 'shared/dto';
import UserDeviceSensorDetailReady from '../components/userDeviceSensor/UserDeviceSensorDetailReady';
import MainChartLoad from '../components/charts/MainChartLoad';

const UserDeviceSensorDetailPage = () => {
    const { id } = useParams();

    const [data, setData] = useState<UserDeviceSensorViewModel | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setError('Bad request');
            return;
        }

        ApiClient.getUserDeviceSensor(id)
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
            <UserDeviceSensorDetailReady data={data} />
            <Typography sx={{ mt: '48px' }} variant="h4">
                Graf naměřených hodnot
            </Typography>
            <MainChartLoad sensor={data} />
        </Container>
    );
};

export default UserDeviceSensorDetailPage;
